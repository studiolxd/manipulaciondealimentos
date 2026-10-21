import { createContext, useContext } from 'react'
import type { Gender, GenderedText } from '../content/gendered'
import type { SceneId } from '../scenes/sceneIds'

export interface GameContextValue {
  sceneId: SceneId
  gender: Gender
  setGender: (gender: Gender) => void
  /** Fades out the current scene and fades in the next one. */
  goTo: (sceneId: SceneId) => void
  /** Whether the fade-in of the current scene has finished. */
  sceneReady: boolean
  /** Whether the curtain covering the stage is closed (black). */
  curtainClosed: boolean
  /** True while the game is hidden behind the rotate-device screen. */
  paused: boolean
  /** Resolves a text for the chosen avatar. */
  text: (text: GenderedText) => string
}

export const GameContext = createContext<GameContextValue | null>(null)

export function useGame(): GameContextValue {
  const game = useContext(GameContext)
  if (!game) throw new Error('useGame must be used inside <GameProvider>')
  return game
}
