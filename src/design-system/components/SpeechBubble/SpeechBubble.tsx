import { useEffect, useEffectEvent, useState } from 'react'
import { useDesignSystem } from '../../hooks/useDesignSystem'
import type { ImageSource } from '../../types'
import { IconButton } from '../IconButton/IconButton'
import { Typewriter } from '../Typewriter/Typewriter'
import styles from './SpeechBubble.module.css'

interface SpeechBubbleProps {
  speaker: string
  /** Each block is typed out and the player advances to the next with a click. */
  blocks: string[]
  portrait?: ImageSource
  /** Side the tail points to, towards the speaker. */
  tail?: 'left' | 'none'
  /** Name used to morph the bubble into another element (see withViewTransition). */
  viewTransitionName?: string
  /** Called once the last block is fully shown. */
  onFinished?: () => void
  /** When given, the bubble keeps its button on the last block and a final click calls this. */
  onDismiss?: () => void
}

export function SpeechBubble({
  speaker,
  blocks,
  portrait,
  tail = 'none',
  viewTransitionName,
  onFinished,
  onDismiss,
}: SpeechBubbleProps) {
  const { strings } = useDesignSystem()
  const [index, setIndex] = useState(0)
  const [skipRequested, setSkipRequested] = useState(false)
  const [typed, setTyped] = useState(false)
  // A skipped block counts as fully shown right away, so quick presses are not lost.
  const shown = typed || skipRequested
  const isLast = index === blocks.length - 1
  const finished = shown && isLast

  function advance() {
    if (!shown) {
      setSkipRequested(true)
    } else if (!isLast) {
      setIndex(index + 1)
      setSkipRequested(false)
      setTyped(false)
    } else {
      onDismiss?.()
    }
  }

  const notifyFinished = useEffectEvent(() => onFinished?.())
  useEffect(() => {
    if (finished) notifyFinished()
  }, [finished])

  return (
    // Clicking anywhere on the bubble is a shortcut; the button inside is the accessible control.
    // oxlint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div className={styles.bubble} data-tail={tail} style={{ viewTransitionName }} onClick={advance}>
      {portrait && <img className={styles.portrait} src={portrait.src} alt="" />}
      <div className={styles.body}>
        <p className={styles.speaker}>{strings.speakerSays(speaker)}</p>
        {/* Announces each new block as the player advances. */}
        <p className={styles.text} aria-live="polite">
          <Typewriter key={index} text={blocks[index]} complete={skipRequested} onDone={() => setTyped(true)} />
        </p>
      </div>
      {(!finished || onDismiss) && (
        <div className={styles.next}>
          <IconButton
            icon="next"
            label={shown ? strings.continue : strings.showFullText}
            onClick={(event) => {
              event.stopPropagation()
              advance()
            }}
          />
        </div>
      )}
    </div>
  )
}
