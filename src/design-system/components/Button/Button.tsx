import { useEffect, useRef, type ReactNode } from 'react'
import styles from './Button.module.css'

interface ButtonProps {
  /** `primary`: main call to action. `choice-positive` / `choice-negative`: large YES / NO answers. */
  variant?: 'primary' | 'choice-positive' | 'choice-negative'
  /**
   * Takes the focus when it appears if nothing else has it (e.g. the control
   * that had it just disappeared), so keyboard and screen reader users do not
   * lose their place.
   */
  claimFocus?: boolean
  /** Accessible name when it must say more than the visible text; it must start with that text. */
  'aria-label'?: string
  onClick: () => void
  children: ReactNode
}

export function Button({ variant = 'primary', claimFocus = false, onClick, children, ...aria }: ButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (claimFocus && (!document.activeElement || document.activeElement === document.body)) ref.current?.focus()
  }, [claimFocus])

  return (
    <button ref={ref} type="button" className={styles.button} data-variant={variant} onClick={onClick} {...aria}>
      {children}
    </button>
  )
}
