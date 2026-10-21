import { useState } from 'react'
import { image } from '../content/images'
import { Button, Image, Positioned, SceneFrame, SpeechBubble } from '../design-system'
import { useGame } from '../engine/gameContext'

interface DavidAtTableProps {
  heading: string
  backgroundAlt: string
  davidAlt: string
  speech: string[]
  next: string
  onNext: () => void
}

// Layout shared by scenes 3 and 6: David sitting across the table, talking.
export function DavidAtTable({ heading, backgroundAlt, davidAlt, speech, next, onNext }: DavidAtTableProps) {
  const { sceneReady } = useGame()
  const [finished, setFinished] = useState(false)

  return (
    <SceneFrame
      heading={heading}
      background={image('diningTableBackground')}
      backgroundAlt={backgroundAlt}
      focusHeading={sceneReady}
    >
      <Positioned bottom={220} left={160}>
        <Image source={image('davidSeated')} alt={davidAlt} height={640} />
      </Positioned>
      {sceneReady && (
        <Positioned top={160} left={940} width={900}>
          <SpeechBubble
            speaker="David"
            blocks={speech}
            tail="left"
            onFinished={() => setFinished(true)}
          />
        </Positioned>
      )}
      {finished && (
        <Positioned bottom={64} center="x">
          <Button claimFocus onClick={onNext}>
            {next}
          </Button>
        </Positioned>
      )}
    </SceneFrame>
  )
}
