import type { HTMLAttributes, ReactNode, Ref } from 'react'
import styles from './Surface.module.css'

interface SurfaceProps extends Omit<HTMLAttributes<HTMLElement>, 'className' | 'style'> {
  /** `dialog` renders a non-modal <dialog open>; the caller handles modality. */
  as?: 'div' | 'dialog'
  /** `opaque`: light panels (bubbles, dialogs, cards). `ink`: dark panels (narrator). `paper`: printed objects (ID cards). */
  tone?: 'opaque' | 'ink' | 'paper'
  padding?: 'sm' | 'md' | 'lg' | 'xl'
  /** Marks the surface as selected with an extra ring. */
  highlighted?: boolean
  /** Coloured band on the leading edge, e.g. for right / wrong feedback. */
  accent?: 'positive' | 'negative'
  /** Speech tail pointing to whoever speaks. */
  tail?: 'left' | 'right' | 'bottom'
  /** Name used to morph the surface into another element (see withViewTransition). */
  viewTransitionName?: string
  /** Layout of the content, for design system components only. */
  className?: string
  ref?: Ref<HTMLDivElement & HTMLDialogElement>
  children?: ReactNode
}

// Base panel of the design system: background, ink outline, radius, hard shadow and padding.
export function Surface({
  as: Element = 'div',
  tone = 'opaque',
  padding = 'md',
  highlighted = false,
  accent,
  tail,
  viewTransitionName,
  className,
  ref,
  children,
  ...rest
}: SurfaceProps) {
  return (
    <Element
      {...rest}
      ref={ref}
      open={Element === 'dialog' ? true : undefined}
      className={`${styles.surface} ${className ?? ''}`}
      data-tone={tone}
      data-padding={padding}
      data-highlighted={highlighted || undefined}
      data-accent={accent}
      data-tail={tail}
      style={{ viewTransitionName }}
    >
      {children}
    </Element>
  )
}
