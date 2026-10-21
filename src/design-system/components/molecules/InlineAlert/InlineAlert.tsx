import { Icon } from '../../atoms/Icon/Icon'
import { Surface } from '../../atoms/Surface/Surface'
import { Text } from '../../atoms/Text/Text'
import styles from './InlineAlert.module.css'

interface InlineAlertProps {
  id?: string
  /** Empty while there is nothing to report; the alert region stays in place. */
  message: string | null
}

// Surface + Icon + Text. Error message announced as soon as it appears; the
// icon keeps it from relying on colour alone, and the panel keeps it readable
// over any scene.
export function InlineAlert({ id, message }: InlineAlertProps) {
  return (
    <div id={id} className={styles.region} role="alert">
      {message && (
        <Surface tone="opaque" padding="sm" accent="negative" className={styles.alert}>
          <Icon name="incorrect" size="sm" />
          <Text as="span" weight="bold" tone="negative">
            {message}
          </Text>
        </Surface>
      )}
    </div>
  )
}
