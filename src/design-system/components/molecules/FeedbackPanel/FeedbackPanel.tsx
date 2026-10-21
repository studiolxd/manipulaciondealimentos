import { iconSource } from '../../../icons'
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

export function FeedbackPanel({ feedback }: FeedbackPanelProps) {
  return (
    <div className={styles.panel} aria-live="polite">
      {feedback && (
        <>
          <img
            className={styles.icon}
            src={iconSource(feedback.tone === 'positive' ? 'correct' : 'incorrect').src}
            alt=""
          />
          <p className={styles.text}>
            <strong>{feedback.title}</strong> {feedback.message}
          </p>
        </>
      )}
    </div>
  )
}
