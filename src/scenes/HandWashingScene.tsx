import { useEffect, useRef, useState } from 'react'
import { image } from '../content/images'
import { handWashing as activity } from '../content/handWashing'
import { ActivityScene, Button, HandWashing, Positioned, Surface, Text } from '../design-system'
import { useGame } from '../game/game'
import { xapi } from '../game/tracking'

const ACTIVITY_ID = 'hand-washing'
// How long the feedback of a step stays on screen.
const TOAST_MS = 1800

interface Toast {
  tone: 'positive' | 'negative'
  message: string
  /** A new one each time, so the same message shows again. */
  key: number
}

// Scenes 35 and 36 (activity 9): the hand-washing procedure as a simulation, at
// the kitchen sink. Each step of the checklist has its gesture and they go in
// order; the feedback of a step appears over the scene for a moment.
export function HandWashingScene() {
  const { sceneReady, goTo } = useGame()
  const [toast, setToast] = useState<Toast | null>(null)
  const [complete, setComplete] = useState(false)
  const mistakes = useRef(0)
  const count = useRef(0)

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), TOAST_MS)
    return () => clearTimeout(timer)
  }, [toast])

  function show(tone: Toast['tone'], message: string) {
    count.current += 1
    setToast({ tone, message, key: count.current })
  }

  return (
    <ActivityScene
      heading={activity.heading}
      background={image('kitchenSinkBackground')}
      backgroundAlt={activity.backgroundAlt}
      ready={sceneReady}
      title={activity.title}
      statement={{
        speaker: 'David',
        blocks: activity.statement,
        label: activity.statementLabel,
        openLabel: activity.openStatement,
        closeLabel: activity.closeStatement,
      }}
      onPlayStart={() => xapi.activityAttempted(ACTIVITY_ID, activity.title)}
    >
      <HandWashing
        images={{ hands: image('washingHands'), soap: image('soapDispenser'), towel: image('paperTowel') }}
        labels={{
          checklistTitle: activity.checklistTitle,
          steps: activity.steps,
          hints: activity.hints,
          zones: activity.zones,
          hands: activity.hands,
          tap: activity.tap,
          soap: activity.soap,
          droplet: activity.droplet,
          towel: activity.towel,
          seconds: activity.seconds,
          zone: activity.zone,
        }}
        onStepDone={(index) => show('positive', activity.stepFeedback[index])}
        onWrongOrder={() => {
          mistakes.current += 1
          show('negative', activity.wrongOrder)
        }}
        onComplete={() => {
          setComplete(true)
          const total = activity.steps.length
          xapi.activityCompleted(ACTIVITY_ID, activity.title, Math.max(total - mistakes.current, 0), total)
        }}
      />

      {toast && (
        <Positioned bottom={200} center="x" width={900} layer="over-hud">
          <Surface key={toast.key} tone="opaque" padding="md" accent={toast.tone}>
            <output>
              <Text as="span" weight="bold">
                {toast.message}
              </Text>
            </output>
          </Surface>
        </Positioned>
      )}

      {complete && (
        <Positioned bottom={64} center="x" layer="over-hud">
          <Button claimFocus advance onClick={() => goTo('hand-washing-conclusion')}>
            {activity.next}
          </Button>
        </Positioned>
      )}
    </ActivityScene>
  )
}
