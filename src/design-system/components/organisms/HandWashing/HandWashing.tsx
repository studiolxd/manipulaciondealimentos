import { useEffect, useRef, useState, type MouseEvent, type PointerEvent } from 'react'
import type { ImageSource } from '../../../types'
import { Button } from '../../atoms/Button/Button'
import { Icon } from '../../atoms/Icon/Icon'
import { Image } from '../../atoms/Image/Image'
import { Surface } from '../../atoms/Surface/Surface'
import { Text } from '../../atoms/Text/Text'
import { Positioned } from '../../layout/Positioned/Positioned'
import styles from './HandWashing.module.css'

interface Box {
  left: number
  top: number
  width: number
  height: number
}

export interface HandWashingLabels {
  checklistTitle: string
  /** The six steps of the checklist, in order. */
  steps: string[]
  /** What to do now, one per step. */
  hints: string[]
  /** The seven parts of step 4, in order. */
  zones: { label: string; hint: string }[]
  /** Accessible names of the things to press. */
  hands: string
  tap: string
  soap: string
  droplet: string
  towel: string
  seconds: (done: number, total: number) => string
  zone: (current: number, total: number) => string
}

interface HandWashingProps {
  images: { hands: ImageSource; soap: ImageSource; towel: ImageSource }
  labels: HandWashingLabels
  /** Where things are on the background art, in stage pixels. */
  layout?: { hands: Box; tap: Box; soap: Box; towel: Box }
  /** A step was completed (0 to 5). */
  onStepDone: (index: number) => void
  /** The player tried a step that is not next. */
  onWrongOrder: () => void
  /** The six steps are done. */
  onComplete: () => void
}

const STAGE_WIDTH = 1920
const TICK_MS = 100
const WET_MS = 1500
const RINSE_MS = 2000
const RUB_MS = 20000
// Movement per tick below which the hands are not being rubbed.
const RUB_MIN_MOVE = 10
const ZONE_PATH = 450
const DRY_PATH = 900
// A key press stands for this much of each gesture (WCAG 2.5.7: no gesture is the only way).
const KEY_RUB_MS = 1000
const KEY_PATH = 120
const WRONG_COOLDOWN_MS = 3000
const STEPS = 6

const defaultLayout = {
  hands: { left: 340, top: 560, width: 740, height: 440 },
  tap: { left: 560, top: 220, width: 300, height: 200 },
  soap: { left: 1120, top: 330, width: 140, height: 220 },
  towel: { left: 160, top: 340, width: 160, height: 200 },
}

interface Point {
  x: number
  y: number
}

interface View {
  step: number
  /** 0 to 1, of the current gesture. */
  progress: number
  rubMs: number
  zone: number
  soapOut: boolean
  towel: boolean
  drag: Point | null
}

const inBox = (p: Point, box: Box) =>
  p.x >= box.left && p.x <= box.left + box.width && p.y >= box.top && p.y <= box.top + box.height

// Image + Buttons + pointer gestures: the hand-washing procedure as a motor
// simulation. The six steps of the checklist must be done in order, each with
// its gesture: drag the hands to the tap and hold, click the soap and drag it
// to the hands, rub for 20 seconds, wash each part of the hands, rinse, and dry
// with a paper towel. Every object is also a Button: with the keyboard,
// pressing it stands for the gesture.
export function HandWashing({ images, labels, layout = defaultLayout, onStepDone, onWrongOrder, onComplete }: HandWashingProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const callbacks = useRef({ onStepDone, onWrongOrder, onComplete })
  callbacks.current = { onStepDone, onWrongOrder, onComplete }
  const layoutRef = useRef(layout)
  layoutRef.current = layout

  // The engine lives in a ref; the view is a copy of what the screen shows.
  const model = useRef({
    step: 0,
    down: false,
    origin: 'other' as 'hands' | 'droplet' | 'other',
    p: { x: 0, y: 0 } as Point,
    last: null as Point | null,
    hold: 0,
    rub: 0,
    zone: 0,
    path: 0,
    dry: 0,
    earlyRub: 0,
    tapWrong: 0,
    soapOut: false,
    towel: false,
    lastWrong: 0,
  })
  const [view, setView] = useState<View>({ step: 0, progress: 0, rubMs: 0, zone: 0, soapOut: false, towel: false, drag: null })

  function stagePoint(event: { clientX: number; clientY: number }): Point {
    const rect = rootRef.current?.getBoundingClientRect()
    if (!rect) return { x: 0, y: 0 }
    const scale = rect.width / STAGE_WIDTH
    return { x: (event.clientX - rect.left) / scale, y: (event.clientY - rect.top) / scale }
  }

  function wrong() {
    const m = model.current
    const now = Date.now()
    if (now - m.lastWrong < WRONG_COOLDOWN_MS) return
    m.lastWrong = now
    callbacks.current.onWrongOrder()
  }

  function advance() {
    const m = model.current
    const done = m.step
    m.step += 1
    m.hold = 0
    m.rub = 0
    m.zone = 0
    m.path = 0
    m.dry = 0
    m.earlyRub = 0
    callbacks.current.onStepDone(done)
    if (m.step === STEPS) callbacks.current.onComplete()
  }

  function refresh() {
    const m = model.current
    const progress =
      m.step === 0
        ? m.hold / WET_MS
        : m.step === 4
          ? m.hold / RINSE_MS
          : m.step === 2
            ? m.rub / RUB_MS
            : m.step === 3
              ? m.path / ZONE_PATH
              : m.step === 5
                ? m.dry / DRY_PATH
                : 0
    const drag = m.down && m.origin === 'droplet' ? m.p : null
    setView((v) => {
      const next: View = {
        step: m.step,
        progress: Math.min(progress, 1),
        rubMs: m.rub,
        zone: m.zone,
        soapOut: m.soapOut,
        towel: m.towel,
        drag,
      }
      return v.step === next.step &&
        v.progress === next.progress &&
        v.rubMs === next.rubMs &&
        v.zone === next.zone &&
        v.soapOut === next.soapOut &&
        v.towel === next.towel &&
        v.drag === next.drag
        ? v
        : next
    })
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const m = model.current
      const { hands, tap } = layoutRef.current
      if (m.step >= STEPS) return
      const moved = m.down && m.last ? Math.hypot(m.p.x - m.last.x, m.p.y - m.last.y) : 0
      const movedY = m.down && m.last ? Math.abs(m.p.y - m.last.y) : 0
      m.last = m.down ? { ...m.p } : null
      const dragHands = m.down && m.origin === 'hands'
      const onHands = dragHands && inBox(m.p, hands)

      if (m.step === 0 || m.step === 4) {
        // Drag from the hands to the tap and hold until the water covers them.
        m.hold = dragHands && inBox(m.p, tap) ? m.hold + TICK_MS : 0
        if (m.hold >= (m.step === 0 ? WET_MS : RINSE_MS)) advance()
      } else if (m.step === 2) {
        if (onHands && moved >= RUB_MIN_MOVE) m.rub += TICK_MS
        if (m.rub >= RUB_MS) advance()
      } else if (m.step === 3) {
        if (onHands) m.path += moved
        if (m.path >= ZONE_PATH) {
          m.path = 0
          m.zone += 1
          if (m.zone >= labels.zones.length) advance()
        }
      } else if (m.step === 5) {
        if (m.towel && onHands) m.dry += movedY
        if (m.dry >= DRY_PATH) advance()
      }

      // Doing something that is not next.
      if (m.step < STEPS && dragHands) {
        m.tapWrong = inBox(m.p, tap) && m.step !== 0 && m.step !== 4 ? m.tapWrong + TICK_MS : 0
        if (m.tapWrong >= 400) {
          m.tapWrong = 0
          wrong()
        }
        if (m.step <= 1 && inBox(m.p, hands)) {
          m.earlyRub += moved
          if (m.earlyRub >= 300) {
            m.earlyRub = 0
            wrong()
          }
        }
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
      if (m.origin === 'droplet' && m.step === 1 && inBox(m.p, layoutRef.current.hands)) advance()
      m.down = false
      m.origin = 'other'
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
    m.origin = (event.target as HTMLElement).closest('[data-droplet]')
      ? 'droplet'
      : inBox(m.p, layoutRef.current.hands)
        ? 'hands'
        : 'other'
    refresh()
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (model.current.down) model.current.p = stagePoint(event)
  }

  const keyboard = (event: MouseEvent) => event.detail === 0

  function pressTap(event: MouseEvent) {
    const m = model.current
    if (m.step >= STEPS) return
    if (m.step === 0 || m.step === 4) {
      if (keyboard(event)) advance()
    } else wrong()
    refresh()
  }

  function pressSoap() {
    const m = model.current
    if (m.step >= STEPS) return
    if (m.step === 1) m.soapOut = true
    else if (m.step < 1) wrong()
    refresh()
  }

  function pressDroplet(event: MouseEvent) {
    // Dragging it to the hands is the gesture; with the keyboard, pressing it is.
    if (model.current.step === 1 && keyboard(event)) {
      advance()
      refresh()
    }
  }

  function pressTowel() {
    const m = model.current
    if (m.step >= STEPS) return
    if (m.step === 5) m.towel = true
    else if (m.step < 5) wrong()
    refresh()
  }

  function pressHands(event: MouseEvent) {
    const m = model.current
    if (!keyboard(event) || m.step >= STEPS) return
    if (m.step === 2) {
      m.rub += KEY_RUB_MS
      if (m.rub >= RUB_MS) advance()
    } else if (m.step === 3) {
      m.path += KEY_PATH
      if (m.path >= ZONE_PATH) {
        m.path = 0
        m.zone += 1
        if (m.zone >= labels.zones.length) advance()
      }
    } else if (m.step === 5 && m.towel) {
      m.dry += KEY_PATH
      if (m.dry >= DRY_PATH) advance()
    } else if (m.step < 2) wrong()
    refresh()
  }

  const { step, progress, rubMs, zone, soapOut, towel, drag } = view
  const done = step >= STEPS
  const water = (step === 0 || step === 4) && progress > 0
  const percent = (value: number) => `${Math.round(Math.min(value, 1) * 100)}%`
  const zoneLabel = labels.zones[Math.min(zone, labels.zones.length - 1)]

  return (
    <div ref={rootRef} className={styles.sim} onPointerDown={onPointerDown} onPointerMove={onPointerMove}>
      <Positioned {...layout.hands}>
        <div className={styles.hands} data-wet={water || undefined}>
          <Button variant="bare" aria-label={labels.hands} onClick={pressHands}>
            <Image source={images.hands} alt="" fit="cover" />
          </Button>
          {water && <span className={styles.water} style={{ height: percent(progress) }} />}
        </div>
      </Positioned>

      <Positioned {...layout.tap}>
        <Button variant="bare" aria-label={labels.tap} onClick={pressTap}>
          <span className={styles.zone} data-target={step === 0 || step === 4 || undefined} />
        </Button>
      </Positioned>

      <Positioned {...layout.soap}>
        <Button variant="bare" aria-label={labels.soap} onClick={pressSoap}>
          <span className={styles.object} data-target={step === 1 && !soapOut ? true : undefined}>
            <Image source={images.soap} alt="" fit="cover" />
          </span>
        </Button>
      </Positioned>

      {soapOut && step === 1 && (
        <div
          className={styles.droplet}
          data-dragging={drag ? true : undefined}
          style={
            drag
              ? { left: drag.x, top: drag.y }
              : { left: layout.soap.left + layout.soap.width / 2, top: layout.soap.top + layout.soap.height + 40 }
          }
        >
          <Button variant="bare" aria-label={labels.droplet} data-droplet="" onClick={pressDroplet}>
            <span className={styles.dropletShape} />
          </Button>
        </div>
      )}

      <Positioned {...layout.towel}>
        <Button variant="bare" aria-label={labels.towel} onClick={pressTowel}>
          <span className={styles.object} data-target={step === 5 && !towel ? true : undefined}>
            <Image source={images.towel} alt="" fit="cover" />
          </span>
        </Button>
      </Positioned>

      {!done && (
        <Positioned top={96} left={layout.hands.left} width={layout.hands.width}>
          <Surface tone="opaque" padding="md" className={styles.hint}>
            <output className={styles.status}>
              <Text size="body-sm" weight="bold">
                {step === 3 ? `${zoneLabel.label}. ${zoneLabel.hint}` : labels.hints[step]}
              </Text>
              {step === 2 && <Text size="small">{labels.seconds(Math.floor(rubMs / 1000), RUB_MS / 1000)}</Text>}
              {step === 3 && <Text size="small">{labels.zone(Math.min(zone + 1, labels.zones.length), labels.zones.length)}</Text>}
            </output>
            {(step === 0 || step === 2 || step === 3 || step === 4 || (step === 5 && towel)) && (
              <div className={styles.meter} aria-hidden="true">
                <span style={{ width: percent(progress) }} />
              </div>
            )}
          </Surface>
        </Positioned>
      )}

      <Positioned top={140} right={64} width={520}>
        <Surface tone="opaque" padding="md" className={styles.checklist}>
          <Text weight="bold">{labels.checklistTitle}</Text>
          <ol className={styles.steps}>
            {labels.steps.map((label, index) => {
              const state = index < step ? 'done' : index === step ? 'current' : 'todo'
              return (
                <li key={label} className={styles.step} data-state={state}>
                  <span className={styles.marker}>{state === 'done' ? <Icon name="correct" size="sm" /> : index + 1}</span>
                  <div>
                    <Text size="body-sm">{label}</Text>
                    {index === 3 && state !== 'todo' && (
                      <ul className={styles.zones}>
                        {labels.zones.map((item, i) => (
                          <li key={item.label} data-done={state === 'done' || i < zone || undefined}>
                            <Text as="span" size="small">
                              {state === 'done' || i < zone ? '✓ ' : ''}
                              {item.label}
                            </Text>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              )
            })}
          </ol>
        </Surface>
      </Positioned>
    </div>
  )
}
