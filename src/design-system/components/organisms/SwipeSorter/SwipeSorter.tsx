import { useImperativeHandle, useRef, useState, type ReactNode, type Ref } from 'react'
import { Button } from '../../atoms/Button/Button'
import { Layer } from '../../layout/Layer/Layer'
import { Positioned } from '../../layout/Positioned/Positioned'
import { FeedbackPanel, type Feedback } from '../../molecules/FeedbackPanel/FeedbackPanel'
import { SwipeCard, type SwipeCardHandle, type SwipeDirection } from '../SwipeCard/SwipeCard'

export interface SwipeSorterItem {
  id: string
  /** Accessible name of the card, e.g. the person's name. */
  label: string
  /** Read after the name: the card's details. */
  description: string
  /** Visual content of the card, e.g. an IdCard. */
  content: ReactNode
}

export interface SwipeSorterLabels {
  /** Announced as the kind of element, e.g. "Carnet". */
  roleDescription: string
  keyboardHint: string
  yes: string
  no: string
  /** Accessible names of the side buttons; they must start with `yes` / `no`. */
  yesButton: string
  noButton: string
  /** Button that closes the feedback, e.g. "Continuar". */
  continue: string
}

export interface SwipeSorterHandle {
  /** Moves the focus to the current card. */
  focus: () => void
}

interface SwipeSorterProps {
  /** Card to answer; null when there are none left. */
  item: SwipeSorterItem | null
  /** Result of the last answer, shown as a modal panel after each answer. */
  feedback: Feedback | null
  labels: SwipeSorterLabels
  /** Shown once there are no cards left, e.g. a "Continue" button. */
  done?: ReactNode
  ref?: Ref<SwipeSorterHandle>
  onAnswer: (direction: SwipeDirection) => void
}

// SwipeCard + YES / NO Buttons + FeedbackPanel: binary sorting activity that
// fills the stage below the HUD. Answers by dragging, with the arrow keys or
// with a single tap on the side buttons (WCAG 2.5.7). After each answer the
// feedback opens over a backdrop and the next card waits until it is closed.
export function SwipeSorter({ item, feedback, labels, done, ref, onAnswer }: SwipeSorterProps) {
  const cardRef = useRef<SwipeCardHandle>(null)
  const [feedbackOpen, setFeedbackOpen] = useState(false)
  useImperativeHandle(ref, () => ({ focus: () => cardRef.current?.focus() }))

  function closeFeedback() {
    setFeedbackOpen(false)
    // Once the card is usable again; with no cards left, the done content claims the focus.
    requestAnimationFrame(() => cardRef.current?.focus())
  }

  return (
    <>
      {item && (
        <Layer inert={feedbackOpen}>
          <Positioned top={160} left={400} width={1120} height={520}>
            <SwipeCard
              key={item.id}
              ref={cardRef}
              label={item.label}
              description={item.description}
              roleDescription={labels.roleDescription}
              keyboardHint={labels.keyboardHint}
              onSwipe={(direction) => {
                onAnswer(direction)
                setFeedbackOpen(true)
              }}
            >
              {item.content}
            </SwipeCard>
          </Positioned>
          <Positioned top={370} left={64}>
            <Button variant="choice-negative" aria-label={labels.noButton} onClick={() => cardRef.current?.swipe('left')}>
              {labels.no}
            </Button>
          </Positioned>
          <Positioned top={370} right={64}>
            <Button variant="choice-positive" aria-label={labels.yesButton} onClick={() => cardRef.current?.swipe('right')}>
              {labels.yes}
            </Button>
          </Positioned>
        </Layer>
      )}
      {feedbackOpen && feedback && (
        <Layer layer="dialog" backdrop>
          <Positioned center="both" width={1300}>
            <FeedbackPanel feedback={feedback} closeLabel={labels.continue} onClose={closeFeedback} />
          </Positioned>
        </Layer>
      )}
      {!item && done && !feedbackOpen && (
        <Positioned top={380} center="x">
          {done}
        </Positioned>
      )}
    </>
  )
}
