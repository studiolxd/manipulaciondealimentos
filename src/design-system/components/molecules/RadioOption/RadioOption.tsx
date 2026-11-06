import { useId } from 'react'
import { Radio } from '../../atoms/Radio/Radio'
import { Text } from '../../atoms/Text/Text'
import styles from './RadioOption.module.css'

interface RadioOptionProps {
  name: string
  value: string
  /** The answer, as a sentence. */
  label: string
  checked: boolean
  onChange: () => void
}

// Radio + Text: one answer of a single choice, written as a sentence. The
// visible circle fills in when it is chosen; the native radio keeps keyboard
// and screen reader behaviour.
export function RadioOption({ name, value, label, checked, onChange }: RadioOptionProps) {
  const id = useId()
  return (
    <label htmlFor={id} className={styles.option} data-checked={checked || undefined}>
      <Radio id={id} name={name} value={value} checked={checked} onChange={onChange} />
      <span className={styles.mark} aria-hidden="true" />
      <Text size="small">{label}</Text>
    </label>
  )
}
