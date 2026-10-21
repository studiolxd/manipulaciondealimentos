import { useEffect, useEffectEvent, useState } from 'react'
import { useDesignSystem } from '../../../hooks/useDesignSystem'
import { Surface } from '../../atoms/Surface/Surface'
import { IconButton } from '../../molecules/IconButton/IconButton'
import { Typewriter } from '../../molecules/Typewriter/Typewriter'
import { VisuallyHidden } from '../../utilities/VisuallyHidden/VisuallyHidden'
import styles from './SpeechBubble.module.css'

interface SpeechBubbleProps {
  speaker: string
  /** Each block is typed out and the player advances to the next with a click. */
  blocks: string[]
  /**
   * Side of the tail, pointing to the speaker. Every bubble has one: it tells
   * speech apart from plain text panels.
   */
  tail?: 'left' | 'right' | 'bottom'
  /** Name used to morph the bubble into another element (see withViewTransition). */
  viewTransitionName?: string
  /** Called once the last block is fully shown. */
  onFinished?: () => void
  /** When given, the bubble keeps its button on the last block and a final click calls this. */
  onDismiss?: () => void
}

// Surface with tail + Typewriter + IconButton.
export function SpeechBubble({ speaker, blocks, tail = 'left', viewTransitionName, onFinished, onDismiss }: SpeechBubbleProps) {
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
    <Surface tone="opaque" padding="lg" tail={tail} viewTransitionName={viewTransitionName} className={styles.bubble} onClick={advance}>
      <VisuallyHidden as="p">{strings.speakerSays(speaker)}</VisuallyHidden>
      {/* Announces each new block as the player advances. */}
      <div aria-live="polite">
        <Typewriter key={index} text={blocks[index]} complete={skipRequested} onDone={() => setTyped(true)} />
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
    </Surface>
  )
}
