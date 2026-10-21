import type { CSSProperties, ReactNode } from 'react'
import type { StageLayer } from '../../../types'
import styles from './Positioned.module.css'

interface PositionedProps {
  /** Distances and sizes in stage pixels (the stage is 1920×1080). */
  top?: number
  right?: number
  bottom?: number
  left?: number
  width?: number
  height?: number
  /** Centres the box on that axis; the matching offsets are ignored. */
  center?: 'x' | 'y' | 'both'
  layer?: StageLayer
  children: ReactNode
}

// Places its content on the stage. Scenes compose their layout with it
// instead of writing CSS.
export function Positioned({ top, right, bottom, left, width, height, center, layer = 'base', children }: PositionedProps) {
  const centerX = center === 'x' || center === 'both'
  const centerY = center === 'y' || center === 'both'
  const style: CSSProperties = {
    top: centerY ? '50%' : top,
    right: centerX ? undefined : right,
    bottom: centerY ? undefined : bottom,
    left: centerX ? '50%' : left,
    width,
    height,
    translate: `${centerX ? '-50%' : '0'} ${centerY ? '-50%' : '0'}`,
  }
  return (
    <div className={styles.positioned} data-layer={layer} style={style}>
      {children}
    </div>
  )
}
