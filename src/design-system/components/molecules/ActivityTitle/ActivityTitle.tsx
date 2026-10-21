import { Heading } from '../../atoms/Heading/Heading'
import styles from './ActivityTitle.module.css'

interface ActivityTitleProps {
  title: string
  /** Called after the title has faded out. */
  onFinished: () => void
}

// Heading over the scene, like a game level title, that fades out after a
// while. It is visual only: the scene heading already gives the title to
// screen readers.
export function ActivityTitle({ title, onFinished }: ActivityTitleProps) {
  return (
    <div className={styles.title} aria-hidden="true" onAnimationEnd={onFinished}>
      <Heading level={2} variant="display" align="center" overlay>
        {title}
      </Heading>
    </div>
  )
}
