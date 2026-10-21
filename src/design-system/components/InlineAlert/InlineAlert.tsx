import styles from './InlineAlert.module.css'

interface InlineAlertProps {
  id?: string
  /** Empty while there is nothing to report; the alert region stays in place. */
  message: string | null
}

// Error message announced as soon as it appears.
export function InlineAlert({ id, message }: InlineAlertProps) {
  return (
    <p id={id} className={styles.alert} role="alert">
      {message ?? ''}
    </p>
  )
}
