import { useRef, useState } from 'react'
import { feedback } from '../content/feedback'
import { image } from '../content/images'
import { kitchenDetectives as activity } from '../content/kitchenDetectives'
import {
  ActivityScene,
  Button,
  FeedbackPanel,
  HotspotMatch,
  Layer,
  Positioned,
  TabletFrame,
  type Feedback,
} from '../design-system'
import { useGame } from '../game/game'
import { xapi } from '../game/tracking'

const ACTIVITY_ID = 'kitchen-detectives'

// Scenes 18 and 19 (activity 4): on the tablet, the 8 basic rules on the left
// and a kitchen on the right with 8 hidden points. Each rule is dropped (or
// picked and placed) on the point where it is broken; every attempt gets its
// feedback, and a placed rule goes back to the list marked as right.
export function KitchenDetectivesScene() {
  const { sceneReady, goTo } = useGame()
  const [placed, setPlaced] = useState<string[]>([])
  const [shown, setShown] = useState<Feedback | null>(null)
  // For the score sent with xAPI: rules placed right at their first attempt.
  const tried = useRef(new Set<string>())
  const firstTryRight = useRef(0)

  const allPlaced = placed.length === activity.rules.length

  function attempt(ruleId: string, spotId: string | null) {
    const rule = activity.rules.find((r) => r.id === ruleId)
    if (!rule) return
    const correct = spotId === rule.spot.id
    // A point already matched with another rule.
    const taken = spotId !== null && activity.rules.some((r) => r.spot.id === spotId && placed.includes(r.id))

    if (!tried.current.has(ruleId)) {
      tried.current.add(ruleId)
      if (correct) firstTryRight.current += 1
    }
    xapi.answered({
      activityId: ACTIVITY_ID,
      activityName: activity.title,
      questionId: rule.id,
      question: `¿Dónde se incumple la regla «${rule.label}»?`,
      response: correct,
      correctResponse: true,
    })

    if (correct) {
      const next = [...placed, rule.id]
      setPlaced(next)
      if (next.length === activity.rules.length) {
        xapi.activityCompleted(ACTIVITY_ID, activity.title, firstTryRight.current, activity.rules.length)
      }
      setShown(feedback('positive', rule.correct))
    } else setShown(feedback('negative', taken ? activity.taken : activity.wrong))
  }

  return (
    <ActivityScene
      heading={activity.heading}
      background={image('counterTopBackground')}
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
      <Positioned top={150} left={80} width={1760} height={860}>
        <TabletFrame>
          <HotspotMatch
            listLabel={activity.listLabel}
            instructions={activity.instructions}
            items={activity.rules.map((rule) => ({ id: rule.id, label: rule.label }))}
            done={placed}
            image={image('kitchenScene')}
            imageAlt={activity.imageAlt}
            spots={activity.rules.map((rule) => rule.spot)}
            onAttempt={attempt}
          />
        </TabletFrame>
      </Positioned>

      {allPlaced && !shown && (
        <Positioned bottom={24} center="x">
          <Button claimFocus advance onClick={() => goTo('detectives-conclusion')}>
            {activity.next}
          </Button>
        </Positioned>
      )}

      {shown && (
        <Layer layer="dialog" backdrop>
          <Positioned center="both" width={1300}>
            <FeedbackPanel feedback={shown} closeLabel={activity.feedbackContinue} onClose={() => setShown(null)} />
          </Positioned>
        </Layer>
      )}
    </ActivityScene>
  )
}
