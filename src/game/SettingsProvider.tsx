import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { loadSettings, SettingsContext, STORAGE_KEY, type Settings } from './settings'

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState(loadSettings)

  const setSetting = useCallback(<K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings((current) => {
      const next = { ...current, [key]: value }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch {
        // Private mode or blocked storage: the setting lasts until the page closes.
      }
      return next
    })
  }, [])

  const value = useMemo(() => ({ settings, setSetting }), [settings, setSetting])
  return <SettingsContext value={value}>{children}</SettingsContext>
}
