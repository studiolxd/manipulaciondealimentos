import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { resolveText, type Gender, type GenderedText } from '../content/gendered'
import type { SceneId } from '../scenes/sceneIds'
import { GameContext, type GameContextValue } from './gameContext'
import { usePortrait } from './useMediaQuery'

// Duration of each half of a scene change (fade out, then fade in).
export const FADE_MS = 600

interface GameProviderProps {
  initialScene: SceneId
  children: ReactNode
}

export function GameProvider({ initialScene, children }: GameProviderProps) {
  const [sceneId, setSceneId] = useState<SceneId>(initialScene)
  const [gender, setGender] = useState<Gender>('male')
  const [curtainClosed, setCurtainClosed] = useState(true)
  const [sceneReady, setSceneReady] = useState(false)
  const transitioning = useRef(false)
  const paused = usePortrait()

  // Every new scene starts behind the closed curtain and fades in.
  useEffect(() => {
    let frame = requestAnimationFrame(() => {
      // Second frame so the closed curtain is painted before it starts to open.
      frame = requestAnimationFrame(() => setCurtainClosed(false))
    })
    const timer = setTimeout(() => {
      transitioning.current = false
      setSceneReady(true)
    }, FADE_MS)
    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(timer)
    }
  }, [sceneId])

  const goTo = useCallback((next: SceneId) => {
    if (transitioning.current) return
    transitioning.current = true
    setCurtainClosed(true)
    setTimeout(() => {
      setSceneReady(false)
      setSceneId(next)
    }, FADE_MS)
  }, [])

  const text = useCallback((value: GenderedText) => resolveText(value, gender), [gender])

  const value = useMemo<GameContextValue>(
    () => ({ sceneId, gender, setGender, goTo, sceneReady, curtainClosed, paused, text }),
    [sceneId, gender, goTo, sceneReady, curtainClosed, paused, text],
  )

  return <GameContext value={value}>{children}</GameContext>
}
