import { usePortrait } from '@studiolxd/tramoya'
import { designSystemStrings, ui } from './content/ui'
import { DesignSystemProvider, RotateDeviceScreen } from './design-system'
import { GameProvider, isSceneId } from './game/game'
import { SceneHost } from './game/SceneHost'
import type { SceneId } from './scenes/sceneIds'

// During development, ?scene=<id> starts the game at that scene instead of
// resuming from the LMS.
function startScene(): SceneId | undefined {
  const requested = new URLSearchParams(window.location.search).get('scene')
  return import.meta.env.DEV && isSceneId(requested) ? requested : undefined
}

export default function App() {
  const portrait = usePortrait()
  return (
    <DesignSystemProvider strings={designSystemStrings} paused={portrait}>
      <GameProvider startScene={startScene()} paused={portrait}>
        <SceneHost />
        {portrait && <RotateDeviceScreen title={ui.rotateDevice.title} />}
      </GameProvider>
    </DesignSystemProvider>
  )
}
