import { image } from '../content/images'
import { diningRoom } from '../content/scenes'
import { DialogueScene } from '../design-system'
import { useGame } from '../engine/gameContext'

// Scene 2: David welcomes the player in the empty dining room.
export function DiningRoomScene() {
  const { sceneReady, goTo, text } = useGame()
  return (
    <DialogueScene
      heading={diningRoom.heading}
      background={image('diningRoomBackground')}
      backgroundAlt={diningRoom.backgroundAlt}
      ready={sceneReady}
      character={{ source: image('davidStanding'), alt: diningRoom.davidAlt, bottom: 0, left: 120, height: 900 }}
      speech={{ speaker: 'David', blocks: diningRoom.speech.map(text), tail: 'left', top: 140, left: 820, width: 980 }}
      action={{ label: diningRoom.next, onClick: () => goTo('handler-definition') }}
    />
  )
}
