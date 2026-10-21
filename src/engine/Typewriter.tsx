import { useEffect, useEffectEvent, useState } from 'react'
import { useGame } from './gameContext'
import { useReducedMotion } from './useMediaQuery'

const CHAR_DELAY_MS = 28
const SENTENCE_PAUSE_MS = 450

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
  const { paused } = useGame()
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
    <span className="typewriter">
      <span aria-hidden="true">
        {text.slice(0, visible)}
        {/* Reserves the space of the pending text so the box does not grow. */}
        <span className="typewriter__pending">{text.slice(visible)}</span>
      </span>
      <span className="visually-hidden">{text}</span>
    </span>
  )
}
