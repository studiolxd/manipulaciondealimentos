import { useState } from 'react'
import { image } from '../content/images'
import { nameForm } from '../content/scenes'
import { Button, InlineAlert, Positioned, SceneFrame, Surface, TextField } from '../design-system'
import { useGame } from '../game/game'
import { AddressFormScene } from './AddressFormScene'

const ERROR_ID = 'name-error'
const MAX_LENGTH = 40

// First screen outside an LMS: the player types their name; the form of address
// (AddressFormScene) takes over right after it, with no fade in between.
export function NameFormScene() {
  const { sceneReady, playerName, setPlayerName } = useGame()
  const [name, setName] = useState(playerName ?? '')
  const [showError, setShowError] = useState(false)
  const [named, setNamed] = useState(false)

  function next() {
    const trimmed = name.trim()
    if (!trimmed) {
      setShowError(true)
      return
    }
    setPlayerName(trimmed)
    setNamed(true)
  }

  // The form of address follows on the same background, without a fade between the two.
  if (named) return <AddressFormScene />

  return (
    <SceneFrame
      heading={nameForm.heading}
      background={image('facadeBackground')}
      backgroundAlt=""
      focusHeading={sceneReady}
    >
      <Positioned top={400} center="x" width={900}>
        <Surface tone="opaque" padding="lg">
          <TextField
            label={nameForm.label}
            value={name}
            autoComplete="given-name"
            maxLength={MAX_LENGTH}
            invalid={showError}
            describedBy={showError ? ERROR_ID : undefined}
            onChange={(value) => {
              setName(value)
              setShowError(false)
            }}
            onEnter={next}
          />
        </Surface>
      </Positioned>
      <Positioned top={680} left={0} width={1920}>
        <InlineAlert id={ERROR_ID} message={showError ? nameForm.missingName : null} />
      </Positioned>
      {sceneReady && (
        <Positioned bottom={120} center="x">
          <Button advance onClick={next}>
            {nameForm.next}
          </Button>
        </Positioned>
      )}
    </SceneFrame>
  )
}
