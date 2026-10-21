import { image } from '../content/images'
import { handlerDefinition } from '../content/scenes'
import { DialogueScene } from '../design-system'
import { useGame } from '../engine/gameContext'

// Scene 3 (activity 1): David explains what a food handler is.
export function HandlerDefinitionScene() {
  const { sceneReady, goTo, text } = useGame()
  return (
    <DialogueScene
      heading={handlerDefinition.heading}
      background={image('diningTableBackground')}
      backgroundAlt={handlerDefinition.backgroundAlt}
      ready={sceneReady}
      character={{ source: image('davidSeated'), alt: handlerDefinition.davidAlt, bottom: 220, left: 160, height: 640 }}
      speech={{ speaker: 'David', blocks: handlerDefinition.speech.map(text), tail: 'left', top: 160, left: 940, width: 900 }}
      action={{ label: handlerDefinition.next, onClick: () => goTo('who-is-food-handler') }}
    />
  )
}
