import { Stage } from '../design-system'
import { scenes } from '../scenes/registry'
import { CurrentScene, useGame } from './game'

// Renders the current scene on the stage; the stage curtain fades between scenes.
export function SceneHost() {
  const { curtainClosed, paused } = useGame()

  return (
    <Stage inert={paused} curtainClosed={curtainClosed}>
      <CurrentScene scenes={scenes} />
    </Stage>
  )
}
