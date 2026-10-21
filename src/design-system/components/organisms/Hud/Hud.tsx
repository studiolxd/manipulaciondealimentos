import type { ReactNode } from 'react'
import styles from './Hud.module.css'

interface HudProps {
  /** Controls on the left, e.g. the statement IconButton. */
  start?: ReactNode
  /** Information on the right, e.g. a progress Label. */
  end?: ReactNode
}

// Top band of the game: dark glass over the scene, with slots for controls.
export function Hud({ start, end }: HudProps) {
  return (
    <div className={styles.hud}>
      <div className={styles.slot}>{start}</div>
      <div className={styles.slot}>{end}</div>
    </div>
  )
}
