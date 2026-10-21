import { useTypewriter } from '@studiolxd/tramoya'
import type { ComponentProps } from 'react'
import { tokens } from '../../../generated/tokens'
import { useDesignSystem } from '../../../hooks/useDesignSystem'
import { useVoice } from '../../../hooks/useVoice'
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
  /**
   * Voice-over of the text: the URLs of its clips, played in order. While it
   * plays, the text is typed at an even pace that lasts as long as the voice.
   */
  voice?: readonly string[]
  onDone?: () => void
}

// Text + VisuallyHidden: types the text character by character, pausing
// between sentences. With a voice-over it is typed in step with the voice,
// ending when the voice ends. Enter or Space shows it all at once, like a
// click on its container (the voice goes on). The animation is hidden from
// screen readers, which get the full text at once.
export function Typewriter({ text, complete = false, voice, onDone, size, weight, tone }: TypewriterProps) {
  const { paused } = useDesignSystem()
  // In step with the voice, measured against where the audio actually is.
  const pace = useVoice(voice)
  const { ref, visible } = useTypewriter<HTMLSpanElement>({
    text,
    complete,
    paused,
    charDelayMs: CHAR_DELAY_MS,
    sentencePauseMs: SENTENCE_PAUSE_MS,
    pace,
    onDone,
  })

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
