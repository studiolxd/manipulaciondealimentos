import styles from './Radio.module.css'

interface RadioProps {
  id?: string
  name: string
  value: string
  checked: boolean
  onChange: () => void
}

// Native radio button, visually hidden: the surrounding label shows the choice
// and its focus. Keyboard and screen reader behaviour stay native.
export function Radio({ id, name, value, checked, onChange }: RadioProps) {
  return <input id={id} type="radio" className={styles.radio} name={name} value={value} checked={checked} onChange={onChange} />
}
