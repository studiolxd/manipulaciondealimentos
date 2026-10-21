import { useState } from 'react'
import { Layer, Stage } from '../design-system'
import { scenes } from '../scenes/registry'
import { DevSceneMenu } from './DevSceneMenu'
import { CurrentScene, useGame } from './game'

// Renders the current scene on the stage; the stage curtain fades between scenes.
export function SceneHost() {
  const { curtainClosed, paused } = useGame()
  const [sceneMenuOpen, setSceneMenuOpen] = useState(false)

  return (
    <Stage inert={paused} curtainClosed={curtainClosed}>
      <Layer inert={sceneMenuOpen}>
        <CurrentScene scenes={scenes} />
      </Layer>
      {import.meta.env.DEV && <DevSceneMenu open={sceneMenuOpen} onOpenChange={setSceneMenuOpen} />}
    </Stage>
  )
}
