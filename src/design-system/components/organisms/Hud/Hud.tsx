import type { ReactNode } from 'react'
import { iconSource } from '../../../icons'
import { Image } from '../../atoms/Image/Image'
import styles from './Hud.module.css'

interface HudProps {
  /** Controls on the left, e.g. the statement IconButton. */
  start?: ReactNode
  /** Information on the right, e.g. a progress Label. */
  end?: ReactNode
}

// Image + slots: top band of the game, over the scene.
export function Hud({ start, end }: HudProps) {
  return (
    <div className={styles.hud}>
      <div className={styles.bar}>
        <Image source={iconSource('hudBar')} alt="" fit="cover" />
      </div>
      <div className={styles.start}>{start}</div>
      <div className={styles.end}>{end}</div>
    </div>
  )
}
