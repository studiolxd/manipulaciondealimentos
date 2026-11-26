import type { ReactNode } from 'react'
import styles from './TabletFrame.module.css'

interface TabletFrameProps {
  /** What the screen shows: a gallery, a video, an activity… */
  children: ReactNode
  /** Without the bezel: only the screen, for when the tablet is already drawn in the scene. */
  bare?: boolean
}

// A tablet seen from the front: an ink bezel around a screen. It fills its
// container, and its content is laid out inside the screen.
export function TabletFrame({ children, bare = false }: TabletFrameProps) {
  return (
    <div className={styles.tablet} data-bare={bare || undefined}>
      <div className={styles.screen}>{children}</div>
    </div>
  )
}
