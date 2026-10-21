import { ScormProvider, useScormAutoTerminate } from '@studiolxd/scorm/react'
import { designSystemStrings, ui } from './content/ui'
import { DesignSystemProvider, RotateDeviceScreen, Stage, useCoarsePointer, usePortrait } from './design-system'
import { GameProvider } from './engine/GameProvider'
import { SceneHost } from './engine/SceneHost'
import { scenes } from './scenes/registry'
import type { SceneId } from './scenes/sceneIds'

// Initializes the SCORM session on mount; commits and terminates on unload.
function ScormLifecycle() {
  useScormAutoTerminate()
  return null
}

// During development, ?scene=<id> starts the game at that scene.
function initialScene(): SceneId {
  const requested = new URLSearchParams(window.location.search).get('scene')
  if (import.meta.env.DEV && requested && requested in scenes) return requested as SceneId
  return 'avatar-select'
}

function Game() {
  const portrait = usePortrait()
  const touch = useCoarsePointer()
  return (
    <DesignSystemProvider strings={designSystemStrings} paused={portrait}>
      <GameProvider initialScene={initialScene()}>
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

export default function App() {
  return (
    // Without an LMS (local development, plain web preview) an in-memory mock is used.
    <ScormProvider version="auto" options={{ noLmsBehavior: 'mock', debug: import.meta.env.DEV }}>
      <ScormLifecycle />
      <Game />
    </ScormProvider>
  )
}
