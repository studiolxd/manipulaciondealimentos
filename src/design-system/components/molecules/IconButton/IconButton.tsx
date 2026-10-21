import type { MouseEvent, Ref } from 'react'
import type { IconName } from '../../../icons.manifest'
import { Button } from '../../atoms/Button/Button'
import { Icon } from '../../atoms/Icon/Icon'

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

// Button + Icon.
export function IconButton({ icon, label, opensDialog, concealed, viewTransitionName, ref, onClick }: IconButtonProps) {
  return (
    <Button
      variant="icon"
      aria-label={label}
      aria-haspopup={opensDialog ? 'dialog' : undefined}
      concealed={concealed}
      viewTransitionName={viewTransitionName}
      ref={ref}
      onClick={onClick}
    >
      <Icon name={icon} size="fill" />
    </Button>
  )
}
