import { image } from '../content/images'
import { addressForm } from '../content/scenes'
import { OptionButtons, Positioned, SceneFrame } from '../design-system'
import { useGame } from '../game/game'

// Before the script: the player chooses how to be addressed, and texts adapt.
// Pressing an option chooses it and starts the game.
export function AddressFormScene() {
  const { sceneReady, playerName, setGender, goTo } = useGame()

  return (
    <SceneFrame
      heading={addressForm.heading(playerName)}
      visibleHeadingTop={160}
      background={image('addressFormBackground')}
      backgroundAlt=""
      focusHeading={sceneReady}
    >
      {sceneReady && (
        <Positioned top={480} center="x">
          <OptionButtons
            advance
            label={addressForm.legend}
            options={addressForm.options.map((option) => ({ value: option.gender, label: option.label }))}
            onSelect={(gender) => {
              setGender(gender)
              goTo('facade')
            }}
          />
        </Positioned>
      )}
    </SceneFrame>
  )
}
