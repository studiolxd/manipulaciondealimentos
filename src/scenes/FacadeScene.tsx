import { useState } from 'react'
import { facade } from '../content/scenes'
import { ActionButton } from '../engine/ActionButton'
import { useGame } from '../engine/gameContext'
import { Scene } from '../engine/Scene'
import { Typewriter } from '../engine/Typewriter'

// Scene 1: the restaurant from the street.
export function FacadeScene() {
  const { sceneReady, goTo } = useGame()
  const [skipRequested, setSkipRequested] = useState(false)
  const [typed, setTyped] = useState(false)

  return (
    <Scene heading={facade.heading} background="facadeBackground" backgroundAlt={facade.backgroundAlt}>
      {sceneReady && (
        <div className="narration-box facade__narration" onClick={() => setSkipRequested(true)}>
          <p>
            <Typewriter text={facade.narration} complete={skipRequested} onDone={() => setTyped(true)} />
          </p>
        </div>
      )}
      {typed && (
        <ActionButton className="facade__enter" onClick={() => goTo('dining-room')}>
          {facade.enter}
        </ActionButton>
      )}
    </Scene>
  )
}
