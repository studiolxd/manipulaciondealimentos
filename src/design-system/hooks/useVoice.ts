import { useCallback, useEffect, useEffectEvent, useMemo, useRef, useState } from 'react'
import { isVoiceEnabled, playVoice, type VoiceClip, type VoicePlayback } from '../voice'
import { useDesignSystem } from './useDesignSystem'

export interface Voice {
  /** The line's clock: ms elapsed, following the audio. */
  elapsedMs: () => number
  /** Cuts the line short, e.g. when the player skips the text. */
  stop: () => void
}

/**
 * Plays a voice-over line while the component shows it, and stops it when the
 * line changes or the component goes away. It waits while the game is paused.
 * Returns its controls while it plays; undefined when nothing plays (no line,
 * voice-overs off or refused by the browser).
 */
export function useVoice(clips: readonly VoiceClip[] | undefined): Voice | undefined {
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
  const elapsedMs = useCallback(() => playback.current?.elapsedMs() ?? 0, [])
  const stop = useCallback(() => playback.current?.stop(), [])
  const voice = useMemo(() => ({ elapsedMs, stop }), [elapsedMs, stop])
  const playing = line !== '' && isVoiceEnabled() && refusedLine !== line
  return playing ? voice : undefined
}
