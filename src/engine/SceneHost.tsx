import { Stage } from '../design-system'
import { scenes } from '../scenes/registry'
import { useGame } from './gameContext'

// Renders the current scene on the stage; the stage curtain fades between scenes.
export function SceneHost() {
  const { sceneId, curtainClosed, paused } = useGame()
  const CurrentScene = scenes[sceneId]

  return (
    <Stage inert={paused} curtainClosed={curtainClosed}>
      <CurrentScene key={sceneId} />
    </Stage>
  )
}
