import type { ReactNode, Ref } from 'react'
import styles from './Heading.module.css'

interface HeadingProps {
  level: 1 | 2 | 3
  /** `display`: activity titles. `heading`: scene headings. `subheading`: names. `system`: messages outside the stage. */
  variant?: 'display' | 'heading' | 'subheading' | 'system'
  align?: 'start' | 'center'
  /** Straight over the scene, without a panel: light text with an ink outline and a hard shadow. */
  overlay?: boolean
  /** Only for screen readers. */
  visuallyHidden?: boolean
  /** Lets the heading receive focus programmatically (e.g. when a scene starts). */
  focusable?: boolean
  id?: string
  ref?: Ref<HTMLHeadingElement>
  children: ReactNode
}

// Titles, in the display family (Roboto).
export function Heading({
  level,
  variant = 'heading',
  align = 'start',
  overlay = false,
  visuallyHidden = false,
  focusable = false,
  id,
  ref,
  children,
}: HeadingProps) {
  const Element = `h${level}` as const
  return (
    <Element
      id={id}
      ref={ref}
      tabIndex={focusable ? -1 : undefined}
      className={visuallyHidden ? styles.hidden : styles.heading}
      data-variant={variant}
      data-align={align}
      data-overlay={overlay || undefined}
    >
      {children}
    </Element>
  )
}
