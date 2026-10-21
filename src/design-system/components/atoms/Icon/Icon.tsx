import { iconSource } from '../../../icons'
import type { IconName } from '../../../icons.manifest'
import styles from './Icon.module.css'

interface IconProps {
  name: IconName
  /** `fill` takes the size of its container (e.g. inside a button). */
  size?: 'sm' | 'md' | 'lg' | 'fill'
}

// Interface icon. Always decorative: the control or text next to it carries the meaning.
export function Icon({ name, size = 'md' }: IconProps) {
  return <img className={styles.icon} data-size={size} src={iconSource(name).src} alt="" draggable={false} />
}
