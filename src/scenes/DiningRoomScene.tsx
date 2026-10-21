import { useState } from 'react'
import { image } from '../content/images'
import { diningRoom } from '../content/scenes'
import { Button, Image, Positioned, SceneFrame, SpeechBubble } from '../design-system'
import { useGame } from '../engine/gameContext'

// Scene 2: David welcomes the player in the empty dining room.
export function DiningRoomScene() {
  const { sceneReady, goTo, text } = useGame()
  const [finished, setFinished] = useState(false)

  return (
    <SceneFrame
      heading={diningRoom.heading}
      background={image('diningRoomBackground')}
      backgroundAlt={diningRoom.backgroundAlt}
      focusHeading={sceneReady}
    >
      <Positioned bottom={0} left={120}>
        <Image source={image('davidStanding')} alt={diningRoom.davidAlt} height={900} />
      </Positioned>
      {sceneReady && (
        <Positioned top={140} left={820} width={980}>
          <SpeechBubble
            speaker="David"
            blocks={diningRoom.speech.map(text)}
            tail="left"
            onFinished={() => setFinished(true)}
          />
        </Positioned>
      )}
      {finished && (
        <Positioned bottom={64} center="x">
          <Button claimFocus onClick={() => goTo('handler-definition')}>
            {diningRoom.next}
          </Button>
        </Positioned>
      )}
    </SceneFrame>
  )
}
