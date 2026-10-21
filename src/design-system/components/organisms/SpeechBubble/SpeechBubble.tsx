import { useDialogue } from '@studiolxd/tramoya'
import { useDesignSystem } from '../../../hooks/useDesignSystem'
import { useVoice } from '../../../hooks/useVoice'
import { Surface } from '../../atoms/Surface/Surface'
import { IconButton } from '../../molecules/IconButton/IconButton'
import { Typewriter } from '../../molecules/Typewriter/Typewriter'
import { VisuallyHidden } from '../../utilities/VisuallyHidden/VisuallyHidden'
import styles from './SpeechBubble.module.css'

interface SpeechBubbleProps {
  speaker: string
  /** Each block is typed out and the player advances to the next with a click. */
  blocks: string[]
  /** Voice-over of each block: the URLs of its clips, played in order. Blocks without one are silent. */
  voice?: (readonly string[] | undefined)[]
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

// Surface with tail + Typewriter + IconButton (hidden until it has the focus).
// Each block can have a voice-over.
export function SpeechBubble({
  speaker,
  blocks,
  voice,
  tail = 'left',
  viewTransitionName,
  onFinished,
  onDismiss,
}: SpeechBubbleProps) {
  const { strings } = useDesignSystem()
  const { index, shown, skipRequested, finished, advance, markTyped } = useDialogue(blocks.length, { onFinished, onDismiss })
  // Each block speaks as it appears; advancing stops it and starts the next one.
  useVoice(voice?.[index])

  return (
    // Pointer users click the bubble; the hidden button inside is the keyboard and screen reader control.
    <Surface tone="opaque" padding="lg" tail={tail} viewTransitionName={viewTransitionName} className={styles.bubble} onClick={advance}>
      <VisuallyHidden as="p">{strings.speakerSays(speaker)}</VisuallyHidden>
      {/* Announces each new block as the player advances. */}
      <div aria-live="polite">
        <Typewriter key={index} text={blocks[index]} complete={skipRequested} onDone={markTyped} />
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
