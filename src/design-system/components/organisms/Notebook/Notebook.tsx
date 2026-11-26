import { Text } from '../../atoms/Text/Text'
import styles from './Notebook.module.css'

export type NotebookBlock =
  | { kind: 'title'; text: string }
  | { kind: 'text'; text: string }
  | { kind: 'list'; items: string[] }

interface NotebookProps {
  /** Accessible name, e.g. "Libreta de apuntes". */
  label: string
  /** Blocks of the left page; null leaves it blank. */
  left: NotebookBlock[] | null
  right: NotebookBlock[]
}

function blocks(content: NotebookBlock[]) {
  return content.map((block, index) => {
    if (block.kind === 'title') {
      return (
        <Text key={index} size="body-sm" weight="bold">
          {block.text}
        </Text>
      )
    }
    if (block.kind === 'list') {
      return (
        <ul key={index} className={styles.list}>
          {block.items.map((item) => (
            <li key={item}>
              <Text as="span" size="small">
                {item}
              </Text>
            </li>
          ))}
        </ul>
      )
    }
    return (
      <Text key={index} size="small">
        {block.text}
      </Text>
    )
  })
}

// Text on two pages of squared paper: an open notebook of notes to be read.
// Each page scrolls if its text does not fit.
export function Notebook({ label, left, right }: NotebookProps) {
  return (
    <article className={styles.notebook} aria-label={label}>
      <section className={styles.page}>{left && blocks(left)}</section>
      <section className={styles.page}>{blocks(right)}</section>
    </article>
  )
}
