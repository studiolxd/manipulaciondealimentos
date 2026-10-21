import { useEffect, useEffectEvent, useId, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { useReducedMotion } from '../engine/useMediaQuery'

export type SwipeDirection = 'left' | 'right'

// Distance in stage pixels a card must travel to count as an answer.
const COMMIT_DISTANCE = 260
const LEAVE_MS = 350

interface SwipeCardProps {
  /** Announced as the kind of element, e.g. "Carnet". */
  roleDescription: string
  labelledBy: string
  describedBy: string
  /** Keyboard instructions, only exposed to assistive technology. */
  keyboardHint: string
  /** Stamps shown while dragging towards each side. */
  leftStamp: string
  rightStamp: string
  className?: string
  onSwipe: (direction: SwipeDirection) => void
  children: ReactNode
}

function stageScale(element: HTMLElement): number {
  return Number(getComputedStyle(element).getPropertyValue('--stage-scale')) || 1
}

// Card answered by dragging it left or right with any pointer (mouse, touch,
// pen) or with the arrow keys.
export function SwipeCard({
  roleDescription,
  labelledBy,
  describedBy,
  keyboardHint,
  leftStamp,
  rightStamp,
  className,
  onSwipe,
  children,
}: SwipeCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const drag = useRef<{ pointerId: number; startX: number; scale: number } | null>(null)
  const [offset, setOffset] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [leaving, setLeaving] = useState<SwipeDirection | null>(null)
  const reducedMotion = useReducedMotion()
  const hintId = useId()

  // A new card takes the focus when the previous one (which had it) is gone.
  useEffect(() => {
    if (!document.activeElement || document.activeElement === document.body) ref.current?.focus()
  }, [])

  const notifySwipe = useEffectEvent((direction: SwipeDirection) => onSwipe(direction))
  useEffect(() => {
    if (!leaving) return
    const timer = setTimeout(() => notifySwipe(leaving), reducedMotion ? 0 : LEAVE_MS)
    return () => clearTimeout(timer)
  }, [leaving, reducedMotion])

  function release(direction: SwipeDirection) {
    if (!leaving) setLeaving(direction)
  }

  function endDrag() {
    drag.current = null
    setDragging(false)
  }

  const progress = leaving ? (leaving === 'right' ? 1 : -1) : Math.max(-1, Math.min(1, offset / COMMIT_DISTANCE))
  const x = leaving ? (leaving === 'right' ? 1600 : -1600) : offset
  const style = {
    transform: `translateX(${x}px) rotate(${x * 0.02}deg)`,
    transition: dragging || reducedMotion ? 'none' : `transform ${LEAVE_MS}ms ease-out`,
    '--swipe-right': Math.max(0, progress),
    '--swipe-left': Math.max(0, -progress),
  } as CSSProperties

  return (
    <div
      ref={ref}
      role="application"
      aria-roledescription={roleDescription}
      aria-labelledby={labelledBy}
      aria-describedby={`${describedBy} ${hintId}`}
      tabIndex={0}
      className={`swipe-card ${className ?? ''}`}
      style={style}
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
          event.preventDefault()
          release(event.key === 'ArrowRight' ? 'right' : 'left')
        }
      }}
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
      {children}
      <span className="swipe-card__stamp swipe-card__stamp--right" aria-hidden="true">
        {rightStamp}
      </span>
      <span className="swipe-card__stamp swipe-card__stamp--left" aria-hidden="true">
        {leftStamp}
      </span>
      <span id={hintId} hidden>
        {keyboardHint}
      </span>
    </div>
  )
}
