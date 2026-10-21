import { useState } from 'react'
import { image } from '../content/images'
import { facade } from '../content/scenes'
import { voiceUrls } from '../content/voices'
import { Button, NarrationBox, Positioned, SceneFrame, Typewriter } from '../design-system'
import { useGame } from '../game/game'

// Scene 1: the restaurant from the street.
export function FacadeScene() {
  const { sceneReady, goTo, gender } = useGame()
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
            <Typewriter
              text={facade.narration}
              voice={voiceUrls(facade.narrationVoice, gender)}
              complete={skipRequested}
              onDone={() => setTyped(true)}
            />
          </NarrationBox>
        </Positioned>
      )}
      {typed && (
        <Positioned bottom={96} center="x">
          <Button claimFocus advance onClick={() => goTo('dining-room')}>
            {facade.enter}
          </Button>
        </Positioned>
      )}
    </SceneFrame>
  )
}
