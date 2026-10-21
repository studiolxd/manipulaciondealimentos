import type { MouseEvent, Ref } from 'react'
import { iconSource } from '../../../icons'
import type { IconName } from '../../../icons.manifest'
import styles from './IconButton.module.css'

interface IconButtonProps {
  icon: IconName
  /** Accessible name; the icon itself is decorative. */
  label: string
  /** Set when the button opens a dialog. */
  opensDialog?: boolean
  /** Hides the button while it has turned into another element (see withViewTransition). */
  concealed?: boolean
  viewTransitionName?: string
  ref?: Ref<HTMLButtonElement>
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
}

export function IconButton({ icon, label, opensDialog, concealed, viewTransitionName, ref, onClick }: IconButtonProps) {
  return (
    <button
      ref={ref}
      type="button"
      className={styles.button}
      aria-label={label}
      aria-haspopup={opensDialog ? 'dialog' : undefined}
      data-concealed={concealed || undefined}
      style={{ viewTransitionName: concealed ? undefined : viewTransitionName }}
      onClick={onClick}
    >
      <img className={styles.icon} src={iconSource(icon).src} alt="" />
    </button>
  )
}
