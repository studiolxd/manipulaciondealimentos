import { Icon } from '../../atoms/Icon/Icon'
import { Text } from '../../atoms/Text/Text'
import styles from './InlineAlert.module.css'

interface InlineAlertProps {
  id?: string
  /** Empty while there is nothing to report; the alert region stays in place. */
  message: string | null
}

// Icon + Text. Error message announced as soon as it appears; the icon keeps
// it from relying on colour alone.
export function InlineAlert({ id, message }: InlineAlertProps) {
  return (
    <div id={id} className={styles.alert} role="alert">
      {message && (
        <>
          <Icon name="incorrect" size="sm" />
          <Text as="span" weight="bold" tone="negative">
            {message}
          </Text>
        </>
      )}
    </div>
  )
}
