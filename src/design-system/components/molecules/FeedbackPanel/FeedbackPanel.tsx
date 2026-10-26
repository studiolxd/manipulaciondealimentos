import { useAutoFocus } from '@studiolxd/tramoya'
import { useEffect, useId, useRef } from 'react'
import { playSound } from '../../../sounds'
import { Button } from '../../atoms/Button/Button'
import { Icon } from '../../atoms/Icon/Icon'
import { Surface } from '../../atoms/Surface/Surface'
import { Text } from '../../atoms/Text/Text'
import styles from './FeedbackPanel.module.css'

export interface Feedback {
  tone: 'positive' | 'negative'
  /** Short verdict shown in bold, e.g. "¡Correcto!". Optional when the message stands alone. */
  title?: string
  message: string
}

interface FeedbackPanelProps {
  feedback: Feedback
  /** Text of the button that closes the panel, e.g. "Continuar". */
  closeLabel: string
  onClose: () => void
}

// Surface + Icon + Text + Button: the result of an answer as a modal panel. Its
// outline and shadow take the result's colour, so it shows before it is read.
// It sounds right or wrong as it appears. The button takes the focus; Escape also closes it. The caller puts it over a
// backdrop and makes the rest inert.
export function FeedbackPanel({ feedback, closeLabel, onClose }: FeedbackPanelProps) {
  const titleId = useId()
  const messageId = useId()
  const buttonRef = useRef<HTMLButtonElement>(null)

  useAutoFocus(buttonRef)

  // The result sounds as the panel appears (once, also under React's development double effect).
  const sounded = useRef(false)
  useEffect(() => {
    if (sounded.current) return
    sounded.current = true
    playSound(feedback.tone === 'positive' ? 'correct' : 'incorrect')
  }, [feedback.tone])

  return (
    <Surface
      as="dialog"
      tone="opaque"
      padding="md"
      accent={feedback.tone}
      className={styles.panel}
      aria-modal="true"
      aria-labelledby={feedback.title ? titleId : messageId}
      aria-describedby={feedback.title ? messageId : undefined}
      onKeyDown={(event) => {
        if (event.key === 'Escape') onClose()
      }}
    >
      <div className={styles.result}>
        <Icon name={feedback.tone === 'positive' ? 'correct' : 'incorrect'} size="md" />
        <div>
          {feedback.title && (
            <Text as="strong" weight="bold" id={titleId}>
              {feedback.title}
            </Text>
          )}
          <Text size="body-sm" id={messageId}>
            {feedback.message}
          </Text>
        </div>
      </div>
      <Button ref={buttonRef} onClick={onClose}>
        {closeLabel}
      </Button>
    </Surface>
  )
}
