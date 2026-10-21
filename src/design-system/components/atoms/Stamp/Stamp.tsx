import type { ReactNode } from 'react'
import styles from './Stamp.module.css'

interface StampProps {
  tone: 'positive' | 'negative'
  children: ReactNode
}

// Rubber-stamp style mark, e.g. YES / NO over a card. Visual only.
export function Stamp({ tone, children }: StampProps) {
  return (
    <span className={styles.stamp} data-tone={tone} aria-hidden="true">
      {children}
    </span>
  )
}
