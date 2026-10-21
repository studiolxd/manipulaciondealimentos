import { useEffect, useRef } from 'react'
import { playVoice, type VoicePlayback } from '../voice'
import { useDesignSystem } from './useDesignSystem'

/**
 * Plays a voice-over line while the component shows it, and stops it when the
 * line changes or the component goes away. It waits while the game is paused.
 */
export function useVoice(urls: readonly string[] | undefined): void {
  const { paused } = useDesignSystem()
  const playback = useRef<VoicePlayback | null>(null)
  const line = urls?.join('|') ?? ''

  useEffect(() => {
    if (!line) return
    playback.current = playVoice(line.split('|'))
    return () => {
      playback.current?.stop()
      playback.current = null
    }
  }, [line])

  useEffect(() => {
    if (paused) playback.current?.pause()
    else playback.current?.resume()
  }, [paused])
}
