import { useEffect, useRef, useState, type CSSProperties, type MouseEvent, type PointerEvent } from 'react'
import type { ImageSource } from '../../../types'
import { Button } from '../../atoms/Button/Button'
import { Image } from '../../atoms/Image/Image'
import styles from './WoundCare.module.css'

interface Box {
  left: number
  top: number
  width: number
  height: number
}

type PieceId = 'cotton' | 'bottle' | 'dressing' | 'scissors' | 'glove'

export interface WoundCareLabels {
  /** Accessible names. With the keyboard, pressing a piece stands for its gesture. */
  hands: string
  wound: string
  cotton: string
  bottle: string
  dressing: string
  scissors: string
  glove: string
}

interface WoundCareProps {
  images: {
    hands: ImageSource
    cotton: ImageSource
    bottle: ImageSource
    dressing: ImageSource
    scissors: ImageSource
    glove: ImageSource
  }
  labels: WoundCareLabels
  /** A step was completed (0 to 2). */
  onStepDone: (index: number) => void
  /** The three steps are done. */
  onComplete: () => void
}

const STAGE_WIDTH = 1920
const TICK_MS = 100
// Distance rubbed over the wound to clean it, and to stick the dressing.
const RUB_PATH = 450
const STICK_PATH = 350

// Where everything is on the stage, in stage pixels; it will be adjusted to the final art.
const hands: Box = { left: 560, top: 520, width: 800, height: 460 }
const wound: Box = { left: 900, top: 700, width: 160, height: 120 }
// The glove, once on.
const gloved: Box = { left: 700, top: 600, width: 420, height: 320 }
const centre: Box = { left: 800, top: 230, width: 320, height: 210 }
const start: Record<PieceId, Box> = {
  cotton: { left: 240, top: 620, width: 160, height: 120 },
  bottle: { left: 240, top: 780, width: 140, height: 200 },
  dressing: { left: 1500, top: 600, width: 180, height: 120 },
  scissors: { left: 1500, top: 760, width: 200, height: 140 },
  glove: { left: 1500, top: 900, width: 160, height: 160 },
}
const atCentre = (id: PieceId): Box => ({
  ...centre,
  left: centre.left + (centre.width - start[id].width) / 2,
  top: centre.top + (centre.height - start[id].height) / 2,
  width: start[id].width,
  height: start[id].height,
})
const onWound = (id: PieceId): Box => ({
  ...wound,
  left: wound.left + (wound.width - start[id].width) / 2,
  top: wound.top + (wound.height - start[id].height) / 2,
  width: start[id].width,
  height: start[id].height,
})

// The stages of the procedure, in order. The player is not told them.
const COTTON_TO_CENTRE = 0
const BOTTLE_TO_COTTON = 1
const RUB_WOUND = 2
const DRESSING_TO_CENTRE = 3
const SCISSORS_TO_DRESSING = 4
const PLACE_DRESSING = 5
const STICK_DRESSING = 6
const GLOVE_TO_HAND = 7
const DONE = 8

interface Point {
  x: number
  y: number
}

const inBox = (p: Point, box: Box) =>
  p.x >= box.left && p.x <= box.left + box.width && p.y >= box.top && p.y <= box.top + box.height

// Image + Buttons + pointer gestures: a small wound on the hands that the
// player treats by discovery. Cotton pad to the centre, disinfectant onto it and
// rub the wound; dressing to the centre, cut it with the scissors, place it on
// the wound and stick it; put the glove on. Pressing where it does not go does
// nothing. Every piece is also a Button: with the keyboard, pressing it stands
// for its gesture.
export function WoundCare({ images, labels, onStepDone, onComplete }: WoundCareProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const callbacks = useRef({ onStepDone, onComplete })
  callbacks.current = { onStepDone, onComplete }
  const model = useRef({
    stage: COTTON_TO_CENTRE,
    down: false,
    origin: 'free' as PieceId | 'free',
    p: { x: 0, y: 0 } as Point,
    last: null as Point | null,
    path: 0,
  })
  const [view, setView] = useState<{ stage: number; drag: Point | null; origin: PieceId | 'free' }>({
    stage: COTTON_TO_CENTRE,
    drag: null,
    origin: 'free',
  })

  function stagePoint(event: { clientX: number; clientY: number }): Point {
    const rect = rootRef.current?.getBoundingClientRect()
    if (!rect) return { x: 0, y: 0 }
    const scale = rect.width / STAGE_WIDTH
    return { x: (event.clientX - rect.left) / scale, y: (event.clientY - rect.top) / scale }
  }

  function refresh() {
    const m = model.current
    const drag = m.down && m.origin !== 'free' ? { ...m.p } : null
    setView((v) =>
      v.stage === m.stage && v.origin === m.origin && v.drag?.x === drag?.x && v.drag?.y === drag?.y
        ? v
        : { stage: m.stage, drag, origin: m.origin },
    )
  }

  function go(stage: number) {
    const m = model.current
    m.stage = stage
    m.path = 0
    // Each of these completes a step of the procedure.
    if (stage === DRESSING_TO_CENTRE) callbacks.current.onStepDone(0)
    else if (stage === GLOVE_TO_HAND) callbacks.current.onStepDone(1)
    else if (stage === DONE) {
      callbacks.current.onStepDone(2)
      callbacks.current.onComplete()
    }
    refresh()
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const m = model.current
      const moved = m.down && m.last ? Math.hypot(m.p.x - m.last.x, m.p.y - m.last.y) : 0
      m.last = m.down ? { ...m.p } : null
      if (m.stage === RUB_WOUND && m.origin === 'cotton' && inBox(m.p, wound)) {
        m.path += moved
        if (m.path >= RUB_PATH) go(DRESSING_TO_CENTRE)
      } else if (m.stage === STICK_DRESSING && m.down && inBox(m.p, wound)) {
        m.path += moved
        if (m.path >= STICK_PATH) go(GLOVE_TO_HAND)
      }
      refresh()
    }, TICK_MS)
    return () => clearInterval(timer)
    // The engine reads everything through refs.
    // oxlint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    function release(event: globalThis.PointerEvent) {
      const m = model.current
      if (!m.down) return
      m.p = stagePoint(event)
      if (m.origin === 'bottle' && m.stage === BOTTLE_TO_COTTON && inBox(m.p, centre)) go(RUB_WOUND)
      else if (m.origin === 'scissors' && m.stage === SCISSORS_TO_DRESSING && inBox(m.p, centre)) go(PLACE_DRESSING)
      else if (m.origin === 'glove' && m.stage === GLOVE_TO_HAND && inBox(m.p, hands)) go(DONE)
      m.down = false
      m.origin = 'free'
      refresh()
    }
    window.addEventListener('pointerup', release)
    window.addEventListener('pointercancel', release)
    return () => {
      window.removeEventListener('pointerup', release)
      window.removeEventListener('pointercancel', release)
    }
    // oxlint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    const m = model.current
    m.p = stagePoint(event)
    m.last = { ...m.p }
    m.down = true
    m.origin = ((event.target as HTMLElement).closest('[data-piece]') as HTMLElement | null)?.dataset.piece as PieceId | 'free' ?? 'free'
    refresh()
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (model.current.down) model.current.p = stagePoint(event)
  }

  const keyboard = (event: MouseEvent) => event.detail === 0

  function pressCotton(event: MouseEvent) {
    const { stage } = model.current
    if (stage === COTTON_TO_CENTRE) go(BOTTLE_TO_COTTON)
    else if (stage === RUB_WOUND && keyboard(event)) go(DRESSING_TO_CENTRE)
  }

  function pressBottle(event: MouseEvent) {
    if (model.current.stage === BOTTLE_TO_COTTON && keyboard(event)) go(RUB_WOUND)
  }

  function pressDressing(event: MouseEvent) {
    const { stage } = model.current
    if (stage === DRESSING_TO_CENTRE) go(SCISSORS_TO_DRESSING)
    else if (stage === STICK_DRESSING && keyboard(event)) go(GLOVE_TO_HAND)
  }

  function pressScissors(event: MouseEvent) {
    if (model.current.stage === SCISSORS_TO_DRESSING && keyboard(event)) go(PLACE_DRESSING)
  }

  function pressWound(event: MouseEvent) {
    const { stage } = model.current
    if (stage === PLACE_DRESSING) go(STICK_DRESSING)
    else if (stage === RUB_WOUND && keyboard(event)) go(DRESSING_TO_CENTRE)
    else if (stage === STICK_DRESSING && keyboard(event)) go(GLOVE_TO_HAND)
  }

  function pressGlove(event: MouseEvent) {
    if (model.current.stage === GLOVE_TO_HAND && keyboard(event)) go(DONE)
  }

  const { stage, drag, origin } = view
  // The pieces a gesture can drag at each stage.
  const draggable: Record<PieceId, boolean> = {
    cotton: stage === RUB_WOUND,
    bottle: stage === BOTTLE_TO_COTTON,
    dressing: false,
    scissors: stage === SCISSORS_TO_DRESSING,
    glove: stage === GLOVE_TO_HAND,
  }

  function style(id: PieceId, box: Box): CSSProperties {
    const dragging = drag !== null && origin === id && draggable[id]
    return dragging
      ? { left: drag.x - box.width / 2, top: drag.y - box.height / 2, width: box.width, height: box.height }
      : { left: box.left, top: box.top, width: box.width, height: box.height }
  }

  function piece(id: PieceId, box: Box, source: ImageSource, label: string, onPress: (e: MouseEvent) => void, state?: string) {
    const dragging = drag !== null && origin === id && draggable[id]
    return (
      <div key={id} className={styles.piece} style={style(id, box)} data-piece={id} data-dragging={dragging || undefined} data-state={state}>
        <Button variant="bare" aria-label={label} onClick={onPress}>
          <Image source={source} alt="" fit="cover" />
        </Button>
      </div>
    )
  }

  return (
    <div ref={rootRef} className={styles.sim} onPointerDown={onPointerDown} onPointerMove={onPointerMove}>
      <div className={styles.hands} style={hands}>
        <Image source={images.hands} alt="" fit="cover" />
      </div>
      <div className={styles.hands} style={wound}>
        <Button variant="bare" aria-label={labels.wound} onClick={pressWound}>
          <span />
        </Button>
      </div>

      {stage <= RUB_WOUND &&
        piece(
          'cotton',
          stage === COTTON_TO_CENTRE ? start.cotton : atCentre('cotton'),
          images.cotton,
          labels.cotton,
          pressCotton,
          stage === RUB_WOUND ? 'wet' : undefined,
        )}
      {stage <= BOTTLE_TO_COTTON && piece('bottle', start.bottle, images.bottle, labels.bottle, pressBottle)}
      {piece(
        'dressing',
        stage <= DRESSING_TO_CENTRE
          ? start.dressing
          : stage < STICK_DRESSING
            ? atCentre('dressing')
            : onWound('dressing'),
        images.dressing,
        labels.dressing,
        pressDressing,
        stage >= PLACE_DRESSING ? 'cut' : undefined,
      )}
      {stage <= SCISSORS_TO_DRESSING && piece('scissors', start.scissors, images.scissors, labels.scissors, pressScissors)}
      {stage < DONE
        ? piece('glove', start.glove, images.glove, labels.glove, pressGlove)
        : piece('glove', gloved, images.glove, labels.glove, pressGlove, 'on')}
    </div>
  )
}
