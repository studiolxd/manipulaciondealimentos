import { useState } from 'react'
import { image } from '../content/images'
import { welcome } from '../content/scenes'
import { ui } from '../content/ui'
import { Button, Dialog, Heading, Layer, Positioned, SceneFrame, Switch } from '../design-system'
import { useGame } from '../game/game'
import { useSettings } from '../game/settings'

// Title screen on every load: begins the game, or continues it when the LMS
// has progress from a previous session. Settings (voice-overs, sound effects)
// open from here.
export function WelcomeScene() {
  const { sceneReady, paused, hasProgress, start } = useGame()
  const { settings, setSetting } = useSettings()
  const [settingsOpen, setSettingsOpen] = useState(false)

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
        <Layer inert={settingsOpen}>
          <Positioned bottom={240} center="x">
            <Button claimFocus advance onClick={start}>
              {hasProgress ? welcome.resume : welcome.start}
            </Button>
          </Positioned>
          <Positioned top={48} right={64}>
            <Button variant="secondary" aria-haspopup="dialog" onClick={() => setSettingsOpen(true)}>
              {ui.settings.open}
            </Button>
          </Positioned>
        </Layer>
      )}
      {settingsOpen && (
        <Layer layer="dialog" backdrop>
          <Positioned center="both" width={900}>
            <Dialog label={ui.settings.title} closeLabel={ui.settings.close} onClose={() => setSettingsOpen(false)}>
              <Heading level={2}>{ui.settings.title}</Heading>
              <Switch label={ui.settings.voice} checked={settings.voice} onChange={(on) => setSetting('voice', on)} />
              <Switch
                label={ui.settings.effects}
                checked={settings.effects}
                onChange={(on) => setSetting('effects', on)}
              />
            </Dialog>
          </Positioned>
        </Layer>
      )}
    </SceneFrame>
  )
}
