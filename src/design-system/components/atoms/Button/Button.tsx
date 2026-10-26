import { useAutoFocus } from '@studiolxd/tramoya'
import { useRef, type MouseEvent, type ReactNode, type Ref } from 'react'
import { playSound } from '../../../sounds'
import styles from './Button.module.css'

interface ButtonProps {
  /**
   * `primary`: main call to action. `secondary`: light options that act straight
   * away (use OptionButtons). `choice-positive` / `choice-negative`: large
   * YES / NO answers. `icon`: square icon-only button (use IconButton).
   * `bare`: no look of its own, for pressable content built from other
   * components (e.g. MediaTile). `option`: an item written as a sentence that
   * the player picks or drags (e.g. a rule in HotspotMatch); `option-done`,
   * the same once placed correctly.
   */
  variant?:
    | 'primary'
    | 'secondary'
    | 'choice-positive'
    | 'choice-negative'
    | 'icon'
    | 'icon-compact'
    | 'bare'
    | 'option'
    | 'option-done'
  /**
   * Takes the focus when it appears if nothing else has it (e.g. the control
   * that had it just disappeared), so keyboard and screen reader users do not
   * lose their place.
   */
  claimFocus?: boolean
  /**
   * The button takes the player to another scene. Rule of the design system:
   * these buttons always enter sliding up while they fade in, so moving on
   * looks the same everywhere. Render them once the scene can be seen.
   */
  advance?: boolean
  /** Does not play the click, e.g. a button that plays another sound itself. */
  silent?: boolean
  /** Accessible name when it must say more than the visible text; it must start with that text. */
  'aria-label'?: string
  'aria-haspopup'?: 'dialog'
  /** Hidden but kept in place, e.g. while it has turned into another element. */
  concealed?: boolean
  /** Can no longer be pressed, e.g. something already done. */
  disabled?: boolean
  /** Selected as a toggle (aria-pressed), e.g. the item about to be placed. */
  pressed?: boolean
  /** Name used to morph the button into another element (see withViewTransition). */
  viewTransitionName?: string
  ref?: Ref<HTMLButtonElement>
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
  children: ReactNode
}

export function Button({
  variant = 'primary',
  claimFocus = false,
  advance = false,
  silent = false,
  concealed = false,
  disabled = false,
  pressed,
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
      data-advance={advance || undefined}
      data-concealed={concealed || undefined}
      disabled={disabled}
      aria-pressed={pressed}
      style={{ viewTransitionName: concealed ? undefined : viewTransitionName }}
      onClick={(event) => {
        if (!silent) playSound('click')
        onClick(event)
      }}
    >
      {children}
    </button>
  )
}
