import { ScormProvider, useScormAutoTerminate } from '@studiolxd/scorm/react'
import { GameProvider } from './engine/GameProvider'
import { RotateDeviceOverlay } from './engine/RotateDeviceOverlay'
import { SceneHost } from './engine/SceneHost'
import { Stage } from './engine/Stage'
import { usePortrait } from './engine/useMediaQuery'

// Initializes the SCORM session on mount; commits and terminates on unload.
function ScormLifecycle() {
  useScormAutoTerminate()
  return null
}

function Game() {
  const portrait = usePortrait()
  return (
    <GameProvider initialScene="avatar-select">
      <Stage inert={portrait}>
        <SceneHost />
      </Stage>
      {portrait && <RotateDeviceOverlay />}
    </GameProvider>
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
