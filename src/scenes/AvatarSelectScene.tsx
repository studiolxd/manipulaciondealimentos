import { useState } from 'react'
import type { Gender } from '../content/gendered'
import { image } from '../content/images'
import { avatarSelect } from '../content/scenes'
import { Button, ChoiceCardGroup, InlineAlert, Positioned, SceneFrame } from '../design-system'
import { useGame } from '../engine/gameContext'

const portraits = { male: 'playerMale', female: 'playerFemale' } as const
const ERROR_ID = 'avatar-error'

export function AvatarSelectScene() {
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
      heading={avatarSelect.heading}
      visibleHeadingTop={64}
      background={image('avatarSelectBackground')}
      backgroundAlt=""
      focusHeading={sceneReady}
    >
      <Positioned top={200} center="x">
        <ChoiceCardGroup
          legend={avatarSelect.legend}
          name="avatar"
          options={avatarSelect.options.map((option) => ({ ...option, value: option.gender, image: image(portraits[option.gender]) }))}
          value={choice}
          imageWidth={336}
          describedBy={showError ? ERROR_ID : undefined}
          onChange={(value) => {
            setChoice(value)
            setShowError(false)
          }}
        />
      </Positioned>
      <Positioned top={830} left={0} width={1920}>
        <InlineAlert id={ERROR_ID} message={showError ? avatarSelect.missingChoice : null} />
      </Positioned>
      <Positioned bottom={48} center="x">
        <Button onClick={start}>{avatarSelect.start}</Button>
      </Positioned>
    </SceneFrame>
  )
}
