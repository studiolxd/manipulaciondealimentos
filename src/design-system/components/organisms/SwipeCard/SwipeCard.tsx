import { useSwipe, type SwipeDirection } from '@studiolxd/tramoya'
import { useId, useImperativeHandle, type CSSProperties, type ReactNode, type Ref } from 'react'
import { tokens } from '../../../generated/tokens'
import styles from './SwipeCard.module.css'

export type { SwipeDirection }

export interface SwipeCardHandle {
  /** Answers with the same exit animation as a drag (e.g. from YES / NO buttons). */
  swipe: (direction: SwipeDirection) => void
  focus: () => void
}

// Distance in stage pixels a card must travel to count as an answer.
const COMMIT_DISTANCE = 260
const EXIT_DISTANCE = 1600
const EXIT_MS = tokens['swipe-card.exit-duration']

interface SwipeCardProps {
  /** Accessible name, e.g. the person's name. */
  label: string
  /** Read after the name: the card's details. */
  description: string
  /** Announced as the kind of element, e.g. "Carnet". */
  roleDescription: string
  /** Keyboard instructions, only exposed to assistive technology. */
  keyboardHint: string
  ref?: Ref<SwipeCardHandle>
  onSwipe: (direction: SwipeDirection) => void
  /** Visual content of the card (e.g. <IdCard>), hidden from assistive technology. */
  children: ReactNode
}

function stageScale(element: HTMLElement): number {
  return Number(getComputedStyle(element).getPropertyValue('--slxd-stage-scale')) || 1
}

// Draggable content. Card answered by dragging it left or right with any pointer (mouse, touch,
// pen) or with the arrow keys. While it moves, its outline and shadow turn green
// towards YES (right) and red towards NO (left). The arrows work wherever the focus is while the
// card is on screen and usable (not inert, no dialog in use). It fills its parent.
export function SwipeCard({
  label,
  description,
  roleDescription,
  keyboardHint,
  ref,
  onSwipe,
  children,
}: SwipeCardProps) {
  const { ref: cardRef, x, progress, dragging, reducedMotion, swipe, handlers } = useSwipe({
    commitDistance: COMMIT_DISTANCE,
    exitDistance: EXIT_DISTANCE,
    exitMs: EXIT_MS,
    scale: stageScale,
    onSwipe,
  })
  const descriptionId = useId()
  const hintId = useId()

  useImperativeHandle(ref, () => ({ swipe, focus: () => cardRef.current?.focus() }))

  const style = {
    '--swipe-x': `${x}px`,
    '--swipe-rotate': `${x * 0.02}deg`,
    '--swipe-right': Math.max(0, progress),
    '--swipe-left': Math.max(0, -progress),
  } as CSSProperties

  return (
    // role="application" is an interactive widget (arrow keys, pointer drag); the rules do not know it.
    // oxlint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <div
      ref={cardRef}
      role="application"
      aria-roledescription={roleDescription}
      aria-label={label}
      aria-describedby={`${descriptionId} ${hintId}`}
      // oxlint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={0}
      className={styles.card}
      data-dragging={dragging || reducedMotion || undefined}
      style={style}
      {...handlers}
    >
      <div className={styles.content} aria-hidden="true">
        {children}
      </div>
      <div className={styles.focus} />
      <div className={styles.frame} data-side="right" />
      <div className={styles.frame} data-side="left" />
      <span id={descriptionId} hidden>
        {description}
      </span>
      <span id={hintId} hidden>
        {keyboardHint}
      </span>
    </div>
  )
}
