import type { ReactNode } from 'react'
import { Surface } from '../../atoms/Surface/Surface'
import styles from './NarrationBox.module.css'

interface NarrationBoxProps {
  /** Optional shortcut, e.g. to skip a typing animation. Not a substitute for a real control. */
  onClick?: () => void
  /** Usually Text or Typewriter. */
  children: ReactNode
}

// Surface (white) + text: the narrator's voice, with no tail, unlike the speech bubbles.
export function NarrationBox({ onClick, children }: NarrationBoxProps) {
  return (
    <Surface tone="opaque" padding="xl" className={onClick ? styles.clickable : undefined} onClick={onClick}>
      {children}
    </Surface>
  )
}
