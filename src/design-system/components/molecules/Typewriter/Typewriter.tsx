import { useReducedMotion, useTypewriter } from '@studiolxd/tramoya'
import { useEffect, useMemo, type ComponentProps } from 'react'
import { tokens } from '../../../generated/tokens'
import { useDesignSystem } from '../../../hooks/useDesignSystem'
import { useVoice } from '../../../hooks/useVoice'
import { lineDurationMs, voiceCharTimes, type VoiceClip } from '../../../voice'
import { Text } from '../../atoms/Text/Text'
import { VisuallyHidden } from '../../utilities/VisuallyHidden/VisuallyHidden'
import styles from './Typewriter.module.css'

const CHAR_DELAY_MS = tokens['motion.duration.typewriter-char']
const SENTENCE_PAUSE_MS = tokens['motion.duration.typewriter-pause']
// Text done this long before the voice is: the player skipped it.
const SKIP_MARGIN_MS = 250

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
// between sentences. With a voice-over each word is typed as it is said, and
// skipping the text also stops the voice. Enter or Space shows it all at once, like a
// click on its container (the voice goes on). The animation is hidden from
// screen readers, which get the full text at once.
export function Typewriter({ text, complete = false, voice, onDone, size, weight, tone }: TypewriterProps) {
  const { paused, voiceSync } = useDesignSystem()
  // In step with the voice, measured against where the audio actually is.
  const playing = useVoice(voice)
  const pace = useMemo(
    () =>
      playing && voice
        ? {
            elapsedMs: playing.elapsedMs,
            durationMs: lineDurationMs(voice),
            // Without word times the text follows the voice at an even pace.
            charTimesMs: voiceSync === 'words' ? voiceCharTimes(text, voice) : undefined,
          }
        : undefined,
    [playing, voice, text, voiceSync],
  )
  const { ref, visible, done } = useTypewriter<HTMLSpanElement>({
    text,
    complete,
    paused,
    charDelayMs: CHAR_DELAY_MS,
    sentencePauseMs: SENTENCE_PAUSE_MS,
    pace,
    onDone,
  })

  // Skipping the text (a click, Enter or Space) also cuts the voice short. With
  // reduced motion the text is whole from the start and the voice plays on.
  const reducedMotion = useReducedMotion()
  useEffect(() => {
    if (!done || !pace || reducedMotion) return
    const voiceEndsMs = pace.charTimesMs?.at(-1) ?? pace.durationMs
    if (pace.elapsedMs() < voiceEndsMs - SKIP_MARGIN_MS) playing?.stop()
  }, [done, pace, playing, reducedMotion])

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
