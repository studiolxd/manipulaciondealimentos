import type { ReactNode } from 'react'
import { Surface } from '../../atoms/Surface/Surface'
import styles from './NarrationBox.module.css'

interface NarrationBoxProps {
  /** Optional shortcut, e.g. to skip a typing animation. Not a substitute for a real control. */
  onClick?: () => void
  /** Usually Text or Typewriter. */
  children: ReactNode
}

// Surface (ink) + text: the narrator's voice, a dark panel unlike the light speech bubbles.
export function NarrationBox({ onClick, children }: NarrationBoxProps) {
  return (
    <Surface tone="ink" padding="xl" className={onClick ? styles.clickable : undefined} onClick={onClick}>
      {children}
    </Surface>
  )
}
