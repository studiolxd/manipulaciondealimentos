import { useState } from 'react'
import { diningRoom } from '../content/scenes'
import { ActionButton } from '../engine/ActionButton'
import { assetUrl } from '../engine/assetUrl'
import { useGame } from '../engine/gameContext'
import { Scene } from '../engine/Scene'
import { SpeechBubble } from '../engine/SpeechBubble'

// Scene 2: David welcomes the player in the empty dining room.
export function DiningRoomScene() {
  const { sceneReady, goTo, text } = useGame()
  const [finished, setFinished] = useState(false)

  return (
    <Scene heading={diningRoom.heading} background="diningRoomBackground" backgroundAlt={diningRoom.backgroundAlt}>
      <img className="dining-room__david" src={assetUrl('davidStanding')} alt={diningRoom.davidAlt} />
      {sceneReady && (
        <SpeechBubble
          className="dining-room__bubble"
          speaker="David"
          blocks={diningRoom.speech.map(text)}
          tail="left"
          onFinished={() => setFinished(true)}
        />
      )}
      {finished && (
        <ActionButton className="scene__action" onClick={() => goTo('handler-definition')}>
          {diningRoom.next}
        </ActionButton>
      )}
    </Scene>
  )
}
