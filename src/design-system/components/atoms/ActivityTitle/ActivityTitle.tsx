import styles from './ActivityTitle.module.css'

interface ActivityTitleProps {
  title: string
  /** Called after the title has faded out. */
  onFinished: () => void
}

// Large activity title that fades out after a while. It is visual only:
// the scene heading already gives the title to screen readers.
export function ActivityTitle({ title, onFinished }: ActivityTitleProps) {
  return (
    <p className={styles.title} aria-hidden="true" onAnimationEnd={onFinished}>
      {title}
    </p>
  )
}
