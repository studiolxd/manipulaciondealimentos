import type { ReactNode } from 'react'
import styles from './Label.module.css'

interface LabelProps {
  size?: 'md' | 'lg'
  /** `inverse` over dark backgrounds such as the HUD. */
  tone?: 'default' | 'inverse'
  children: ReactNode
}

// Short text in the display family (Roboto): counters, option names, labels.
export function Label({ size = 'md', tone = 'default', children }: LabelProps) {
  return (
    <span className={styles.label} data-size={size} data-tone={tone}>
      {children}
    </span>
  )
}
