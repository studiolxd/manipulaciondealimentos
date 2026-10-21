import { designSystemStrings, ui } from './content/ui'
import { DesignSystemProvider, RotateDeviceScreen, Stage, useCoarsePointer, usePortrait } from './design-system'
import { GameProvider } from './engine/GameProvider'
import { SceneHost } from './engine/SceneHost'
import { isSceneId, type SceneId } from './scenes/sceneIds'

// During development, ?scene=<id> starts the game at that scene instead of
// resuming from the LMS.
function startScene(): SceneId | undefined {
  const requested = new URLSearchParams(window.location.search).get('scene')
  return import.meta.env.DEV && isSceneId(requested) ? requested : undefined
}

export default function App() {
  const portrait = usePortrait()
  const touch = useCoarsePointer()
  return (
    <DesignSystemProvider strings={designSystemStrings} paused={portrait}>
      <GameProvider startScene={startScene()}>
        <Stage inert={portrait}>
          <SceneHost />
        </Stage>
        {portrait && (
          <RotateDeviceScreen
            title={ui.rotateDevice.title}
            message={touch ? ui.rotateDevice.touchMessage : ui.rotateDevice.desktopMessage}
          />
        )}
      </GameProvider>
    </DesignSystemProvider>
  )
}
