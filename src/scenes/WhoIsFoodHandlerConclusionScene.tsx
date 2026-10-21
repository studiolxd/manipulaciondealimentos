import { useState } from 'react'
import { whoIsFoodHandlerConclusion } from '../content/whoIsFoodHandler'
import { ActionButton } from '../engine/ActionButton'
import { assetUrl } from '../engine/assetUrl'
import { useGame } from '../engine/gameContext'
import { Scene } from '../engine/Scene'
import { SpeechBubble } from '../engine/SpeechBubble'

// Scene 6: David sums up activity 2 and introduces the security cameras.
export function WhoIsFoodHandlerConclusionScene() {
  const { sceneReady, goTo } = useGame()
  const [finished, setFinished] = useState(false)

  return (
    <Scene
      heading={whoIsFoodHandlerConclusion.heading}
      background="diningTableBackground"
      backgroundAlt={whoIsFoodHandlerConclusion.backgroundAlt}
    >
      <img className="table__david" src={assetUrl('davidSeated')} alt={whoIsFoodHandlerConclusion.davidAlt} />
      {sceneReady && (
        <SpeechBubble
          className="table__bubble"
          speaker="David"
          blocks={whoIsFoodHandlerConclusion.speech}
          portrait="davidPortrait"
          onFinished={() => setFinished(true)}
        />
      )}
      {finished && (
        <ActionButton className="scene__action" onClick={() => goTo('coming-soon')}>
          {whoIsFoodHandlerConclusion.next}
        </ActionButton>
      )}
    </Scene>
  )
}
