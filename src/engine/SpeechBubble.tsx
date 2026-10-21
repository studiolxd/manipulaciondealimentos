import { useEffect, useEffectEvent, useState } from 'react'
import { ui } from '../content/ui'
import type { AssetId } from './assets'
import { assetUrl } from './assetUrl'
import { Typewriter } from './Typewriter'

interface SpeechBubbleProps {
  speaker: string
  /** Each block is typed out and the player advances to the next with a click. */
  blocks: string[]
  portrait?: AssetId
  /** Side the tail points to, towards the speaker. */
  tail?: 'left' | 'bottom' | 'none'
  className?: string
  onFinished: () => void
}

export function SpeechBubble({ speaker, blocks, portrait, tail = 'none', className, onFinished }: SpeechBubbleProps) {
  const [index, setIndex] = useState(0)
  const [skipRequested, setSkipRequested] = useState(false)
  const [typed, setTyped] = useState(false)
  // A skipped block counts as fully shown right away, so quick presses are not lost.
  const shown = typed || skipRequested
  const isLast = index === blocks.length - 1
  const finished = shown && isLast

  function advance() {
    if (!shown) {
      setSkipRequested(true)
    } else if (!isLast) {
      setIndex(index + 1)
      setSkipRequested(false)
      setTyped(false)
    }
  }

  const notifyFinished = useEffectEvent(onFinished)
  useEffect(() => {
    if (finished) notifyFinished()
  }, [finished])

  return (
    <div className={`speech-bubble speech-bubble--tail-${tail} ${className ?? ''}`} onClick={advance}>
      {portrait && <img className="speech-bubble__portrait" src={assetUrl(portrait)} alt="" />}
      <div className="speech-bubble__body">
        <p className="speech-bubble__speaker visually-hidden">{ui.speakerSays(speaker)}</p>
        {/* Announces each new block as the player advances. */}
        <p className="speech-bubble__text" aria-live="polite">
          <Typewriter key={index} text={blocks[index]} complete={skipRequested} onDone={() => setTyped(true)} />
        </p>
      </div>
      {!finished && (
        <button
          type="button"
          className="speech-bubble__next"
          aria-label={shown ? ui.continue : ui.showFullText}
          onClick={(event) => {
            event.stopPropagation()
            advance()
          }}
        >
          <img className="speech-bubble__next-icon" src={assetUrl('nextIcon')} alt="" />
        </button>
      )}
    </div>
  )
}
