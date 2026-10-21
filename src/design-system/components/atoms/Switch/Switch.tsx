import { playSound } from '../../../sounds'
import styles from './Switch.module.css'

interface SwitchProps {
  /** Visible name of the setting, e.g. "Sonidos FX". */
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

// On / off setting: the name and a track with a thumb, in the style of the
// buttons (ink outline and hard shadow; mint when on). The whole row is one
// control, so the name is also its accessible name.
export function Switch({ label, checked, onChange }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      className={styles.switch}
      onClick={() => {
        playSound('click')
        onChange(!checked)
      }}
    >
      <span className={styles.label}>{label}</span>
      <span className={styles.track} aria-hidden="true">
        <span className={styles.thumb} />
      </span>
    </button>
  )
}
