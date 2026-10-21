import { useEffect, useEffectEvent, useState } from 'react'
import { tokens } from '../../generated/tokens'
import { useDesignSystem } from '../../hooks/useDesignSystem'
import { useReducedMotion } from '../../hooks/useMediaQuery'
import styles from './Typewriter.module.css'

const CHAR_DELAY_MS = tokens['motion.duration.typewriter-char']
const SENTENCE_PAUSE_MS = tokens['motion.duration.typewriter-pause']

interface TypewriterProps {
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

// Types the text character by character, pausing between sentences. The
// animation is hidden from screen readers, which get the full text at once.
export function Typewriter({ text, complete = false, onDone }: TypewriterProps) {
  const { paused } = useDesignSystem()
  const reducedMotion = useReducedMotion()
  const [shown, setShown] = useState(0)
  const done = complete || reducedMotion || shown >= text.length
  const visible = done ? text.length : shown

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
    <span className={styles.typewriter}>
      <span aria-hidden="true">
        {text.slice(0, visible)}
        {/* Reserves the space of the pending text so the box does not grow. */}
        <span className={styles.pending}>{text.slice(visible)}</span>
      </span>
      <span className={styles.accessible}>{text}</span>
    </span>
  )
}
