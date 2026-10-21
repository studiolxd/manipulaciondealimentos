import { useTypewriter } from '@studiolxd/tramoya'
import { useMemo, type ComponentProps } from 'react'
import { tokens } from '../../../generated/tokens'
import { useDesignSystem } from '../../../hooks/useDesignSystem'
import { useVoice } from '../../../hooks/useVoice'
import { lineDurationMs, voiceCharTimes, type VoiceClip } from '../../../voice'
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
   * Voice-over of the text: its clips, played in order. While it plays, each
   * word is typed as it is said (or, without word timings, at an even pace
   * that lasts as long as the voice).
   */
  voice?: readonly VoiceClip[]
  onDone?: () => void
}

// Text + VisuallyHidden: types the text character by character, pausing
// between sentences. With a voice-over each word is typed as it is said. Enter or Space shows it all at once, like a
// click on its container (the voice goes on). The animation is hidden from
// screen readers, which get the full text at once.
export function Typewriter({ text, complete = false, voice, onDone, size, weight, tone }: TypewriterProps) {
  const { paused, voiceSync } = useDesignSystem()
  // In step with the voice, measured against where the audio actually is.
  const clock = useVoice(voice)
  const pace = useMemo(
    () =>
      clock && voice
        ? {
            elapsedMs: clock,
            durationMs: lineDurationMs(voice),
            // Without word times the text follows the voice at an even pace.
            charTimesMs: voiceSync === 'words' ? voiceCharTimes(text, voice) : undefined,
          }
        : undefined,
    [clock, voice, text, voiceSync],
  )
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
