import { useRef, useState } from 'react'
import { image } from '../content/images'
import { whoIsFoodHandler, type PersonCard } from '../content/whoIsFoodHandler'
import {
  ActivityTitle,
  Button,
  Dialog,
  FeedbackPanel,
  HudLabel,
  IconButton,
  IdCard,
  Layer,
  Positioned,
  SceneFrame,
  SpeechBubble,
  SwipeCard,
  Text,
  withViewTransition,
  type SwipeCardHandle,
  type SwipeDirection,
} from '../design-system'
import { useGame } from '../engine/gameContext'
import { shuffle } from '../engine/shuffle'
import { xapi } from '../engine/tracking/xapi'

// Scenes 4 and 5 (activity 2): title, statement and the ID cards. The
// statement bubble shrinks into an icon that can reopen it.

type Phase = 'title' | 'statement' | 'cards'

interface Answer {
  card: PersonCard
  correct: boolean
}

const STATEMENT_TRANSITION = 'statement'
const ACTIVITY_ID = 'who-is-food-handler'

export function WhoIsFoodHandlerScene() {
  const { sceneReady, goTo } = useGame()
  const [phase, setPhase] = useState<Phase>('title')
  const [statementOpen, setStatementOpen] = useState(false)
  // Shuffled once per game load.
  const [deck] = useState(() => shuffle(whoIsFoodHandler.cards))
  const [answers, setAnswers] = useState<Answer[]>([])
  const statementButtonRef = useRef<HTMLButtonElement>(null)
  const cardRef = useRef<SwipeCardHandle>(null)

  const current: PersonCard | undefined = deck[answers.length]
  const lastAnswer = answers.at(-1)
  const finished = answers.length === deck.length

  function answer(card: PersonCard, direction: SwipeDirection) {
    const response = direction === 'right'
    const next = [...answers, { card, correct: response === card.isFoodHandler }]
    setAnswers(next)
    xapi.answered({
      activityId: ACTIVITY_ID,
      activityName: whoIsFoodHandler.title,
      questionId: card.id,
      question: whoIsFoodHandler.question(card),
      response,
      correctResponse: card.isFoodHandler,
    })
    if (next.length === deck.length) {
      xapi.activityCompleted(ACTIVITY_ID, whoIsFoodHandler.title, next.filter((a) => a.correct).length, deck.length)
    }
  }

  function startCards() {
    xapi.activityAttempted(ACTIVITY_ID, whoIsFoodHandler.title)
    withViewTransition(() => setPhase('cards'))
  }

  function closeStatement() {
    withViewTransition(
      () => setStatementOpen(false),
      () => statementButtonRef.current?.focus(),
    )
  }

  return (
    <SceneFrame
      heading={whoIsFoodHandler.heading}
      background={image('diningTableTopBackground')}
      backgroundAlt={whoIsFoodHandler.backgroundAlt}
      focusHeading={sceneReady}
    >
      {sceneReady && phase === 'title' && (
        <Positioned center="both" layer="over-hud">
          <ActivityTitle title={whoIsFoodHandler.title} onFinished={() => setPhase('statement')} />
        </Positioned>
      )}

      {phase === 'statement' && (
        <Positioned top={160} left={210} width={1500} layer="over-hud">
          <SpeechBubble
            speaker="David"
            blocks={whoIsFoodHandler.statement}
            viewTransitionName={STATEMENT_TRANSITION}
            onDismiss={startCards}
          />
        </Positioned>
      )}

      {phase === 'cards' && (
        <>
          <Layer layer="over-hud" inert={statementOpen}>
            <Positioned top={4} left={24}>
              <IconButton
                ref={statementButtonRef}
                icon="statement"
                label={whoIsFoodHandler.openStatement}
                opensDialog
                // While open, the icon has become the dialog.
                concealed={statementOpen}
                viewTransitionName={STATEMENT_TRANSITION}
                onClick={() => withViewTransition(() => setStatementOpen(true))}
              />
            </Positioned>
            <Positioned top={0} right={0}>
              <HudLabel>{whoIsFoodHandler.progress(Math.min(answers.length + 1, deck.length), deck.length)}</HudLabel>
            </Positioned>
          </Layer>

          <Layer inert={statementOpen}>
            {current && (
              <>
                <Positioned top={160} left={400} width={1120} height={520}>
                  <SwipeCard
                    key={current.id}
                    ref={cardRef}
                    label={current.name}
                    description={`${current.job}. ${current.description}`}
                    roleDescription={whoIsFoodHandler.cardRoleDescription}
                    keyboardHint={whoIsFoodHandler.keyboardHint}
                    leftStamp={whoIsFoodHandler.no}
                    rightStamp={whoIsFoodHandler.yes}
                    onSwipe={(direction) => answer(current, direction)}
                  >
                    <IdCard
                      name={current.name}
                      job={current.job}
                      description={current.description}
                      portrait={image(current.portrait)}
                    />
                  </SwipeCard>
                </Positioned>
                {/* Single-tap alternative to dragging (WCAG 2.5.7). */}
                <Positioned top={370} left={64}>
                  <Button
                    variant="choice-negative"
                    aria-label={whoIsFoodHandler.noButton}
                    onClick={() => cardRef.current?.swipe('left')}
                  >
                    ← {whoIsFoodHandler.no}
                  </Button>
                </Positioned>
                <Positioned top={370} right={64}>
                  <Button
                    variant="choice-positive"
                    aria-label={whoIsFoodHandler.yesButton}
                    onClick={() => cardRef.current?.swipe('right')}
                  >
                    {whoIsFoodHandler.yes} →
                  </Button>
                </Positioned>
              </>
            )}
            <Positioned top={720} left={210} width={1500}>
              <FeedbackPanel
                feedback={
                  lastAnswer
                    ? {
                        tone: lastAnswer.correct ? 'positive' : 'negative',
                        title: lastAnswer.correct ? whoIsFoodHandler.correct : whoIsFoodHandler.incorrect,
                        message: lastAnswer.card.explanation,
                      }
                    : null
                }
              />
            </Positioned>
            {finished && (
              <Positioned top={380} center="x">
                <Button claimFocus onClick={() => goTo('who-is-food-handler-conclusion')}>
                  {whoIsFoodHandler.next}
                </Button>
              </Positioned>
            )}
          </Layer>

          {statementOpen && (
            <Positioned top={160} left={210} width={1500} layer="dialog">
              <Dialog
                label={whoIsFoodHandler.statementLabel}
                closeLabel={whoIsFoodHandler.closeStatement}
                viewTransitionName={STATEMENT_TRANSITION}
                onClose={closeStatement}
              >
                {whoIsFoodHandler.statement.map((paragraph) => (
                  <Text key={paragraph}>{paragraph}</Text>
                ))}
              </Dialog>
            </Positioned>
          )}
        </>
      )}
    </SceneFrame>
  )
}
