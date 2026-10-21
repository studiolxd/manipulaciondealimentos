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
  children: ReactNode
}

// Full-stage container that groups content.
export function Layer({ layer = 'base', isolate = false, inert, children }: LayerProps) {
  return (
    <div className={styles.layer} data-layer={layer} data-isolate={isolate || undefined} inert={inert}>
      {children}
    </div>
  )
}
