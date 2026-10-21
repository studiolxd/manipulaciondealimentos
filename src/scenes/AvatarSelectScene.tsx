import { useState } from 'react'
import { avatarSelect } from '../content/scenes'
import type { Gender } from '../content/gendered'
import { ActionButton } from '../engine/ActionButton'
import { assetUrl } from '../engine/assetUrl'
import { useGame } from '../engine/gameContext'
import { Scene } from '../engine/Scene'

const portraits = { male: 'playerMale', female: 'playerFemale' } as const

export function AvatarSelectScene() {
  const { setGender, goTo } = useGame()
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
    <Scene
      heading={avatarSelect.heading}
      headingClassName="avatar-select__heading"
      background="avatarSelectBackground"
      backgroundAlt=""
      className="avatar-select"
    >
      <fieldset className="avatar-select__options" aria-describedby={showError ? 'avatar-error' : undefined}>
        <legend className="visually-hidden">{avatarSelect.legend}</legend>
        {avatarSelect.options.map((option) => (
          <label key={option.gender} className="avatar-option">
            <input
              type="radio"
              name="avatar"
              className="visually-hidden"
              value={option.gender}
              checked={choice === option.gender}
              onChange={() => {
                setChoice(option.gender)
                setShowError(false)
              }}
            />
            <img className="avatar-option__image" src={assetUrl(portraits[option.gender])} alt="" />
            <span className="avatar-option__label">{option.label}</span>
          </label>
        ))}
      </fieldset>
      <p id="avatar-error" className="avatar-select__error" role="alert">
        {showError ? avatarSelect.missingChoice : ''}
      </p>
      <ActionButton className="avatar-select__start" onClick={start}>
        {avatarSelect.start}
      </ActionButton>
    </Scene>
  )
}
