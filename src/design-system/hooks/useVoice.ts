import { useEffect, useRef, useState } from 'react'
import { playVoice, type VoicePlayback } from '../voice'
import { useDesignSystem } from './useDesignSystem'

/**
 * Plays a voice-over line while the component shows it, and stops it when the
 * line changes or the component goes away. It waits while the game is paused.
 * Returns the line's length in ms once it is known (undefined while it is not,
 * or when nothing is playing).
 */
export function useVoice(urls: readonly string[] | undefined): number | undefined {
  const { paused } = useDesignSystem()
  const playback = useRef<VoicePlayback | null>(null)
  const line = urls?.join('|') ?? ''
  const [duration, setDuration] = useState<{ line: string; ms: number | null } | null>(null)

  useEffect(() => {
    if (!line) return
    playback.current = playVoice(line.split('|'), (ms) => setDuration({ line, ms }))
    return () => {
      playback.current?.stop()
      playback.current = null
    }
  }, [line])

  useEffect(() => {
    if (paused) playback.current?.pause()
    else playback.current?.resume()
  }, [paused])

  return duration?.line === line && duration.ms !== null ? duration.ms : undefined
}
