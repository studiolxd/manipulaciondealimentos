import { useEffect, useId, useRef, type ReactNode } from 'react'
import type { AssetId } from './assets'
import { assetUrl } from './assetUrl'
import { useGame } from './gameContext'

interface SceneProps {
  heading: string
  /** Shows the heading on screen; otherwise only screen readers get it. */
  headingClassName?: string
  background: AssetId
  /** Empty for purely decorative backgrounds. */
  backgroundAlt: string
  className?: string
  children?: ReactNode
}

// Common frame of every scene: full-stage background and a heading that
// receives focus once the fade-in ends, so screen readers announce the scene.
export function Scene({ heading, headingClassName, background, backgroundAlt, className, children }: SceneProps) {
  const { sceneReady } = useGame()
  const headingId = useId()
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (sceneReady) headingRef.current?.focus()
  }, [sceneReady])

  return (
    <section className={`scene ${className ?? ''}`} aria-labelledby={headingId}>
      <img className="scene__background" src={assetUrl(background)} alt={backgroundAlt} />
      <h1 id={headingId} ref={headingRef} tabIndex={-1} className={headingClassName ?? 'visually-hidden'}>
        {heading}
      </h1>
      {children}
    </section>
  )
}
