import { useCallback, useEffect, useEffectEvent, useRef, useState } from 'react'
import { isVoiceEnabled, playVoice, type VoiceClip, type VoicePlayback } from '../voice'
import { useDesignSystem } from './useDesignSystem'

/**
 * Plays a voice-over line while the component shows it, and stops it when the
 * line changes or the component goes away. It waits while the game is paused.
 * Returns the line's clock (ms elapsed, following the audio); undefined when
 * nothing plays (no line, voice-overs off or refused by the browser).
 */
export function useVoice(clips: readonly VoiceClip[] | undefined): (() => number) | undefined {
  const { paused } = useDesignSystem()
  const playback = useRef<VoicePlayback | null>(null)
  const line = clips?.map((clip) => clip.url).join('|') ?? ''
  const [refusedLine, setRefusedLine] = useState<string | null>(null)

  const start = useEffectEvent(() => (clips ? playVoice(clips, () => setRefusedLine(line)) : null))

  useEffect(() => {
    if (!line) return
    const started = start()
    playback.current = started
    return () => {
      started?.stop()
      playback.current = null
    }
  }, [line])

  useEffect(() => {
    if (paused) playback.current?.pause()
    else playback.current?.resume()
  }, [paused])

  // Read when the typewriter schedules its next character, never while rendering.
  const clock = useCallback(() => playback.current?.elapsedMs() ?? 0, [])
  const playing = line !== '' && isVoiceEnabled() && refusedLine !== line
  return playing ? clock : undefined
}
