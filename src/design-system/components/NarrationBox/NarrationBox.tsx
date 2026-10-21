import type { ReactNode } from 'react'
import styles from './NarrationBox.module.css'

interface NarrationBoxProps {
  /** Optional shortcut, e.g. to skip a typing animation. Not a substitute for a real control. */
  onClick?: () => void
  children: ReactNode
}

// Panel for narrator text over a scene.
export function NarrationBox({ onClick, children }: NarrationBoxProps) {
  return (
    // oxlint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div className={styles.box} data-clickable={onClick ? true : undefined} onClick={onClick}>
      {children}
    </div>
  )
}
