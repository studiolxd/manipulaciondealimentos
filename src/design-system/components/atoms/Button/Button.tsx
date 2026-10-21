import { useAutoFocus } from '@studiolxd/tramoya'
import { useRef, type MouseEvent, type ReactNode, type Ref } from 'react'
import styles from './Button.module.css'

interface ButtonProps {
  /**
   * `primary`: main call to action. `secondary`: light options that act straight
   * away (use OptionButtons). `choice-positive` / `choice-negative`: large
   * YES / NO answers. `icon`: round icon-only button (use IconButton).
   */
  variant?: 'primary' | 'secondary' | 'choice-positive' | 'choice-negative' | 'icon'
  /**
   * Takes the focus when it appears if nothing else has it (e.g. the control
   * that had it just disappeared), so keyboard and screen reader users do not
   * lose their place.
   */
  claimFocus?: boolean
  /** Accessible name when it must say more than the visible text; it must start with that text. */
  'aria-label'?: string
  'aria-haspopup'?: 'dialog'
  /** Hidden but kept in place, e.g. while it has turned into another element. */
  concealed?: boolean
  /** Name used to morph the button into another element (see withViewTransition). */
  viewTransitionName?: string
  ref?: Ref<HTMLButtonElement>
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
  children: ReactNode
}

export function Button({
  variant = 'primary',
  claimFocus = false,
  concealed = false,
  viewTransitionName,
  ref,
  onClick,
  children,
  ...aria
}: ButtonProps) {
  const ownRef = useRef<HTMLButtonElement>(null)

  useAutoFocus(ownRef, { when: claimFocus, onlyIfNothingFocused: true })

  return (
    <button
      {...aria}
      ref={(element) => {
        ownRef.current = element
        if (typeof ref === 'function') ref(element)
        else if (ref) ref.current = element
      }}
      type="button"
      className={styles.button}
      data-variant={variant}
      data-concealed={concealed || undefined}
      style={{ viewTransitionName: concealed ? undefined : viewTransitionName }}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
