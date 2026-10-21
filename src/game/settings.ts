import { createContext, useContext } from 'react'

// Player settings, remembered in this browser (also outside an LMS, and
// without using the SCORM progress space).

export interface Settings {
  /** Voice-overs. There are none yet: the setting is kept for when there are. */
  voice: boolean
  /** Interface sounds: clicks and right / wrong. */
  effects: boolean
}

export const STORAGE_KEY = 'manipulacion-de-alimentos.settings'
const defaults: Settings = { voice: true, effects: true }

export function loadSettings(): Settings {
  try {
    return { ...defaults, ...JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') }
  } catch {
    return defaults
  }
}

interface SettingsContextValue {
  settings: Settings
  setSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void
}

export const SettingsContext = createContext<SettingsContextValue | null>(null)

export function useSettings(): SettingsContextValue {
  const value = useContext(SettingsContext)
  if (!value) throw new Error('useSettings must be used inside <SettingsProvider>')
  return value
}
