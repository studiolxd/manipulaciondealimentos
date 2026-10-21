import { useState } from 'react'
import type { ImageSource } from '../../../types'
import { Button } from '../../atoms/Button/Button'
import { Image } from '../../atoms/Image/Image'
import { Positioned } from '../../layout/Positioned/Positioned'
import { Hud } from '../../organisms/Hud/Hud'
import { SpeechBubble } from '../../organisms/SpeechBubble/SpeechBubble'
import { SceneFrame } from '../SceneFrame/SceneFrame'

interface Box {
  top?: number
  right?: number
  bottom?: number
  left?: number
  width?: number
}

interface DialogueSceneProps {
  heading: string
  background: ImageSource
  backgroundAlt: string
  /** The scene has finished fading in: the heading takes the focus and the speech starts. */
  ready: boolean
  /** Character on screen, placed in stage pixels. */
  character?: Box & { source: ImageSource; alt: string; height: number }
  speech: Box & {
    speaker: string
    blocks: string[]
    /** Voice-over of each block (see SpeechBubble). */
    voice?: (readonly string[] | undefined)[]
    tail?: 'left' | 'right' | 'bottom'
  }
  /** Button shown when the speech ends; it takes the player to another scene. */
  action: { label: string; onClick: () => void }
  hud?: boolean
}

// SceneFrame + character + SpeechBubble + Button: a character talks to the
// player, who continues when the speech ends.
export function DialogueScene({ heading, background, backgroundAlt, ready, character, speech, action, hud }: DialogueSceneProps) {
  const [finished, setFinished] = useState(false)
  const { speaker, blocks, voice, tail, ...speechBox } = speech

  return (
    <SceneFrame heading={heading} background={background} backgroundAlt={backgroundAlt} focusHeading={ready}>
      {character && (
        <Positioned top={character.top} right={character.right} bottom={character.bottom} left={character.left}>
          <Image source={character.source} alt={character.alt} height={character.height} />
        </Positioned>
      )}
      {ready && (
        <Positioned {...speechBox}>
          <SpeechBubble speaker={speaker} blocks={blocks} voice={voice} tail={tail} onFinished={() => setFinished(true)} />
        </Positioned>
      )}
      {finished && (
        <Positioned bottom={64} center="x">
          <Button claimFocus advance onClick={action.onClick}>
            {action.label}
          </Button>
        </Positioned>
      )}
      {hud && <Hud />}
    </SceneFrame>
  )
}
