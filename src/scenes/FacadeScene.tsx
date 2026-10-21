import { useState } from 'react'
import { image } from '../content/images'
import { facade } from '../content/scenes'
import { Button, NarrationBox, Positioned, SceneFrame, Typewriter } from '../design-system'
import { useGame } from '../engine/gameContext'

// Scene 1: the restaurant from the street.
export function FacadeScene() {
  const { sceneReady, goTo } = useGame()
  const [skipRequested, setSkipRequested] = useState(false)
  const [typed, setTyped] = useState(false)

  return (
    <SceneFrame
      heading={facade.heading}
      background={image('facadeBackground')}
      backgroundAlt={facade.backgroundAlt}
      focusHeading={sceneReady}
    >
      {sceneReady && (
        <Positioned center="both" width={1200}>
          <NarrationBox onClick={() => setSkipRequested(true)}>
            <Typewriter text={facade.narration} complete={skipRequested} onDone={() => setTyped(true)} />
          </NarrationBox>
        </Positioned>
      )}
      {typed && (
        <Positioned bottom={96} center="x">
          <Button claimFocus onClick={() => goTo('dining-room')}>
            {facade.enter}
          </Button>
        </Positioned>
      )}
    </SceneFrame>
  )
}
