import type { Result } from '@studiolxd/scorm'
import type { Gender } from '../../content/gendered'
import { isSceneId, sceneProgressWeight, type SceneId } from '../../scenes/sceneIds'
import { scorm } from './scorm'

// Course progress stored in the LMS (SCORM 1.2):
//   cmi.suspend_data          name (outside an LMS), form of address, completed scenes and current scene (to resume)
//   cmi.core.lesson_location  current scene
//   cmi.core.score.raw        % of script scenes completed (0–100), used as progress
//   cmi.core.lesson_status    "incomplete" until every scene is done, then "completed"
// SCORM 1.2 limits suspend_data to 4096 characters; scene ids keep it small.

export interface Progress {
  /** Name typed by the player; inside an LMS the name comes from the LMS instead. */
  name: string | null
  gender: Gender | null
  done: SceneId[]
  at: SceneId
}

const FORMAT_VERSION = 1
const genderCode: Record<Gender, string> = { male: 'm', female: 'f', neutral: 'n' }
const genderFromCode: Record<string, Gender> = { m: 'male', f: 'female', n: 'neutral' }
const TOTAL_WEIGHT = Object.values(sceneProgressWeight).reduce((sum, weight) => sum + weight, 0)

function check<T>(result: Result<T, unknown> | undefined, operation: string): void {
  if (import.meta.env.DEV && result && !result.ok) console.warn(`[progress] ${operation} failed`, result.error)
}

export function loadProgress(): Progress | null {
  const result = scorm.api?.getSuspendData()
  if (!result?.ok || !result.value) return null
  try {
    const data = JSON.parse(result.value)
    if (data.v !== FORMAT_VERSION || !isSceneId(data.at)) return null
    return {
      name: typeof data.n === 'string' && data.n ? data.n : null,
      gender: genderFromCode[data.g] ?? null,
      done: Array.isArray(data.d) ? data.d.filter(isSceneId) : [],
      at: data.at,
    }
  } catch {
    return null
  }
}

export function progressPercent(done: readonly SceneId[]): number {
  const completed = [...new Set(done)].reduce((sum, id) => sum + sceneProgressWeight[id], 0)
  return TOTAL_WEIGHT === 0 ? 0 : Math.round((completed / TOTAL_WEIGHT) * 100)
}

export function saveProgress(progress: Progress): void {
  const api = scorm.api
  if (!api) return
  const data = {
    v: FORMAT_VERSION,
    n: progress.name,
    g: progress.gender ? genderCode[progress.gender] : null,
    d: progress.done,
    at: progress.at,
  }
  const percent = progressPercent(progress.done)
  check(api.setSuspendData(JSON.stringify(data)), 'setSuspendData')
  check(api.setLocation(progress.at), 'setLocation')
  check(api.setScore({ raw: percent, min: 0, max: 100 }), 'setScore')
  check(percent === 100 ? api.setComplete() : api.setIncomplete(), 'setStatus')
  check(scorm.commit(), 'commit')
}
