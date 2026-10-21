import { useId } from 'react'
import type { ImageSource } from '../../../types'
import { ChoiceCard } from '../../molecules/ChoiceCard/ChoiceCard'
import { InlineAlert } from '../../molecules/InlineAlert/InlineAlert'
import styles from './ChoiceCardGroup.module.css'

export interface ChoiceCardOption<T extends string> {
  value: T
  label: string
  image?: ImageSource
}

interface ChoiceCardGroupProps<T extends string> {
  /** Group name, read by screen readers. */
  legend: string
  name: string
  options: ChoiceCardOption<T>[]
  value: T | null
  /** Display width of the images in stage pixels; the aspect ratio is kept. */
  imageWidth?: number
  /** Error shown and announced under the options. */
  error?: string | null
  onChange: (value: T) => void
}

// ChoiceCards + InlineAlert: single choice between large cards, with or without pictures.
export function ChoiceCardGroup<T extends string>({
  legend,
  name,
  options,
  value,
  imageWidth,
  error = null,
  onChange,
}: ChoiceCardGroupProps<T>) {
  const errorId = useId()
  return (
    <div className={styles.wrapper}>
      <fieldset className={styles.group} aria-describedby={error ? errorId : undefined}>
        <legend className={styles.legend}>{legend}</legend>
        {options.map((option) => (
          <ChoiceCard
            key={option.value}
            name={name}
            value={option.value}
            label={option.label}
            image={option.image}
            imageWidth={imageWidth}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
          />
        ))}
      </fieldset>
      <InlineAlert id={errorId} message={error} />
    </div>
  )
}
