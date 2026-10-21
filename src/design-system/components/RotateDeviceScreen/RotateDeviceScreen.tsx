import { useEffect, useRef } from 'react'
import { iconSource } from '../../icons'
import styles from './RotateDeviceScreen.module.css'

interface RotateDeviceScreenProps {
  title: string
  message: string
}

// Full-window message shown while the screen is taller than it is wide. It
// lives outside the stage, so it uses real screen sizes.
export function RotateDeviceScreen({ title, message }: RotateDeviceScreenProps) {
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  return (
    <dialog open className={styles.screen} aria-modal="true" aria-labelledby="rotate-title" aria-describedby="rotate-message">
      <img className={styles.icon} src={iconSource('rotateDevice').src} alt="" />
      <h2 id="rotate-title" className={styles.title} ref={headingRef} tabIndex={-1}>
        {title}
      </h2>
      <p id="rotate-message" className={styles.message}>
        {message}
      </p>
    </dialog>
  )
}
