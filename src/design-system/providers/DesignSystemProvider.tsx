import { useEffect, useMemo, type ReactNode } from 'react'
import { DesignSystemContext, type DesignSystemStrings } from '../hooks/useDesignSystem'
import { setSoundsEnabled } from '../sounds'
import { setVoiceEnabled } from '../voice'

interface DesignSystemProviderProps {
  strings: DesignSystemStrings
  paused?: boolean
  /** Interface sounds (clicks, right / wrong). On by default. */
  soundEffects?: boolean
  /** Voice-overs of speech bubbles and narration. On by default. */
  voiceOvers?: boolean
  children: ReactNode
}

export function DesignSystemProvider({
  strings,
  paused = false,
  soundEffects = true,
  voiceOvers = true,
  children,
}: DesignSystemProviderProps) {
  const value = useMemo(() => ({ strings, paused }), [strings, paused])

  useEffect(() => {
    setSoundsEnabled(soundEffects)
  }, [soundEffects])

  useEffect(() => {
    setVoiceEnabled(voiceOvers)
  }, [voiceOvers])

  return <DesignSystemContext value={value}>{children}</DesignSystemContext>
}
