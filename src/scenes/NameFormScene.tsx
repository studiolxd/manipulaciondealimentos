import { useState } from 'react'
import { image } from '../content/images'
import { nameForm } from '../content/scenes'
import { Button, InlineAlert, Positioned, SceneFrame, Surface, TextField } from '../design-system'
import { useGame } from '../engine/gameContext'

const ERROR_ID = 'name-error'
const MAX_LENGTH = 40

// First screen outside an LMS: the player types their name.
export function NameFormScene() {
  const { sceneReady, playerName, setPlayerName, goTo } = useGame()
  const [name, setName] = useState(playerName ?? '')
  const [showError, setShowError] = useState(false)

  function next() {
    const trimmed = name.trim()
    if (!trimmed) {
      setShowError(true)
      return
    }
    setPlayerName(trimmed)
    goTo('address-form')
  }

  return (
    <SceneFrame
      heading={nameForm.heading}
      visibleHeadingTop={200}
      background={image('addressFormBackground')}
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
      <Positioned bottom={120} center="x">
        <Button onClick={next}>{nameForm.next}</Button>
      </Positioned>
    </SceneFrame>
  )
}
