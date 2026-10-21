import { image } from '../content/images'
import { comingSoon } from '../content/scenes'
import { NarrationBox, Positioned, SceneFrame, Text } from '../design-system'
import { useGame } from '../engine/gameContext'

// Temporary end of the game until activity 3 is built.
export function ComingSoonScene() {
  const { sceneReady } = useGame()
  return (
    <SceneFrame
      heading={comingSoon.heading}
      visibleHeadingTop={240}
      background={image('diningTableBackground')}
      backgroundAlt=""
      focusHeading={sceneReady}
    >
      <Positioned center="both" width={1200}>
        <NarrationBox>
          <Text>{comingSoon.message}</Text>
        </NarrationBox>
      </Positioned>
    </SceneFrame>
  )
}
