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
  /** Choosing an option takes the player to another scene (see Button `advance`). */
  advance?: boolean
  /** Lets the options wrap onto several rows when there are many. */
  wrap?: boolean
  onSelect: (value: T) => void
}

// Buttons: a single choice that acts as soon as an option is pressed, with no
// separate confirm button.
export function OptionButtons<T extends string>({
  label,
  options,
  advance = false,
  wrap = false,
  onSelect,
}: OptionButtonsProps<T>) {
  return (
    <fieldset className={styles.group} data-wrap={wrap || undefined}>
      <legend className={styles.legend}>{label}</legend>
      {options.map((option) => (
        <Button key={option.value} variant="secondary" advance={advance} onClick={() => onSelect(option.value)}>
          {option.label}
        </Button>
      ))}
    </fieldset>
  )
}
