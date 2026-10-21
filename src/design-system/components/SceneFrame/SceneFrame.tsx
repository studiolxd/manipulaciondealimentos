import { useEffect, useId, useRef, type ReactNode } from 'react'
import type { ImageSource } from '../../types'
import styles from './SceneFrame.module.css'

interface SceneFrameProps {
  heading: string
  /** Shows the heading on screen at this distance from the top; otherwise only screen readers get it. */
  visibleHeadingTop?: number
  background: ImageSource
  /** Empty for purely decorative backgrounds. */
  backgroundAlt: string
  /** Moves the focus to the heading, so screen readers announce the scene. */
  focusHeading?: boolean
  children?: ReactNode
}

// Common frame of every scene: full-stage background and its heading.
export function SceneFrame({
  heading,
  visibleHeadingTop,
  background,
  backgroundAlt,
  focusHeading = false,
  children,
}: SceneFrameProps) {
  const headingId = useId()
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (focusHeading) headingRef.current?.focus()
  }, [focusHeading])

  const visible = visibleHeadingTop !== undefined
  return (
    <section className={styles.scene} aria-labelledby={headingId}>
      <img className={styles.background} src={background.src} alt={backgroundAlt} />
      <h1
        id={headingId}
        ref={headingRef}
        tabIndex={-1}
        className={visible ? styles.heading : styles.hiddenHeading}
        style={visible ? { top: visibleHeadingTop } : undefined}
      >
        {heading}
      </h1>
      {children}
    </section>
  )
}
