import { comingSoon } from '../content/scenes'
import { Scene } from '../engine/Scene'

// Temporary end of the game until activity 2 is built.
export function ComingSoonScene() {
  return (
    <Scene
      heading={comingSoon.heading}
      headingClassName="coming-soon__heading"
      background="diningTableBackground"
      backgroundAlt=""
      className="coming-soon"
    >
      <p className="narration-box">{comingSoon.message}</p>
    </Scene>
  )
}
