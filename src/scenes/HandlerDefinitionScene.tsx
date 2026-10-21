import { handlerDefinition } from '../content/scenes'
import { useGame } from '../engine/gameContext'
import { DavidAtTable } from './DavidAtTable'

// Scene 3 (activity 1): David explains what a food handler is.
export function HandlerDefinitionScene() {
  const { goTo, text } = useGame()
  return (
    <DavidAtTable
      heading={handlerDefinition.heading}
      backgroundAlt={handlerDefinition.backgroundAlt}
      davidAlt={handlerDefinition.davidAlt}
      speech={handlerDefinition.speech.map(text)}
      next={handlerDefinition.next}
      onNext={() => goTo('who-is-food-handler')}
    />
  )
}
