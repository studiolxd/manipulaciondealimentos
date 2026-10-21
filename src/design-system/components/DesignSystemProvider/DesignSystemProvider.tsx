import { useMemo, type ReactNode } from 'react'
import { DesignSystemContext, type DesignSystemStrings } from '../../hooks/useDesignSystem'

interface DesignSystemProviderProps {
  strings: DesignSystemStrings
  paused?: boolean
  children: ReactNode
}

export function DesignSystemProvider({ strings, paused = false, children }: DesignSystemProviderProps) {
  const value = useMemo(() => ({ strings, paused }), [strings, paused])
  return <DesignSystemContext value={value}>{children}</DesignSystemContext>
}
