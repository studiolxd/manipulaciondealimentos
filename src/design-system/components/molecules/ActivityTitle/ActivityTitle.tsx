import { Heading } from '../../atoms/Heading/Heading'
import { Surface } from '../../atoms/Surface/Surface'
import styles from './ActivityTitle.module.css'

interface ActivityTitleProps {
  title: string
  /** Called after the title has faded out. */
  onFinished: () => void
}

// Surface + Heading: large activity title that fades out after a while. It is
// visual only: the scene heading already gives the title to screen readers.
export function ActivityTitle({ title, onFinished }: ActivityTitleProps) {
  return (
    <div className={styles.title} aria-hidden="true" onAnimationEnd={onFinished}>
      <Surface tone="translucent" padding="xl">
        <Heading level={2} variant="display" align="center">
          {title}
        </Heading>
      </Surface>
    </div>
  )
}
