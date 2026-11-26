import { useRef, useState } from 'react'
import { image } from '../content/images'
import { shouldYouWash as activity, type WashSituation } from '../content/shouldYouWash'
import {
  ActivityScene,
  Button,
  FeedbackPanel,
  Image,
  Label,
  Layer,
  Positioned,
  Surface,
  Text,
  VisuallyHidden,
  type Feedback,
} from '../design-system'
import { useGame } from '../game/game'
import { xapi } from '../game/tracking'

const ACTIVITY_ID = 'should-you-wash'

// Scenes 38 and 39 (activity 10): a pictogram card at a time with a situation of
// the working day; the player says whether the hands must be washed. The
// feedback opens over the scene and its button goes on to the next situation,
// or to David's conclusion after the last one.
export function ShouldYouWashScene() {
  const { sceneReady, goTo } = useGame()
  const [index, setIndex] = useState(0)
  const [shown, setShown] = useState<Feedback | null>(null)
  const right = useRef(0)

  const situations = activity.situations
  const current: WashSituation = situations[index]
  const last = index + 1 === situations.length

  function answer(wash: boolean) {
    const correct = wash === current.wash
    if (correct) right.current += 1
    xapi.answered({
      activityId: ACTIVITY_ID,
      activityName: activity.title,
      questionId: current.id,
      question: activity.question(current),
      response: wash,
      correctResponse: current.wash,
    })
    if (last) xapi.activityCompleted(ACTIVITY_ID, activity.title, right.current, situations.length)
    setShown({
      tone: correct ? 'positive' : 'negative',
      title: correct ? activity.correct : activity.incorrect,
      message: current.explanation,
    })
  }

  function closeFeedback() {
    setShown(null)
    if (last) goTo('should-you-wash-conclusion')
    else setIndex(index + 1)
  }

  return (
    <ActivityScene
      heading={activity.heading}
      background={image('kitchenSinkBackground')}
      backgroundAlt={activity.backgroundAlt}
      ready={sceneReady}
      title={activity.title}
      // The scene stays under a dark veil during the whole activity.
      underlay={
        <Layer backdrop="dark">
          <></>
        </Layer>
      }
      statement={{
        speaker: 'David',
        blocks: activity.statement,
        label: activity.statementLabel,
        openLabel: activity.openStatement,
        closeLabel: activity.closeStatement,
      }}
      hudEnd={<Label size="hud" tone="inverse">{activity.progress(index + 1, situations.length)}</Label>}
      onPlayStart={() => xapi.activityAttempted(ACTIVITY_ID, activity.title)}
    >
      <Layer inert={shown !== null}>
        <Positioned top={150} center="x" width={640}>
          <Surface key={current.id} tone="paper" padding="lg">
            <Image source={image(current.pictogram)} alt="" width={400} height={400} />
            <Text weight="bold">
              <VisuallyHidden>{activity.cardLabel}: </VisuallyHidden>
              {current.text}
            </Text>
          </Surface>
        </Positioned>
        <Positioned bottom={64} centerAt={780}>
          <Button variant="choice-positive" aria-label={activity.yesButton} onClick={() => answer(true)}>
            {activity.yes}
          </Button>
        </Positioned>
        <Positioned bottom={64} centerAt={1140}>
          <Button variant="choice-negative" aria-label={activity.noButton} onClick={() => answer(false)}>
            {activity.no}
          </Button>
        </Positioned>
      </Layer>

      {shown && (
        <Layer layer="dialog" backdrop>
          <Positioned center="both" width={1300}>
            <FeedbackPanel feedback={shown} closeLabel={last ? activity.finish : activity.next} onClose={closeFeedback} />
          </Positioned>
        </Layer>
      )}
    </ActivityScene>
  )
}
