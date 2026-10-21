import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { resolveText, type Gender, type GenderedText } from '../content/gendered'
import { tokens, usePortrait } from '../design-system'
import { sceneProgressWeight, type SceneId } from '../scenes/sceneIds'
import { GameContext, type GameContextValue } from './gameContext'
import { loadProgress, saveProgress, type Progress } from './tracking/progress'
import { xapi } from './tracking/xapi'

// Duration of each half of a scene change (fade out, then fade in); the
// curtain animates with the same token.
const FADE_MS = tokens['stage.fade-duration']

interface GameProviderProps {
  /** Overrides where the game starts (development only); otherwise it resumes from the LMS. */
  startScene?: SceneId
  children: ReactNode
}

export function GameProvider({ startScene, children }: GameProviderProps) {
  // Progress saved in the LMS from a previous session, read once.
  const [saved] = useState(loadProgress)
  const [sceneId, setSceneId] = useState<SceneId>(startScene ?? saved?.at ?? 'address-form')
  const [gender, setGenderState] = useState<Gender>(saved?.gender ?? 'neutral')
  const [curtainClosed, setCurtainClosed] = useState(true)
  const [sceneReady, setSceneReady] = useState(false)
  const transitioning = useRef(false)
  const progress = useRef<Progress>({ gender: saved?.gender ?? null, done: saved?.done ?? [], at: sceneId })
  const reportedScene = useRef<SceneId | null>(null)
  const paused = usePortrait()

  // A first session starts as "incomplete" with 0% progress.
  useEffect(() => {
    if (!saved) saveProgress(progress.current)
  }, [saved])

  useEffect(() => {
    // Guard against the double effect of React's development mode.
    if (reportedScene.current === sceneId) return
    reportedScene.current = sceneId
    xapi.sceneExperienced(sceneId)
  }, [sceneId])

  // Every new scene starts behind the closed curtain and fades in.
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined
    let frame = requestAnimationFrame(() => {
      // Second frame so the closed curtain is painted before it starts to open.
      frame = requestAnimationFrame(() => {
        setCurtainClosed(false)
        timer = setTimeout(() => {
          transitioning.current = false
          setSceneReady(true)
        }, FADE_MS)
      })
    })
    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(timer)
    }
  }, [sceneId])

  const setGender = useCallback((value: Gender) => {
    progress.current.gender = value
    setGenderState(value)
  }, [])

  const goTo = useCallback((next: SceneId) => {
    if (transitioning.current) return
    transitioning.current = true
    // Leaving a scene completes it.
    const current = progress.current
    const done = sceneProgressWeight[current.at] > 0 && !current.done.includes(current.at)
    progress.current = { ...current, done: done ? [...current.done, current.at] : current.done, at: next }
    saveProgress(progress.current)
    setCurtainClosed(true)
    setTimeout(() => {
      setSceneReady(false)
      setSceneId(next)
    }, FADE_MS)
  }, [])

  const text = useCallback((value: GenderedText) => resolveText(value, gender), [gender])

  const value = useMemo<GameContextValue>(
    () => ({ sceneId, gender, setGender, goTo, sceneReady, curtainClosed, paused, text }),
    [sceneId, gender, setGender, goTo, sceneReady, curtainClosed, paused, text],
  )

  return <GameContext value={value}>{children}</GameContext>
}
