import type { ReactNode } from 'react'
import styles from './Text.module.css'

interface TextProps {
  as?: 'p' | 'span' | 'strong'
  size?: 'body' | 'body-sm'
  weight?: 'regular' | 'bold'
  id?: string
  children: ReactNode
}

export function Text({ as: Element = 'p', size = 'body', weight = 'regular', id, children }: TextProps) {
  return (
    <Element id={id} className={styles.text} data-size={size} data-weight={weight}>
      {children}
    </Element>
  )
}
