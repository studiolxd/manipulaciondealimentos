import { image } from '../content/images'
import { welcome } from '../content/scenes'
import { Button, Positioned, SceneFrame } from '../design-system'
import { useGame } from '../game/game'

// Title screen on every load: begins the game, or continues it when the LMS
// has progress from a previous session.
export function WelcomeScene() {
  const { sceneReady, hasProgress, start } = useGame()

  return (
    <SceneFrame
      heading={welcome.heading}
      visibleHeadingTop={360}
      headingVariant="display"
      background={image('facadeBackground')}
      backgroundAlt=""
      focusHeading={sceneReady}
    >
      <Positioned bottom={240} center="x">
        <Button onClick={start}>{hasProgress ? welcome.resume : welcome.start}</Button>
      </Positioned>
    </SceneFrame>
  )
}
