import { scenes } from '../scenes/registry'
import { useGame } from './gameContext'
import { FADE_MS } from './GameProvider'

// Renders the current scene under a black curtain used for fades.
export function SceneHost() {
  const { sceneId, curtainClosed } = useGame()
  const CurrentScene = scenes[sceneId]

  return (
    <>
      <div className="scene-host" inert={curtainClosed}>
        <CurrentScene key={sceneId} />
      </div>
      <div
        className={`curtain ${curtainClosed ? 'curtain--closed' : ''}`}
        style={{ transitionDuration: `${FADE_MS}ms` }}
        aria-hidden="true"
      />
    </>
  )
}
