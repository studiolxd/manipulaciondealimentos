import { useId, type ComponentProps } from 'react'
import { Label } from '../../atoms/Label/Label'
import { TextInput } from '../../atoms/TextInput/TextInput'
import styles from './TextField.module.css'

type TextFieldProps = Omit<ComponentProps<typeof TextInput>, 'id'> & {
  /** Visible label, always present (placeholders are not labels). */
  label: string
}

// Label + TextInput.
export function TextField({ label, ...input }: TextFieldProps) {
  const id = useId()
  return (
    <div className={styles.field}>
      <label htmlFor={id}>
        <Label>{label}</Label>
      </label>
      <TextInput id={id} {...input} />
    </div>
  )
}
