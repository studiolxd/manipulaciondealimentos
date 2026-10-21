import { useEffect, useMemo, type ReactNode } from 'react'
import { DesignSystemContext, type DesignSystemStrings } from '../hooks/useDesignSystem'
import { setSoundsEnabled } from '../sounds'

interface DesignSystemProviderProps {
  strings: DesignSystemStrings
  paused?: boolean
  /** Interface sounds (clicks, right / wrong). On by default. */
  soundEffects?: boolean
  children: ReactNode
}

export function DesignSystemProvider({ strings, paused = false, soundEffects = true, children }: DesignSystemProviderProps) {
  const value = useMemo(() => ({ strings, paused }), [strings, paused])

  useEffect(() => {
    setSoundsEnabled(soundEffects)
  }, [soundEffects])

  return <DesignSystemContext value={value}>{children}</DesignSystemContext>
}
