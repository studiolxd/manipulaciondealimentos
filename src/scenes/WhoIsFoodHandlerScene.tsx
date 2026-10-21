import { useEffect, useId, useRef, useState } from 'react'
import { SwipeCard, type SwipeDirection } from '../activities/SwipeCard'
import { whoIsFoodHandler, type PersonCard } from '../content/whoIsFoodHandler'
import { ActionButton } from '../engine/ActionButton'
import { assetUrl } from '../engine/assetUrl'
import { useGame } from '../engine/gameContext'
import { Scene } from '../engine/Scene'
import { shuffle } from '../engine/shuffle'
import { SpeechBubble } from '../engine/SpeechBubble'
import { withViewTransition } from '../engine/viewTransition'

// Scenes 4 and 5 (activity 2): title, statement and the ID cards. The
// statement bubble shrinks into an icon that can reopen it.

type Phase = 'title' | 'statement' | 'cards'

interface Answer {
  card: PersonCard
  correct: boolean
}

const STATEMENT_TRANSITION = 'statement'

export function WhoIsFoodHandlerScene() {
  const { sceneReady, goTo } = useGame()
  const [phase, setPhase] = useState<Phase>('title')
  const [statementOpen, setStatementOpen] = useState(false)
  // Shuffled once per game load.
  const [deck] = useState(() => shuffle(whoIsFoodHandler.cards))
  const [answers, setAnswers] = useState<Answer[]>([])
  const statementButtonRef = useRef<HTMLButtonElement>(null)

  const current: PersonCard | undefined = deck[answers.length]
  const lastAnswer = answers.at(-1)
  const finished = answers.length === deck.length

  function answer(card: PersonCard, direction: SwipeDirection) {
    setAnswers((previous) => [...previous, { card, correct: (direction === 'right') === card.isFoodHandler }])
  }

  function closeStatement() {
    withViewTransition(
      () => setStatementOpen(false),
      () => statementButtonRef.current?.focus(),
    )
  }

  return (
    <Scene
      heading={whoIsFoodHandler.heading}
      background="diningTableTopBackground"
      backgroundAlt={whoIsFoodHandler.backgroundAlt}
      className="who-is"
    >
      {sceneReady && phase === 'title' && (
        <p className="activity-title" aria-hidden="true" onAnimationEnd={() => setPhase('statement')}>
          {whoIsFoodHandler.title}
        </p>
      )}

      {phase === 'statement' && (
        <SpeechBubble
          className="who-is__statement"
          speaker="David"
          blocks={whoIsFoodHandler.statement}
          viewTransitionName={STATEMENT_TRANSITION}
          onDismiss={() => withViewTransition(() => setPhase('cards'))}
        />
      )}

      {phase === 'cards' && (
        <>
          <div className="who-is__board" inert={statementOpen}>
            <button
              ref={statementButtonRef}
              type="button"
              className="statement-button"
              // While open, the icon has become the dialog: it hides and hands over the transition name.
              style={
                statementOpen ? { visibility: 'hidden' } : { viewTransitionName: STATEMENT_TRANSITION }
              }
              aria-label={whoIsFoodHandler.openStatement}
              aria-haspopup="dialog"
              onClick={() => withViewTransition(() => setStatementOpen(true))}
            >
              <img className="statement-button__icon" src={assetUrl('statementIcon')} alt="" />
            </button>
            <p className="who-is__progress">
              {whoIsFoodHandler.progress(Math.min(answers.length + 1, deck.length), deck.length)}
            </p>
            {current && (
              <>
                <span className="who-is__side who-is__side--no" aria-hidden="true">
                  ← {whoIsFoodHandler.no}
                </span>
                <span className="who-is__side who-is__side--yes" aria-hidden="true">
                  {whoIsFoodHandler.yes} →
                </span>
                <PersonSwipeCard key={current.id} card={current} onSwipe={(direction) => answer(current, direction)} />
              </>
            )}
            <div className="who-is__feedback" aria-live="polite">
              {lastAnswer && <Feedback answer={lastAnswer} />}
            </div>
            {finished && (
              <ActionButton className="who-is__continue" onClick={() => goTo('who-is-food-handler-conclusion')}>
                {whoIsFoodHandler.next}
              </ActionButton>
            )}
          </div>
          {statementOpen && <StatementDialog onClose={closeStatement} />}
        </>
      )}
    </Scene>
  )
}

function PersonSwipeCard({ card, onSwipe }: { card: PersonCard; onSwipe: (direction: SwipeDirection) => void }) {
  const nameId = useId()
  const jobId = useId()
  const descriptionId = useId()
  return (
    <SwipeCard
      className="person-card"
      roleDescription={whoIsFoodHandler.cardRoleDescription}
      labelledBy={nameId}
      describedBy={`${jobId} ${descriptionId}`}
      keyboardHint={whoIsFoodHandler.keyboardHint}
      leftStamp={whoIsFoodHandler.no}
      rightStamp={whoIsFoodHandler.yes}
      onSwipe={onSwipe}
    >
      <div className="person-card__text">
        <p id={nameId} className="person-card__name">
          {card.name}
        </p>
        <div>
          <p id={jobId} className="person-card__job">
            {card.job}
          </p>
          <p id={descriptionId} className="person-card__description">
            {card.description}
          </p>
        </div>
      </div>
      <img className="person-card__portrait" src={assetUrl(card.portrait)} alt="" draggable={false} />
    </SwipeCard>
  )
}

function Feedback({ answer }: { answer: Answer }) {
  return (
    <>
      <img
        className="who-is__feedback-icon"
        src={assetUrl(answer.correct ? 'correctIcon' : 'incorrectIcon')}
        alt=""
      />
      <p className="who-is__feedback-text">
        <strong>{answer.correct ? whoIsFoodHandler.correct : whoIsFoodHandler.incorrect}</strong>{' '}
        {answer.card.explanation}
      </p>
    </>
  )
}

function StatementDialog({ onClose }: { onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeRef.current?.focus()
  }, [])

  return (
    <div
      className="statement-dialog"
      role="dialog"
      aria-modal="true"
      aria-label={whoIsFoodHandler.statementLabel}
      style={{ viewTransitionName: STATEMENT_TRANSITION }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') onClose()
      }}
    >
      <div className="statement-dialog__body">
        {whoIsFoodHandler.statement.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <button
        ref={closeRef}
        type="button"
        className="statement-dialog__close"
        aria-label={whoIsFoodHandler.closeStatement}
        onClick={onClose}
      >
        <img className="statement-dialog__close-icon" src={assetUrl('closeIcon')} alt="" />
      </button>
    </div>
  )
}
