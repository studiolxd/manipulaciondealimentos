import type { Ref } from 'react'
import styles from './TextInput.module.css'

interface TextInputProps {
  id: string
  value: string
  onChange: (value: string) => void
  /** Called when the player presses Enter, e.g. to submit. */
  onEnter?: () => void
  /** Id of a message that describes the field, e.g. an error. */
  describedBy?: string
  invalid?: boolean
  autoComplete?: string
  maxLength?: number
  ref?: Ref<HTMLInputElement>
}

// Single-line text field.
export function TextInput({ id, value, onChange, onEnter, describedBy, invalid, autoComplete, maxLength, ref }: TextInputProps) {
  return (
    <input
      ref={ref}
      id={id}
      type="text"
      className={styles.input}
      value={value}
      autoComplete={autoComplete}
      maxLength={maxLength}
      aria-describedby={describedBy}
      aria-invalid={invalid || undefined}
      onChange={(event) => onChange(event.target.value)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' && onEnter) {
          event.preventDefault()
          onEnter()
        }
      }}
    />
  )
}
