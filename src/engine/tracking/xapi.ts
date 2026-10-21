import { createMemoryLrs, createXapiClient, VERBS, type XapiClient } from '@studiolxd/xapi'
import { scorm } from './scorm'

// Optional xAPI tracking. It is configured per client in xapi.config.json,
// next to index.html in the SCORM package, and stays off unless that file
// says "enabled": true. During development, ?xapi=mock sends the statements
// to an in-memory LRS and logs them. See docs/seguimiento.md.

interface XapiConfig {
  enabled: boolean
  /** In-memory LRS, for tests and demos. */
  mock?: boolean
  endpoint?: string
  auth?: { username: string; password: string } | { token: string }
  /** LMS address; together with the SCORM learner id it identifies the learner. */
  lmsHomePage?: string
  /** Base IRI of the course activities (convention still to be defined). */
  activityIriBase?: string
}

type StatementInput = Parameters<XapiClient['buildStatement']>[0]

interface Tracker {
  client: XapiClient
  base: string
}

const LANGUAGE = 'es-ES'
const INTERACTION_TYPE = 'http://adlnet.gov/expapi/activities/cmi.interaction'
const ACTIVITY_TYPE = 'http://adlnet.gov/expapi/activities/assessment'

async function loadConfig(): Promise<XapiConfig | null> {
  if (import.meta.env.DEV && new URLSearchParams(window.location.search).get('xapi') === 'mock') {
    return { enabled: true, mock: true, lmsHomePage: 'https://lms.example.com', activityIriBase: 'https://example.com/xapi/manipulador-de-alimentos' }
  }
  try {
    const response = await fetch(`${import.meta.env.BASE_URL}xapi.config.json`, { cache: 'no-store' })
    return response.ok ? ((await response.json()) as XapiConfig) : null
  } catch {
    return null
  }
}

async function createTracker(): Promise<Tracker | null> {
  const config = await loadConfig()
  if (!config?.enabled) return null
  if (!config.lmsHomePage || !config.activityIriBase || (!config.mock && !config.endpoint)) {
    console.warn('[xapi] xapi.config.json is enabled but incomplete; xAPI tracking is off.')
    return null
  }
  const learnerId = scorm.api?.getLearnerId()
  const learnerName = scorm.api?.getLearnerName()
  const lrs = config.mock ? createMemoryLrs() : null
  const client = createXapiClient({
    endpoint: lrs ? 'https://mock.lrs/xapi/' : config.endpoint!,
    auth: config.auth,
    fetch: lrs?.fetch,
    debug: import.meta.env.DEV,
    defaults: {
      actor: {
        account: { homePage: config.lmsHomePage, name: (learnerId?.ok && learnerId.value) || 'anonymous' },
        ...(learnerName?.ok && learnerName.value ? { name: learnerName.value } : {}),
      },
    },
  })
  return { client, base: config.activityIriBase.replace(/\/$/, '') }
}

let tracker: Promise<Tracker | null> | null = null

async function send(build: (base: string) => StatementInput): Promise<void> {
  tracker ??= createTracker()
  const current = await tracker
  if (!current) return
  const statement = current.client.buildStatement(build(current.base))
  const result = await current.client.sendStatement(statement)
  if (!result.ok) console.warn('[xapi] statement not sent', result.error)
  else if (import.meta.env.DEV) console.info('[xapi]', statement.verb.id, statement.object)
}

const activity = (base: string, id: string, name: string) => ({
  id: `${base}/activities/${id}`,
  definition: { type: ACTIVITY_TYPE, name: { [LANGUAGE]: name } },
})

/** Events proposed in docs/seguimiento.md; the final list is still to be decided. */
export const xapi = {
  sceneExperienced(sceneId: string) {
    void send((base) => ({ verb: VERBS.experienced, object: `${base}/scenes/${sceneId}` }))
  },

  activityAttempted(activityId: string, name: string) {
    void send((base) => ({ verb: VERBS.attempted, object: activity(base, activityId, name) }))
  },

  activityCompleted(activityId: string, name: string, correct: number, total: number) {
    void send((base) => ({
      verb: VERBS.completed,
      object: activity(base, activityId, name),
      result: { completion: true, score: { raw: correct, min: 0, max: total, scaled: total ? correct / total : 0 } },
    }))
  },

  /** A true/false question, e.g. "is this person a food handler?". */
  answered(answer: {
    activityId: string
    activityName: string
    questionId: string
    question: string
    response: boolean
    correctResponse: boolean
  }) {
    void send((base) => ({
      verb: VERBS.answered,
      object: {
        id: `${base}/activities/${answer.activityId}/questions/${answer.questionId}`,
        definition: {
          type: INTERACTION_TYPE,
          name: { [LANGUAGE]: answer.question },
          interactionType: 'true-false',
          correctResponsesPattern: [String(answer.correctResponse)],
        },
      },
      result: { response: String(answer.response), success: answer.response === answer.correctResponse },
      context: { contextActivities: { parent: [{ id: activity(base, answer.activityId, answer.activityName).id }] } },
    }))
  },
}
