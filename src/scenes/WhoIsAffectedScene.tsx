import { shuffle } from '@studiolxd/tramoya'
import { useRef, useState } from 'react'
import { image } from '../content/images'
import { whoIsAffected as activity, type Affected } from '../content/whoIsAffected'
import { ActivityScene, Button, Label, OptionButtons, Positioned, SpeechBubble } from '../design-system'
import { useGame } from '../game/game'
import { xapi } from '../game/tracking'

const ACTIVITY_ID = 'who-is-affected'

// Scenes 21 and 22 (activity 5): David, standing in front of the player, reads
// a consequence at a time; the player says who it affects with one of three
// buttons. David gives the feedback in the same bubble; a wrong answer is
// tried again, and "Siguiente" appears only once it is right.
export function WhoIsAffectedScene() {
  const { sceneReady, goTo } = useGame()
  // Shuffled once per game load.
  const [deck] = useState(() => shuffle(activity.consequences))
  const [index, setIndex] = useState(0)
  const [result, setResult] = useState<{ choice: Affected; correct: boolean } | null>(null)
  // Each answer gets a new bubble, so it is typed again.
  const [answers, setAnswers] = useState(0)
  const tried = useRef(new Set<string>())
  const firstTryRight = useRef(0)

  const current = deck[index]
  const last = index + 1 === deck.length
  const right = result?.correct === true

  function choose(choice: Affected) {
    const correct = choice === current.affected
    if (!tried.current.has(current.id)) {
      tried.current.add(current.id)
      if (correct) firstTryRight.current += 1
    }
    xapi.answered({
      activityId: ACTIVITY_ID,
      activityName: activity.title,
      questionId: current.id,
      question: `¿A quién afecta principalmente? ${current.text}`,
      response: correct,
      correctResponse: true,
    })
    if (correct && last) xapi.activityCompleted(ACTIVITY_ID, activity.title, firstTryRight.current, deck.length)
    setResult({ choice, correct })
    setAnswers((n) => n + 1)
  }

  // David reads the consequence; after an answer, its feedback, keeping the
  // consequence in view while it is still to be answered right.
  const speech = !result
    ? current.text
    : result.correct
      ? activity.correct[current.affected]
      : `${activity.incorrect[result.choice]}\n\n«${current.text}»`

  return (
    <ActivityScene
      heading={activity.heading}
      background={image('receptionBackground')}
      backgroundAlt={activity.backgroundAlt}
      ready={sceneReady}
      title={activity.title}
      statement={{
        speaker: 'David',
        blocks: activity.statement,
        label: activity.title,
        openLabel: activity.title,
        closeLabel: activity.title,
      }}
      character={{ source: image('davidHalfBody'), alt: activity.davidAlt, bottom: 0, left: 140, height: 900 }}
      startLabel={activity.start}
      hudEnd={<Label tone="inverse">{activity.progress(index + 1, deck.length)}</Label>}
      onPlayStart={() => xapi.activityAttempted(ACTIVITY_ID, activity.title)}
    >
      <Positioned top={160} left={820} width={1000}>
        <SpeechBubble key={`${current.id}-${answers}`} speaker="David" blocks={[speech]} tail="left" />
      </Positioned>

      <Positioned bottom={200} left={1080} width={480}>
        <OptionButtons stacked disabled={right} label={activity.optionsLabel} options={activity.options} onSelect={choose} />
      </Positioned>

      {right && (
        <Positioned bottom={64} left={1080} width={480}>
          {last ? (
            <Button claimFocus advance onClick={() => goTo('who-is-affected-conclusion')}>
              {activity.finish}
            </Button>
          ) : (
            <Button
              claimFocus
              onClick={() => {
                setIndex(index + 1)
                setResult(null)
              }}
            >
              {activity.next}
            </Button>
          )}
        </Positioned>
      )}
    </ActivityScene>
  )
}
