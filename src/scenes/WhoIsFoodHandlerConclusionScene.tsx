import { image } from '../content/images'
import { whoIsFoodHandlerConclusion as conclusion } from '../content/whoIsFoodHandler'
import { DialogueScene } from '../design-system'
import { useGame } from '../game/game'

// Scene 6: David sums up activity 2 and introduces the security cameras.
export function WhoIsFoodHandlerConclusionScene() {
  const { sceneReady, goTo } = useGame()
  return (
    <DialogueScene
      heading={conclusion.heading}
      background={image('diningTableBackground')}
      backgroundAlt={conclusion.backgroundAlt}
      ready={sceneReady}
      speech={{ speaker: 'David', blocks: conclusion.speech, tail: 'right', top: 100, left: 40, width: 640 }}
      action={{ label: conclusion.next, onClick: () => goTo('cameras-intro') }}
      hud
    />
  )
}
