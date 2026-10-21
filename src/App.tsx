import { usePortrait } from '@studiolxd/tramoya'
import { useState } from 'react'
import { designSystemStrings, ui } from './content/ui'
import { DesignSystemProvider, RotateDeviceScreen, SplashScreen } from './design-system'
import { GameProvider, isSceneId } from './game/game'
import { SceneHost } from './game/SceneHost'
import { tracking } from './game/tracking'
import type { SceneId } from './scenes/sceneIds'

// During development, ?scene=<id> starts the game at that scene instead of
// resuming from the LMS.
function startScene(): SceneId | undefined {
  const requested = new URLSearchParams(window.location.search).get('scene')
  return import.meta.env.DEV && isSceneId(requested) ? requested : undefined
}

export default function App() {
  const portrait = usePortrait()
  const [initialScene] = useState(startScene)
  // Outside an LMS (e.g. the public demo) the game opens with the Studio LXD
  // logo, except when development jumps straight to a scene.
  const [splash, setSplash] = useState(!tracking.inLms && initialScene === undefined)
  const paused = portrait || splash
  return (
    <DesignSystemProvider strings={designSystemStrings} paused={paused}>
      <GameProvider startScene={initialScene} paused={paused}>
        <SceneHost />
        {portrait && <RotateDeviceScreen title={ui.rotateDevice.title} />}
        {splash && <SplashScreen onFinished={() => setSplash(false)} />}
      </GameProvider>
    </DesignSystemProvider>
  )
}
