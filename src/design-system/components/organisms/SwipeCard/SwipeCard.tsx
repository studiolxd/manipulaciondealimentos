import { useEffect, useEffectEvent, useId, useImperativeHandle, useRef, useState, type CSSProperties, type ReactNode, type Ref } from 'react'
import { tokens } from '../../../generated/tokens'
import { useReducedMotion } from '../../../hooks/useMediaQuery'
import styles from './SwipeCard.module.css'

export type SwipeDirection = 'left' | 'right'

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
  /** Stamps shown while dragging towards each side. */
  leftStamp: string
  rightStamp: string
  ref?: Ref<SwipeCardHandle>
  onSwipe: (direction: SwipeDirection) => void
  /** Visual content of the card (e.g. <IdCard>), hidden from assistive technology. */
  children: ReactNode
}

function stageScale(element: HTMLElement): number {
  return Number(getComputedStyle(element).getPropertyValue('--slxd-stage-scale')) || 1
}

// Card answered by dragging it left or right with any pointer (mouse, touch,
// pen) or with the arrow keys. The arrows work wherever the focus is while the
// card is on screen and usable (not inert, no dialog in use). It fills its parent.
export function SwipeCard({
  label,
  description,
  roleDescription,
  keyboardHint,
  leftStamp,
  rightStamp,
  ref,
  onSwipe,
  children,
}: SwipeCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const drag = useRef<{ pointerId: number; startX: number; scale: number } | null>(null)
  const [offset, setOffset] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [leaving, setLeaving] = useState<SwipeDirection | null>(null)
  const reducedMotion = useReducedMotion()
  const descriptionId = useId()
  const hintId = useId()

  // A new card takes the focus when the previous one (which had it) is gone.
  useEffect(() => {
    if (!document.activeElement || document.activeElement === document.body) cardRef.current?.focus()
  }, [])

  const notifySwipe = useEffectEvent((direction: SwipeDirection) => onSwipe(direction))
  useEffect(() => {
    if (!leaving) return
    const timer = setTimeout(() => notifySwipe(leaving), reducedMotion ? 0 : EXIT_MS)
    return () => clearTimeout(timer)
  }, [leaving, reducedMotion])

  function release(direction: SwipeDirection) {
    if (!leaving) setLeaving(direction)
  }

  useImperativeHandle(ref, () => ({ swipe: release, focus: () => cardRef.current?.focus() }))

  const handleKey = useEffectEvent((event: KeyboardEvent) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
    if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return
    // Leave the arrows alone where they have their own job, and while the card cannot be used.
    const target = event.target instanceof Element ? event.target : null
    if (target?.closest('input, textarea, select, [contenteditable="true"], dialog, [role="dialog"]')) return
    if (cardRef.current?.closest('[inert]')) return
    event.preventDefault()
    release(event.key === 'ArrowRight' ? 'right' : 'left')
  })
  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [])

  function endDrag() {
    drag.current = null
    setDragging(false)
  }

  const progress = leaving ? (leaving === 'right' ? 1 : -1) : Math.max(-1, Math.min(1, offset / COMMIT_DISTANCE))
  const x = leaving ? (leaving === 'right' ? EXIT_DISTANCE : -EXIT_DISTANCE) : offset
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
      onPointerDown={(event) => {
        if (leaving || drag.current) return
        event.currentTarget.setPointerCapture(event.pointerId)
        drag.current = { pointerId: event.pointerId, startX: event.clientX, scale: stageScale(event.currentTarget) }
        setDragging(true)
      }}
      onPointerMove={(event) => {
        const current = drag.current
        if (current?.pointerId !== event.pointerId) return
        setOffset((event.clientX - current.startX) / current.scale)
      }}
      onPointerUp={(event) => {
        const current = drag.current
        if (current?.pointerId !== event.pointerId) return
        // Measured from the event: a quick flick ends before `offset` re-renders.
        const distance = (event.clientX - current.startX) / current.scale
        endDrag()
        if (Math.abs(distance) >= COMMIT_DISTANCE) release(distance > 0 ? 'right' : 'left')
        else setOffset(0)
      }}
      onPointerCancel={() => {
        endDrag()
        setOffset(0)
      }}
    >
      <div className={styles.content} aria-hidden="true">
        {children}
      </div>
      <span className={styles.stamp} data-side="right" aria-hidden="true">
        {rightStamp}
      </span>
      <span className={styles.stamp} data-side="left" aria-hidden="true">
        {leftStamp}
      </span>
      <span id={descriptionId} hidden>
        {description}
      </span>
      <span id={hintId} hidden>
        {keyboardHint}
      </span>
    </div>
  )
}
