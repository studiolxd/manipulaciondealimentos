import type { ReactNode } from 'react'
import type { StageLayer } from '../../../types'
import styles from './Layer.module.css'

interface LayerProps {
  /** Stacking order among its siblings. */
  layer?: StageLayer
  /** Keeps everything inside within its own stacking context. */
  isolate?: boolean
  /** Makes the content unreachable (e.g. behind a dialog or during a fade). */
  inert?: boolean
  /** Covers the stage with translucent white that blocks the pointer, behind a modal panel. */
  backdrop?: boolean
  children: ReactNode
}

// Full-stage container that groups content.
export function Layer({ layer = 'base', isolate = false, inert, backdrop = false, children }: LayerProps) {
  return (
    <div
      className={styles.layer}
      data-layer={layer}
      data-isolate={isolate || undefined}
      data-backdrop={backdrop || undefined}
      inert={inert}
    >
      {children}
    </div>
  )
}
