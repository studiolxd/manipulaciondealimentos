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
  /** Nothing is shown while null; the live region stays in place so updates are announced. */
  feedback: Feedback | null
}

// Surface with a coloured side band + Icon + Text: the result shows before it is read.
export function FeedbackPanel({ feedback }: FeedbackPanelProps) {
  return (
    <div aria-live="polite">
      {feedback && (
        <Surface tone="opaque" padding="sm" accent={feedback.tone} className={styles.panel}>
          <Icon name={feedback.tone === 'positive' ? 'correct' : 'incorrect'} size="md" />
          <Text size="body-sm">
            <Text as="strong" size="body-sm" weight="bold">
              {feedback.title}
            </Text>{' '}
            {feedback.message}
          </Text>
        </Surface>
      )}
    </div>
  )
}
