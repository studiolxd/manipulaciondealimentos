import type { ReactNode } from 'react'
import styles from './Text.module.css'

interface TextProps {
  as?: 'p' | 'span' | 'strong'
  /** `system`: messages outside the stage, in real pixels. */
  size?: 'body' | 'body-sm' | 'system'
  weight?: 'regular' | 'bold'
  /** `default` inherits the colour of its container. */
  tone?: 'default' | 'inverse' | 'positive' | 'negative'
  id?: string
  children: ReactNode
}

// Prose, in the body family (Atkinson Hyperlegible Next).
export function Text({ as: Element = 'p', size = 'body', weight = 'regular', tone = 'default', id, children }: TextProps) {
  return (
    <Element id={id} className={styles.text} data-size={size} data-weight={weight} data-tone={tone}>
      {children}
    </Element>
  )
}
