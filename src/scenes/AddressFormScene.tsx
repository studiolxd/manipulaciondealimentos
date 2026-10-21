import { useState } from 'react'
import type { Gender } from '../content/gendered'
import { image } from '../content/images'
import { addressForm } from '../content/scenes'
import { Button, ChoiceCardGroup, Positioned, SceneFrame } from '../design-system'
import { useGame } from '../engine/gameContext'

// Before the script: the player chooses how to be addressed, and texts adapt.
export function AddressFormScene() {
  const { sceneReady, setGender, goTo } = useGame()
  const [choice, setChoice] = useState<Gender | null>(null)
  const [showError, setShowError] = useState(false)

  function start() {
    if (!choice) {
      setShowError(true)
      return
    }
    setGender(choice)
    goTo('facade')
  }

  return (
    <SceneFrame
      heading={addressForm.heading}
      visibleHeadingTop={160}
      background={image('addressFormBackground')}
      backgroundAlt=""
      focusHeading={sceneReady}
    >
      <Positioned top={400} center="x">
        <ChoiceCardGroup
          legend={addressForm.legend}
          name="address"
          options={addressForm.options.map((option) => ({ value: option.gender, label: option.label }))}
          value={choice}
          error={showError ? addressForm.missingChoice : null}
          onChange={(value) => {
            setChoice(value)
            setShowError(false)
          }}
        />
      </Positioned>
      <Positioned bottom={120} center="x">
        <Button onClick={start}>{addressForm.start}</Button>
      </Positioned>
    </SceneFrame>
  )
}
