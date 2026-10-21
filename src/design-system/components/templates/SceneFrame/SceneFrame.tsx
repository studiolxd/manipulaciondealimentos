import { useAutoFocus } from '@studiolxd/tramoya'
import { useId, useRef, type ReactNode } from 'react'
import type { ImageSource } from '../../../types'
import { Heading } from '../../atoms/Heading/Heading'
import { Image } from '../../atoms/Image/Image'
import { Positioned } from '../../layout/Positioned/Positioned'
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

// Image + Heading: common frame of every scene, a full-stage background and its heading.
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

  useAutoFocus(headingRef, { when: focusHeading })

  const title = (
    <Heading
      level={1}
      id={headingId}
      ref={headingRef}
      focusable
      align="center"
      overlay
      visuallyHidden={visibleHeadingTop === undefined}
    >
      {heading}
    </Heading>
  )

  return (
    <section className={styles.scene} aria-labelledby={headingId}>
      <div className={styles.background}>
        <Image source={background} alt={backgroundAlt} fit="cover" />
      </div>
      {visibleHeadingTop === undefined ? (
        title
      ) : (
        <Positioned top={visibleHeadingTop} left={0} width={1920}>
          {title}
        </Positioned>
      )}
      {children}
    </section>
  )
}
