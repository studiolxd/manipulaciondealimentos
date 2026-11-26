import { shuffle } from '@studiolxd/tramoya'
import { useEffect, useRef, useState } from 'react'
import { feedback } from '../content/feedback'
import { image } from '../content/images'
import { woundCare as activity } from '../content/woundCare'
import {
  ActivityScene,
  FeedbackPanel,
  Label,
  Layer,
  Positioned,
  QuestionPanel,
  Surface,
  Text,
  WoundCare,
  type Feedback,
} from '../design-system'
import { useGame } from '../game/game'
import { xapi } from '../game/tracking'

const ACTIVITY_ID = 'wound-care'
// How long the feedback of a step stays on screen.
const TOAST_MS = 1800

// Scenes 44 to 46 (activity 12): part 1, a simulation where the player treats a
// small wound by discovery; part 2, a test of five situations with three
// answers each. Part 2 follows part 1 straight away. The feedback of a test
// answer opens over the scene; its button goes on to the next situation, or to
// David's conclusion after the last one.
export function WoundCareScene() {
  const { sceneReady, goTo } = useGame()
  const [part, setPart] = useState<'simulation' | 'test'>('simulation')
  const [toast, setToast] = useState<{ message: string; key: number } | null>(null)
  const [index, setIndex] = useState(0)
  const [shown, setShown] = useState<Feedback | null>(null)
  // The answers of each situation, shuffled once per game load.
  const [orders] = useState(() => activity.situations.map((s) => shuffle(s.answers.map((_, i) => i))))
  const right = useRef(0)
  const count = useRef(0)

  const situations = activity.situations
  const current = situations[index]
  const last = index + 1 === situations.length

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), TOAST_MS)
    return () => clearTimeout(timer)
  }, [toast])

  function answer(choice: number) {
    const correct = orders[index][choice] === 0
    if (correct) right.current += 1
    xapi.answered({
      activityId: ACTIVITY_ID,
      activityName: activity.title,
      questionId: current.id,
      question: current.situation,
      response: correct,
      correctResponse: true,
    })
    if (last) xapi.activityCompleted(ACTIVITY_ID, activity.title, right.current, situations.length)
    setShown(feedback(correct ? 'positive' : 'negative', `${correct ? activity.correct : activity.incorrect} ${current.explanation}`))
  }

  function closeFeedback() {
    setShown(null)
    if (last) goTo('wound-care-conclusion')
    else setIndex(index + 1)
  }

  return (
    <ActivityScene
      heading={activity.heading}
      background={image('kitchenCounterBackground')}
      backgroundAlt={activity.backgroundAlt}
      ready={sceneReady}
      title={activity.title}
      // A dark veil over the scene while the title and the statement are on screen.
      underlay={(phase) =>
        phase === 'play' ? null : (
          <Layer backdrop="dark">
            <></>
          </Layer>
        )
      }
      statement={{
        speaker: 'David',
        blocks: activity.statement,
        label: activity.statementLabel,
        openLabel: activity.openStatement,
        closeLabel: activity.closeStatement,
      }}
      hudEnd={
        part === 'test' ? (
          <Label size="hud" tone="inverse">
            {activity.progress(index + 1, situations.length)}
          </Label>
        ) : undefined
      }
      onPlayStart={() => xapi.activityAttempted(ACTIVITY_ID, activity.title)}
    >
      {part === 'simulation' ? (
        <>
          <WoundCare
            images={{
              hands: image('woundedHands'),
              cotton: image('cottonPad'),
              bottle: image('woundDisinfectant'),
              dressing: image('bandage'),
              scissors: image('scissors'),
              glove: image('disposableGlove'),
            }}
            labels={activity.labels}
            onStepDone={(step) => {
              count.current += 1
              setToast({ message: activity.stepFeedback[step], key: count.current })
            }}
            // Part 2 follows once the last feedback has been seen.
            onComplete={() => setTimeout(() => setPart('test'), TOAST_MS)}
          />
          {toast && (
            <Positioned bottom={64} center="x" width={900} layer="over-hud">
              <Surface key={toast.key} tone="opaque" padding="md" accent="positive">
                <output>
                  <Text as="span" weight="bold">
                    {toast.message}
                  </Text>
                </output>
              </Surface>
            </Positioned>
          )}
        </>
      ) : (
        <>
          <Layer inert={shown !== null}>
            <Positioned top={150} center="x" width={1400} height={760}>
              <QuestionPanel
                key={current.id}
                name={current.id}
                question={current.situation}
                answers={orders[index].map((i) => current.answers[i])}
                checkLabel={activity.check}
                onAnswer={answer}
              />
            </Positioned>
          </Layer>
          {shown && (
            <Layer layer="dialog" backdrop>
              <Positioned center="both" width={1300}>
                <FeedbackPanel feedback={shown} closeLabel={last ? activity.finish : activity.next} onClose={closeFeedback} />
              </Positioned>
            </Layer>
          )}
        </>
      )}
    </ActivityScene>
  )
}
