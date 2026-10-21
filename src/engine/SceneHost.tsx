import { Curtain, Hud, Layer } from '../design-system'
import { scenes } from '../scenes/registry'
import { useGame } from './gameContext'

// Renders the current scene under a black curtain used for fades.
export function SceneHost() {
  const { sceneId, curtainClosed } = useGame()
  const { component: CurrentScene, hud } = scenes[sceneId]

  return (
    <>
      <Layer isolate inert={curtainClosed}>
        <CurrentScene key={sceneId} />
        {hud && <Hud />}
      </Layer>
      <Curtain closed={curtainClosed} />
    </>
  )
}
