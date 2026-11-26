import { useEffect, useState } from 'react'
import { image } from '../content/images'
import { firstAidNote as content } from '../content/firstAid'
import { Button, Layer, NarrationBox, Positioned, SceneFrame, Text } from '../design-system'
import { useGame } from '../game/game'

// Scene 42 (activity 11): the note of the first-aid kit in close-up, over the
// dimmed kitchen. The button appears after a while, so it is read first.
export function FirstAidNoteScene() {
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
      background={image('kitchenCounterBackground')}
      backgroundAlt={content.backgroundAlt}
      focusHeading={sceneReady}
    >
      <Layer backdrop="dark">
        <Positioned top={150} center="x" width={1500}>
          <NarrationBox>
            <Text weight="bold">{content.title}</Text>
            {content.paragraphs.map((paragraph) => (
              <Text key={paragraph} size="body-sm">
                {paragraph}
              </Text>
            ))}
          </NarrationBox>
        </Positioned>
      </Layer>
      {canGoOn && (
        <Positioned bottom={40} center="x" layer="over-hud">
          <Button claimFocus advance onClick={() => goTo('first-aid-conclusion')}>
            {content.next}
          </Button>
        </Positioned>
      )}
    </SceneFrame>
  )
}
