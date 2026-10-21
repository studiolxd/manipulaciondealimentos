import { useEffect, useMemo, type ReactNode } from 'react'
import { DesignSystemContext, type DesignSystemStrings, type VoiceSync } from '../hooks/useDesignSystem'
import { setSoundsEnabled } from '../sounds'
import { setVoiceEnabled } from '../voice'

interface DesignSystemProviderProps {
  strings: DesignSystemStrings
  paused?: boolean
  /** Interface sounds (clicks, right / wrong). On by default. */
  soundEffects?: boolean
  /** Voice-overs of speech bubbles and narration. On by default. */
  voiceOvers?: boolean
  /** How text follows a voice-over (see Typewriter). Word by word by default. */
  voiceSync?: VoiceSync
  children: ReactNode
}

export function DesignSystemProvider({
  strings,
  paused = false,
  soundEffects = true,
  voiceOvers = true,
  voiceSync = 'words',
  children,
}: DesignSystemProviderProps) {
  const value = useMemo(() => ({ strings, paused, voiceSync }), [strings, paused, voiceSync])

  useEffect(() => {
    setSoundsEnabled(soundEffects)
  }, [soundEffects])

  useEffect(() => {
    setVoiceEnabled(voiceOvers)
  }, [voiceOvers])

  return <DesignSystemContext value={value}>{children}</DesignSystemContext>
}
