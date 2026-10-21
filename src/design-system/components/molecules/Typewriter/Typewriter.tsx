import { useEffect, useEffectEvent, useRef, useState, type ComponentProps } from 'react'
import { tokens } from '../../../generated/tokens'
import { useDesignSystem } from '../../../hooks/useDesignSystem'
import { useReducedMotion } from '../../../hooks/useMediaQuery'
import { Text } from '../../atoms/Text/Text'
import { VisuallyHidden } from '../../utilities/VisuallyHidden/VisuallyHidden'
import styles from './Typewriter.module.css'

const CHAR_DELAY_MS = tokens['motion.duration.typewriter-char']
const SENTENCE_PAUSE_MS = tokens['motion.duration.typewriter-pause']

type TextStyle = Pick<ComponentProps<typeof Text>, 'size' | 'weight' | 'tone'>

interface TypewriterProps extends TextStyle {
  text: string
  /** Shows the whole text at once (e.g. the player asked to skip). */
  complete?: boolean
  onDone?: () => void
}

function delayBefore(text: string, index: number): number {
  const previous = text[index - 1]
  const endsSentence = previous !== undefined && /[.!?:…]/.test(previous) && /\s/.test(text[index] ?? '')
  return endsSentence ? SENTENCE_PAUSE_MS : CHAR_DELAY_MS
}

// Controls that already react to Enter / Space: the key is left to them.
const KEY_OWNERS = 'button, a[href], input, select, textarea, [contenteditable="true"], [role="button"], [role="application"], dialog'

// Text + VisuallyHidden: types the text character by character, pausing
// between sentences. Enter or Space shows it all at once, like a click on its
// container. The animation is hidden from screen readers, which get the full
// text at once.
export function Typewriter({ text, complete = false, onDone, size, weight, tone }: TypewriterProps) {
  const { paused } = useDesignSystem()
  const reducedMotion = useReducedMotion()
  const [shown, setShown] = useState(0)
  const [skipped, setSkipped] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)
  const done = complete || skipped || reducedMotion || shown >= text.length
  const visible = done ? text.length : shown

  const handleKey = useEffectEvent((event: KeyboardEvent) => {
    if (event.key !== 'Enter' && event.key !== ' ') return
    if (event.defaultPrevented || event.repeat || event.altKey || event.ctrlKey || event.metaKey) return
    const target = event.target instanceof Element ? event.target : null
    if (target?.closest(KEY_OWNERS)) return
    // Not while hidden behind something (e.g. the rotate screen).
    if (ref.current?.closest('[inert]')) return
    event.preventDefault()
    setSkipped(true)
  })
  useEffect(() => {
    if (done) return
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [done])

  useEffect(() => {
    if (done || paused) return
    const timer = setTimeout(() => setShown((count) => count + 1), delayBefore(text, shown))
    return () => clearTimeout(timer)
  }, [done, paused, shown, text])

  const notifyDone = useEffectEvent(() => onDone?.())
  useEffect(() => {
    if (done) notifyDone()
  }, [done])

  return (
    <Text size={size} weight={weight} tone={tone}>
      <span ref={ref} aria-hidden="true">
        {text.slice(0, visible)}
        {/* Reserves the space of the pending text so the box does not grow. */}
        <span className={styles.pending}>{text.slice(visible)}</span>
      </span>
      <VisuallyHidden>{text}</VisuallyHidden>
    </Text>
  )
}
