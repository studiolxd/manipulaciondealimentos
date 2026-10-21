import { useAutoFocus } from '@studiolxd/tramoya'
import { useId, useRef } from 'react'
import { Heading } from '../../atoms/Heading/Heading'
import { Icon } from '../../atoms/Icon/Icon'
import styles from './RotateDeviceScreen.module.css'

interface RotateDeviceScreenProps {
  title: string
}

// Icon + Heading: full-window screen shown while the screen is taller than it
// is wide. It lives outside the stage, so it uses real screen sizes.
export function RotateDeviceScreen({ title }: RotateDeviceScreenProps) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const titleId = useId()

  useAutoFocus(headingRef)

  return (
    <dialog open className={styles.screen} aria-modal="true" aria-labelledby={titleId}>
      <Icon name="rotateDevice" size="lg" animated />
      <Heading level={2} variant="system" align="center" id={titleId} ref={headingRef} focusable>
        {title}
      </Heading>
    </dialog>
  )
}
