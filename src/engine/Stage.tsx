import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

export const STAGE_WIDTH = 1920
export const STAGE_HEIGHT = 1080

interface StageProps {
  inert?: boolean
  children: ReactNode
}

// Fixed 1920×1080 canvas scaled to fit the viewport, letterboxed when the
// aspect ratio differs. Everything inside is laid out in stage pixels;
// --stage-scale lets CSS convert real screen pixels back into stage pixels.
export function Stage({ inert, children }: StageProps) {
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

  return (
    <div className="stage-viewport" ref={viewportRef} inert={inert}>
      <main className="stage" style={{ '--stage-scale': scale } as CSSProperties}>
        {children}
      </main>
    </div>
  )
}
