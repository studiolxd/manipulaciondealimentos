import { shuffle } from '@studiolxd/tramoya'
import { useRef, useState } from 'react'
import { image } from '../content/images'
import { whoIsFoodHandler as activity, type PersonCard } from '../content/whoIsFoodHandler'
import {
  ActivityScene,
  Button,
  IdCard,
  Label,
  SwipeSorter,
  type SwipeDirection,
  type SwipeSorterHandle,
} from '../design-system'
import { useGame } from '../game/game'
import { xapi } from '../game/tracking'

// Scenes 4 and 5 (activity 2): sort the ID cards into food handlers or not.

interface Answer {
  card: PersonCard
  correct: boolean
}

const ACTIVITY_ID = 'who-is-food-handler'

export function WhoIsFoodHandlerScene() {
  const { sceneReady, goTo } = useGame()
  // Shuffled once per game load.
  const [deck] = useState(() => shuffle(activity.cards))
  const [answers, setAnswers] = useState<Answer[]>([])
  const sorterRef = useRef<SwipeSorterHandle>(null)

  const current: PersonCard | undefined = deck[answers.length]
  const last = answers.at(-1)

  function answer(card: PersonCard, direction: SwipeDirection) {
    const response = direction === 'right'
    const next = [...answers, { card, correct: response === card.isFoodHandler }]
    setAnswers(next)
    xapi.answered({
      activityId: ACTIVITY_ID,
      activityName: activity.title,
      questionId: card.id,
      question: activity.question(card),
      response,
      correctResponse: card.isFoodHandler,
    })
    if (next.length === deck.length) {
      xapi.activityCompleted(ACTIVITY_ID, activity.title, next.filter((a) => a.correct).length, deck.length)
    }
  }

  return (
    <ActivityScene
      heading={activity.heading}
      background={image('diningTableTopBackground')}
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
      hudEnd={
        <Label tone="inverse">{activity.progress(Math.min(answers.length + 1, deck.length), deck.length)}</Label>
      }
      onPlayStart={() => {
        xapi.activityAttempted(ACTIVITY_ID, activity.title)
        // The first card takes the focus, so screen readers announce it with its keyboard hint.
        sorterRef.current?.focus()
      }}
    >
      <SwipeSorter
        ref={sorterRef}
        item={
          current
            ? {
                id: current.id,
                label: current.name,
                description: `${current.job}. ${current.description}`,
                content: (
                  <IdCard
                    name={current.name}
                    job={current.job}
                    description={current.description}
                    portrait={image(current.portrait)}
                  />
                ),
              }
            : null
        }
        feedback={
          last
            ? {
                tone: last.correct ? 'positive' : 'negative',
                title: last.correct ? activity.correct : activity.incorrect,
                message: last.card.explanation,
              }
            : null
        }
        labels={{
          roleDescription: activity.cardRoleDescription,
          keyboardHint: activity.keyboardHint,
          yes: activity.yes,
          no: activity.no,
          yesButton: activity.yesButton,
          noButton: activity.noButton,
          continue: activity.feedbackContinue,
        }}
        done={
          <Button claimFocus advance onClick={() => goTo('who-is-food-handler-conclusion')}>
            {activity.next}
          </Button>
        }
        onAnswer={(direction) => current && answer(current, direction)}
      />
    </ActivityScene>
  )
}
