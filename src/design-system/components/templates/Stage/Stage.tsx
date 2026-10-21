import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import styles from './Stage.module.css'

export const STAGE_WIDTH = 1920
export const STAGE_HEIGHT = 1080

interface StageProps {
  /** `viewport` fills the window (the game); `container` fills its parent at 16:9 (docs, previews). */
  fit?: 'viewport' | 'container'
  /** Renders the stage as the page's main landmark. */
  landmark?: boolean
  inert?: boolean
  /** Black curtain over the scene, used to fade between scenes. The scene is inert while it is closed. */
  curtainClosed?: boolean
  children: ReactNode
}

// Fixed 1920×1080 canvas scaled to fit, letterboxed when the aspect ratio
// differs. Everything inside is laid out in stage pixels; --slxd-stage-scale
// lets tokens turn real screen minimums into stage pixels.
export function Stage({ fit = 'viewport', landmark = true, inert, curtainClosed = false, children }: StageProps) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useLayoutEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setScale(Math.min(width / STAGE_WIDTH, height / STAGE_HEIGHT))
    })
    observer.observe(viewport)
    return () => observer.disconnect()
  }, [])

  const Canvas = landmark ? 'main' : 'div'
  return (
    <div className={styles.viewport} data-fit={fit} ref={viewportRef} inert={inert}>
      <Canvas className={styles.stage} style={{ '--slxd-stage-scale': scale } as CSSProperties}>
        {/* Own stacking context, so nothing in the scene rises above the curtain. */}
        <div className={styles.scene} inert={curtainClosed}>
          {children}
        </div>
        <div className={styles.curtain} data-closed={curtainClosed || undefined} aria-hidden="true" />
      </Canvas>
    </div>
  )
}
