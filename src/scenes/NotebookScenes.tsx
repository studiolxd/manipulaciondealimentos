import { useEffect, useState } from 'react'
import { image } from '../content/images'
import { notebook as content } from '../content/contamination'
import { IconButton, Layer, Notebook, Positioned, SceneFrame } from '../design-system'
import { useGame } from '../game/game'
import type { SceneId } from './sceneIds'

interface NotebookSceneProps {
  left: Parameters<typeof Notebook>[0]['left']
  right: Parameters<typeof Notebook>[0]['right']
  /** Where the arrow or the cross, shown after a while, leads. */
  next: SceneId
  control: 'arrow' | 'cross'
}

// The notebook in close-up, over the dimmed kitchen. Its arrow or cross appears
// after a while, so the pages are read first.
function NotebookScene({ left, right, next, control }: NotebookSceneProps) {
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
        <Positioned top={90} center="x" width={1700} height={900}>
          <Notebook label={content.label} left={left} right={right} />
        </Positioned>
        {canGoOn && control === 'arrow' && (
          <Positioned bottom={100} center="x" layer="over-hud">
            <IconButton icon="next" label={content.nextPage} onClick={() => goTo(next)} />
          </Positioned>
        )}
        {canGoOn && control === 'cross' && (
          <Positioned top={110} right={130} layer="over-hud">
            <IconButton close icon="close" label={content.close} onClick={() => goTo(next)} />
          </Positioned>
        )}
      </Layer>
    </SceneFrame>
  )
}

// Scene 49 (activity 14): the first page, on the right; the left one is blank.
export function NotebookPage1Scene() {
  return <NotebookScene left={null} right={content.page1.right} next="notebook-page-2" control="arrow" />
}

// Scene 50: physical contamination on the left, chemical on the right.
export function NotebookPage2Scene() {
  return (
    <NotebookScene left={content.page2.left} right={content.page2.right} next="notebook-conclusion" control="cross" />
  )
}
