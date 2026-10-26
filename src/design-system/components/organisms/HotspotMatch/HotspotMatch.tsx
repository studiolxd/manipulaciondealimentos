import { useEffect, useEffectEvent, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import type { ImageSource } from '../../../types'
import { Button } from '../../atoms/Button/Button'
import { Image } from '../../atoms/Image/Image'
import { Text } from '../../atoms/Text/Text'
import { VisuallyHidden } from '../../utilities/VisuallyHidden/VisuallyHidden'
import styles from './HotspotMatch.module.css'

export interface MatchItem {
  id: string
  label: string
}

/** A hidden point of the picture, in the picture's own pixels. */
export interface Hotspot {
  id: string
  /** Accessible name: what is there, for those who cannot see the picture. */
  label: string
  x: number
  y: number
  width: number
  height: number
}

interface HotspotMatchProps {
  /** Name of the list, read by screen readers. */
  listLabel: string
  items: MatchItem[]
  /** Items already placed correctly: shown as right and no longer movable. */
  done: readonly string[]
  image: ImageSource
  imageAlt: string
  spots: Hotspot[]
  /** How to play without dragging, read by screen readers. */
  instructions: string
  /** An item was dropped on a point (spotId), or on the picture away from any point (null). */
  onAttempt: (itemId: string, spotId: string | null) => void
}

interface Pending {
  itemId: string
  pointerId: number
  startX: number
  startY: number
}

// Distance in real pixels a pointer must move before a press becomes a drag.
const DRAG_THRESHOLD = 8

// Buttons + Image: match each item of the list to a hidden point of a picture.
// Drag an item onto the picture, or (keyboard, single tap) pick an item and
// then a point; the points are invisible until they have the focus.
export function HotspotMatch({ listLabel, items, done, image, imageAlt, spots, instructions, onAttempt }: HotspotMatchProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const pictureRef = useRef<HTMLDivElement>(null)
  const [selected, setSelected] = useState<string | null>(null)
  const [pending, setPending] = useState<Pending | null>(null)
  const [drag, setDrag] = useState<{ itemId: string; x: number; y: number } | null>(null)
  // A drag ends with a click on the item it started from: that click is not a pick.
  const justDragged = useRef(false)

  function stagePoint(clientX: number, clientY: number) {
    const container = containerRef.current
    if (!container) return { x: 0, y: 0 }
    const rect = container.getBoundingClientRect()
    const scale = rect.width / container.offsetWidth || 1
    return { x: (clientX - rect.left) / scale, y: (clientY - rect.top) / scale }
  }

  function spotAt(clientX: number, clientY: number): string | null | undefined {
    const picture = pictureRef.current
    if (!picture) return undefined
    const rect = picture.getBoundingClientRect()
    const inside = clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom
    if (!inside) return undefined
    const x = ((clientX - rect.left) / rect.width) * image.width
    const y = ((clientY - rect.top) / rect.height) * image.height
    const spot = spots.find((s) => x >= s.x && x <= s.x + s.width && y >= s.y && y <= s.y + s.height)
    return spot?.id ?? null
  }

  const moveDrag = useEffectEvent((itemId: string, clientX: number, clientY: number) => {
    setDrag({ itemId, ...stagePoint(clientX, clientY) })
  })

  const drop = useEffectEvent((itemId: string, clientX: number, clientY: number) => {
    justDragged.current = true
    const spot = spotAt(clientX, clientY)
    // Dropped outside the picture: the item just goes back.
    if (spot !== undefined) onAttempt(itemId, spot)
  })

  useEffect(() => {
    if (!pending) return
    const { itemId, pointerId, startX, startY } = pending
    let dragging = false

    function onMove(event: PointerEvent) {
      if (event.pointerId !== pointerId) return
      if (!dragging && Math.hypot(event.clientX - startX, event.clientY - startY) < DRAG_THRESHOLD) return
      dragging = true
      moveDrag(itemId, event.clientX, event.clientY)
    }

    function onUp(event: PointerEvent) {
      if (event.pointerId !== pointerId) return
      setPending(null)
      setDrag(null)
      if (dragging) drop(itemId, event.clientX, event.clientY)
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
    }
  }, [pending])

  function startPress(itemId: string, event: ReactPointerEvent) {
    if (done.includes(itemId) || event.button !== 0) return
    justDragged.current = false
    setPending({ itemId, pointerId: event.pointerId, startX: event.clientX, startY: event.clientY })
  }

  const dragged = drag && items.find((item) => item.id === drag.itemId)

  return (
    <div ref={containerRef} className={styles.match}>
      <fieldset className={styles.list}>
        <legend className={styles.legend}>{listLabel}</legend>
        <VisuallyHidden as="p">{instructions}</VisuallyHidden>
        {items.map((item) => {
          const isDone = done.includes(item.id)
          return (
            <div
              key={item.id}
              className={styles.item}
              data-dragging={drag?.itemId === item.id || undefined}
              onPointerDown={(event) => startPress(item.id, event)}
            >
              <Button
                variant={isDone ? 'option-done' : 'option'}
                disabled={isDone}
                pressed={isDone ? undefined : selected === item.id}
                onClick={() => {
                  if (justDragged.current) {
                    justDragged.current = false
                    return
                  }
                  setSelected((current) => (current === item.id ? null : item.id))
                }}
              >
                {item.label}
              </Button>
            </div>
          )
        })}
      </fieldset>

      <div ref={pictureRef} className={styles.picture} style={{ aspectRatio: `${image.width} / ${image.height}` }}>
        <Image source={image} alt={imageAlt} fit="cover" />
        {spots.map((spot) => (
          <div
            key={spot.id}
            className={styles.spot}
            style={{
              left: `${(spot.x / image.width) * 100}%`,
              top: `${(spot.y / image.height) * 100}%`,
              width: `${(spot.width / image.width) * 100}%`,
              height: `${(spot.height / image.height) * 100}%`,
            }}
          >
            <Button
              variant="bare"
              silent={selected === null}
              aria-label={spot.label}
              onClick={() => {
                if (!selected) return
                onAttempt(selected, spot.id)
                setSelected(null)
              }}
            >
              <span className={styles.spotArea} />
            </Button>
          </div>
        ))}
      </div>

      {drag && dragged && (
        <div className={styles.ghost} style={{ left: drag.x, top: drag.y }} aria-hidden="true">
          <Text size="small" weight="bold">
            {dragged.label}
          </Text>
        </div>
      )}
    </div>
  )
}
