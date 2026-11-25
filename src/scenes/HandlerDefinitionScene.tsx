import { image } from '../content/images'
import { handlerDefinition } from '../content/scenes'
import { DialogueScene } from '../design-system'
import { useGame } from '../game/game'

// Scene 3 (activity 1): David explains what a food handler is.
export function HandlerDefinitionScene() {
  const { sceneReady, goTo, text } = useGame()
  return (
    <DialogueScene
      heading={handlerDefinition.heading}
      background={image('diningTableBackground')}
      backgroundAlt={handlerDefinition.backgroundAlt}
      ready={sceneReady}
      speech={{ speaker: 'David', blocks: handlerDefinition.speech.map(text), tail: 'right', top: 100, left: 40, width: 640 }}
      action={{ label: handlerDefinition.next, onClick: () => goTo('who-is-food-handler') }}
    />
  )
}
