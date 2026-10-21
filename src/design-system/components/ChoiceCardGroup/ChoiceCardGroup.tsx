import type { ImageSource } from '../../types'
import styles from './ChoiceCardGroup.module.css'

export interface ChoiceCardOption<T extends string> {
  value: T
  label: string
  image: ImageSource
}

interface ChoiceCardGroupProps<T extends string> {
  /** Group name, read by screen readers. */
  legend: string
  name: string
  options: ChoiceCardOption<T>[]
  value: T | null
  /** Id of a message (e.g. an error) that describes the group. */
  describedBy?: string
  /** Display width of the images in stage pixels; the aspect ratio is kept. */
  imageWidth?: number
  onChange: (value: T) => void
}

// Single choice between large picture cards (native radio buttons).
export function ChoiceCardGroup<T extends string>({
  legend,
  name,
  options,
  value,
  describedBy,
  imageWidth,
  onChange,
}: ChoiceCardGroupProps<T>) {
  return (
    <fieldset className={styles.group} aria-describedby={describedBy}>
      <legend className={styles.legend}>{legend}</legend>
      {options.map((option) => (
        <label key={option.value} className={styles.card}>
          <input
            type="radio"
            className={styles.input}
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
          />
          <img
            className={styles.image}
            src={option.image.src}
            width={imageWidth ?? option.image.width}
            height={Math.round(((imageWidth ?? option.image.width) / option.image.width) * option.image.height)}
            alt=""
          />
          <span>{option.label}</span>
        </label>
      ))}
    </fieldset>
  )
}
