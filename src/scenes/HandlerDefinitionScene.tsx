import { useState } from 'react'
import { handlerDefinition } from '../content/scenes'
import { ActionButton } from '../engine/ActionButton'
import { assetUrl } from '../engine/assetUrl'
import { useGame } from '../engine/gameContext'
import { Scene } from '../engine/Scene'
import { SpeechBubble } from '../engine/SpeechBubble'

// Scene 3 (activity 1): David explains what a food handler is.
export function HandlerDefinitionScene() {
  const { sceneReady, goTo, text } = useGame()
  const [finished, setFinished] = useState(false)

  return (
    <Scene
      heading={handlerDefinition.heading}
      background="diningTableBackground"
      backgroundAlt={handlerDefinition.backgroundAlt}
    >
      <img className="table__david" src={assetUrl('davidSeated')} alt={handlerDefinition.davidAlt} />
      {sceneReady && (
        <SpeechBubble
          className="table__bubble"
          speaker="David"
          blocks={handlerDefinition.speech.map(text)}
          portrait="davidPortrait"
          onFinished={() => setFinished(true)}
        />
      )}
      {finished && (
        <ActionButton className="scene__action" onClick={() => goTo('who-is-food-handler')}>
          {handlerDefinition.next}
        </ActionButton>
      )}
    </Scene>
  )
}
