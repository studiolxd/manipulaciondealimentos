import type { ReactNode } from 'react'
import { Surface } from '../../atoms/Surface/Surface'
import styles from './NarrationBox.module.css'

interface NarrationBoxProps {
  /** Optional shortcut, e.g. to skip a typing animation. Not a substitute for a real control. */
  onClick?: () => void
  /** Usually Text or Typewriter. */
  children: ReactNode
}

// Surface + text: narrator panel over a scene.
export function NarrationBox({ onClick, children }: NarrationBoxProps) {
  return (
    <Surface tone="translucent" padding="xl" className={onClick ? styles.clickable : undefined} onClick={onClick}>
      {children}
    </Surface>
  )
}
