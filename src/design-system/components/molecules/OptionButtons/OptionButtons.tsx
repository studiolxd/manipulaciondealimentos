import { Button } from '../../atoms/Button/Button'
import styles from './OptionButtons.module.css'

export interface OptionButton<T extends string> {
  value: T
  label: string
}

interface OptionButtonsProps<T extends string> {
  /** Group name, read by screen readers. */
  label: string
  options: OptionButton<T>[]
  onSelect: (value: T) => void
}

// Buttons: a single choice that acts as soon as an option is pressed, with no
// separate confirm button.
export function OptionButtons<T extends string>({ label, options, onSelect }: OptionButtonsProps<T>) {
  return (
    <fieldset className={styles.group}>
      <legend className={styles.legend}>{label}</legend>
      {options.map((option) => (
        <Button key={option.value} variant="secondary" onClick={() => onSelect(option.value)}>
          {option.label}
        </Button>
      ))}
    </fieldset>
  )
}
