import { image } from '../content/images'
import { welcome } from '../content/scenes'
import { Button, Positioned, SceneFrame } from '../design-system'
import { useGame } from '../game/game'

// Title screen on every load: begins the game, or continues it when the LMS
// has progress from a previous session.
export function WelcomeScene() {
  const { sceneReady, paused, hasProgress, start } = useGame()

  return (
    <SceneFrame
      heading={welcome.heading}
      visibleHeadingTop={360}
      headingVariant="display"
      background={image('facadeBackground')}
      backgroundAlt=""
      focusHeading={sceneReady}
    >
      {/* After the logo or the rotate-device screen, so its entrance is seen. */}
      {sceneReady && !paused && (
        <Positioned bottom={240} center="x">
          <Button claimFocus advance onClick={start}>
            {hasProgress ? welcome.resume : welcome.start}
          </Button>
        </Positioned>
      )}
    </SceneFrame>
  )
}
