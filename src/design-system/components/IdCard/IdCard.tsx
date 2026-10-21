import type { ImageSource } from '../../types'
import styles from './IdCard.module.css'

interface IdCardProps {
  name: string
  job: string
  description: string
  portrait: ImageSource
}

// ID-card layout: details on the left, head-to-chest portrait on the right.
// It fills its parent.
export function IdCard({ name, job, description, portrait }: IdCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.details}>
        <p className={styles.name}>{name}</p>
        <p className={styles.job}>{job}</p>
        <p className={styles.description}>{description}</p>
      </div>
      <img className={styles.portrait} src={portrait.src} width={portrait.width} height={portrait.height} alt="" draggable={false} />
    </div>
  )
}
