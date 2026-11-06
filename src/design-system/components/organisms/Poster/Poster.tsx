import { Heading } from '../../atoms/Heading/Heading'
import { Surface } from '../../atoms/Surface/Surface'
import { Text } from '../../atoms/Text/Text'
import styles from './Poster.module.css'

interface PosterProps {
  title: string
  /** The message of the notice, in one line. */
  lead: string
  /** Heading of the list of things to look out for, and the list. */
  listTitle: string
  items: string[]
  /** Heading of the numbered steps to follow, and the steps. */
  stepsTitle: string
  steps: string[]
  /** Closing line. */
  footer: string
}

// Surface (paper) + Heading + Text: a printed notice made to be glanced at,
// e.g. the health poster on the changing-room wall. A banner with the message,
// what to look out for as tags, what to do as numbered steps, and a closing
// line. Real text, so screen readers get it as it is.
export function Poster({ title, lead, listTitle, items, stepsTitle, steps, footer }: PosterProps) {
  return (
    <Surface tone="paper" padding="lg" className={styles.poster}>
      <Heading level={2} align="center">
        {title}
      </Heading>
      <div className={styles.lead}>
        <Text weight="bold">{lead}</Text>
      </div>
      <div className={styles.columns}>
        <section className={styles.section}>
          <Heading level={3} variant="subheading">
            {listTitle}
          </Heading>
          <ul className={styles.tags}>
            {items.map((item) => (
              <li key={item} className={styles.tag}>
                <Text size="small" weight="bold">
                  {item}
                </Text>
              </li>
            ))}
          </ul>
        </section>
        <section className={styles.section}>
          <Heading level={3} variant="subheading">
            {stepsTitle}
          </Heading>
          <ol className={styles.steps}>
            {steps.map((step) => (
              <li key={step} className={styles.step}>
                <Text size="body-sm" weight="bold">
                  {step}
                </Text>
              </li>
            ))}
          </ol>
        </section>
      </div>
      <div className={styles.footer}>
        <Text size="body-sm" weight="bold" tone="inverse">
          {footer}
        </Text>
      </div>
    </Surface>
  )
}
