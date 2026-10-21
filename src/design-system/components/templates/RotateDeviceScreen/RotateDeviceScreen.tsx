import { useEffect, useId, useRef } from 'react'
import { Heading } from '../../atoms/Heading/Heading'
import { Icon } from '../../atoms/Icon/Icon'
import { Text } from '../../atoms/Text/Text'
import styles from './RotateDeviceScreen.module.css'

interface RotateDeviceScreenProps {
  title: string
  message: string
}

// Icon + Heading + Text: full-window screen shown while the screen is taller
// than it is wide. It lives outside the stage, so it uses real screen sizes.
export function RotateDeviceScreen({ title, message }: RotateDeviceScreenProps) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const titleId = useId()
  const messageId = useId()

  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  return (
    <dialog open className={styles.screen} aria-modal="true" aria-labelledby={titleId} aria-describedby={messageId}>
      <Icon name="rotateDevice" size="lg" />
      <Heading level={2} variant="system" align="center" id={titleId} ref={headingRef} focusable>
        {title}
      </Heading>
      <div className={styles.message}>
        <Text id={messageId} size="system">
          {message}
        </Text>
      </div>
    </dialog>
  )
}
