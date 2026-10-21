import { whoIsFoodHandlerConclusion } from '../content/whoIsFoodHandler'
import { useGame } from '../engine/gameContext'
import { DavidAtTable } from './DavidAtTable'

// Scene 6: David sums up activity 2 and introduces the security cameras.
export function WhoIsFoodHandlerConclusionScene() {
  const { goTo } = useGame()
  return (
    <DavidAtTable
      heading={whoIsFoodHandlerConclusion.heading}
      backgroundAlt={whoIsFoodHandlerConclusion.backgroundAlt}
      davidAlt={whoIsFoodHandlerConclusion.davidAlt}
      speech={whoIsFoodHandlerConclusion.speech}
      next={whoIsFoodHandlerConclusion.next}
      onNext={() => goTo('coming-soon')}
    />
  )
}
