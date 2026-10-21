import { useAutoFocus } from '@studiolxd/tramoya'
import { useId, useRef } from 'react'
import { Button } from '../../atoms/Button/Button'
import { Icon } from '../../atoms/Icon/Icon'
import { Surface } from '../../atoms/Surface/Surface'
import { Text } from '../../atoms/Text/Text'
import styles from './FeedbackPanel.module.css'

export interface Feedback {
  tone: 'positive' | 'negative'
  /** Short verdict shown in bold, e.g. "¡Correcto!". */
  title: string
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
// The button takes the focus; Escape also closes it. The caller puts it over a
// backdrop and makes the rest inert.
export function FeedbackPanel({ feedback, closeLabel, onClose }: FeedbackPanelProps) {
  const titleId = useId()
  const messageId = useId()
  const buttonRef = useRef<HTMLButtonElement>(null)

  useAutoFocus(buttonRef)

  return (
    <Surface
      as="dialog"
      tone="opaque"
      padding="md"
      accent={feedback.tone}
      className={styles.panel}
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={messageId}
      onKeyDown={(event) => {
        if (event.key === 'Escape') onClose()
      }}
    >
      <div className={styles.result}>
        <Icon name={feedback.tone === 'positive' ? 'correct' : 'incorrect'} size="md" />
        <div>
          <Text as="strong" weight="bold" id={titleId}>
            {feedback.title}
          </Text>
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
