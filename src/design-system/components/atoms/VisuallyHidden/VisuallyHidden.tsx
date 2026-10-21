import type { ReactNode } from 'react'
import styles from './VisuallyHidden.module.css'

interface VisuallyHiddenProps {
  as?: 'span' | 'p'
  id?: string
  children: ReactNode
}

// Content for assistive technology only.
export function VisuallyHidden({ as: Element = 'span', id, children }: VisuallyHiddenProps) {
  return (
    <Element id={id} className={styles.hidden}>
      {children}
    </Element>
  )
}
