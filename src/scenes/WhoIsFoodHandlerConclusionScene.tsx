import { image } from '../content/images'
import { whoIsFoodHandlerConclusion as conclusion } from '../content/whoIsFoodHandler'
import { DialogueScene } from '../design-system'
import { useGame } from '../engine/gameContext'

// Scene 6: David sums up activity 2 and introduces the security cameras.
export function WhoIsFoodHandlerConclusionScene() {
  const { sceneReady, goTo } = useGame()
  return (
    <DialogueScene
      heading={conclusion.heading}
      background={image('diningTableBackground')}
      backgroundAlt={conclusion.backgroundAlt}
      ready={sceneReady}
      character={{ source: image('davidSeated'), alt: conclusion.davidAlt, bottom: 220, left: 160, height: 640 }}
      speech={{ speaker: 'David', blocks: conclusion.speech, tail: 'left', top: 160, left: 940, width: 900 }}
      action={{ label: conclusion.next, onClick: () => goTo('coming-soon') }}
      hud
    />
  )
}
