import { useEffect, useState } from 'react'
import { image } from '../content/images'
import { healthPoster as content } from '../content/lockerRoom'
import { Button, Hud, Layer, Positioned, Poster, SceneFrame } from '../design-system'
import { useGame } from '../game/game'

// Scene 26 (activity 7): the health poster of the changing room in close-up,
// over the dimmed room. The button appears after a while, so it is read first.
export function HealthPosterScene() {
  const { sceneReady, paused, goTo } = useGame()
  const [canGoOn, setCanGoOn] = useState(false)

  useEffect(() => {
    if (!sceneReady || paused || canGoOn) return
    const timer = setTimeout(() => setCanGoOn(true), content.readMs)
    return () => clearTimeout(timer)
  }, [sceneReady, paused, canGoOn])

  return (
    <SceneFrame
      heading={content.heading}
      background={image('lockerRoomBackground')}
      backgroundAlt={content.backgroundAlt}
      focusHeading={sceneReady}
    >
      <Layer backdrop="dark">
        <Positioned top={150} center="x" width={1640} height={760}>
          <Poster title={content.title} blocks={content.blocks} />
        </Positioned>
      </Layer>
      <Layer layer="over-hud">
        <Hud />
      </Layer>
      {canGoOn && (
        <Positioned bottom={40} center="x" layer="over-hud">
          <Button claimFocus advance onClick={() => goTo('locker-room-conclusion')}>
            {content.next}
          </Button>
        </Positioned>
      )}
    </SceneFrame>
  )
}
