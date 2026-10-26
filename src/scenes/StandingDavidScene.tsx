import type { GenderedText } from '@studiolxd/tramoya'
import { image } from '../content/images'
import type { AssetId } from '../content/assets'
import { DialogueScene } from '../design-system'
import { useGame } from '../game/game'
import type { SceneId } from './sceneIds'

interface StandingDavidSceneProps {
  content: {
    heading: string
    backgroundAlt: string
    davidAlt: string
    speech: readonly GenderedText[]
    next: string
  }
  background: AssetId
  /** Side of the screen where David stands; his speech bubble goes on the other side. */
  side: 'left' | 'right'
  next: SceneId
}

// David standing in front of the player, half body, talking; his button takes
// the player on. Used by the reception and changing-room scenes.
export function StandingDavidScene({ content, background, side, next }: StandingDavidSceneProps) {
  const { sceneReady, goTo, text } = useGame()
  const character =
    side === 'right'
      ? { source: image('davidHalfBody'), alt: content.davidAlt, bottom: 0, right: 140, height: 900 }
      : { source: image('davidHalfBody'), alt: content.davidAlt, bottom: 0, left: 140, height: 900 }
  const speechBox = side === 'right' ? { top: 160, left: 120, width: 980 } : { top: 160, left: 820, width: 980 }
  return (
    <DialogueScene
      heading={content.heading}
      background={image(background)}
      backgroundAlt={content.backgroundAlt}
      ready={sceneReady}
      character={character}
      speech={{ speaker: 'David', blocks: content.speech.map(text), tail: side, ...speechBox }}
      action={{ label: content.next, onClick: () => goTo(next) }}
      hud
    />
  )
}
