import type { TypewriterPace } from '@studiolxd/tramoya'
import { useEffect, useRef, useState } from 'react'
import { playVoice, type VoicePlayback } from '../voice'
import { useDesignSystem } from './useDesignSystem'

/**
 * Plays a voice-over line while the component shows it, and stops it when the
 * line changes or the component goes away. It waits while the game is paused.
 * Returns its pace (length and position, following the audio) once the length
 * is known; undefined while it is not, or when nothing is playing.
 */
export function useVoice(urls: readonly string[] | undefined): TypewriterPace | undefined {
  const { paused } = useDesignSystem()
  const playback = useRef<VoicePlayback | null>(null)
  const line = urls?.join('|') ?? ''
  const [pace, setPace] = useState<{ line: string; pace: TypewriterPace | null } | null>(null)

  useEffect(() => {
    if (!line) return
    let started: VoicePlayback | null = null
    started = playVoice(line.split('|'), (ms) =>
      setPace({ line, pace: ms === null ? null : { durationMs: ms, elapsedMs: () => started?.elapsedMs() ?? 0 } }),
    )
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

  return pace?.line === line ? (pace.pace ?? undefined) : undefined
}
