import type { ReactNode } from 'react'
import styles from './HudLabel.module.css'

// Text shown inside the HUD band, e.g. a progress counter.
export function HudLabel({ children }: { children: ReactNode }) {
  return <p className={styles.label}>{children}</p>
}
