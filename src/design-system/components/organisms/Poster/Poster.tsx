import { Heading } from '../../atoms/Heading/Heading'
import { Surface } from '../../atoms/Surface/Surface'
import { Text } from '../../atoms/Text/Text'
import styles from './Poster.module.css'

export type PosterBlock = { type: 'text'; text: string; strong?: boolean } | { type: 'list'; items: string[] }

interface PosterProps {
  title: string
  blocks: PosterBlock[]
}

// Surface (paper) + Heading + Text: a printed notice laid out in two columns,
// e.g. the health infographic on the changing-room wall. Real text, so it
// reads at any size and screen readers get it as it is.
export function Poster({ title, blocks }: PosterProps) {
  return (
    <Surface tone="paper" padding="lg" className={styles.poster}>
      <Heading level={2} align="center">
        {title}
      </Heading>
      <div className={styles.columns}>
        {blocks.map((block) =>
          block.type === 'list' ? (
            <ul key={block.items.join()} className={styles.list}>
              {block.items.map((item) => (
                <li key={item} className={styles.item}>
                  <Text size="small" weight="bold">
                    {item}
                  </Text>
                </li>
              ))}
            </ul>
          ) : (
            <Text key={block.text} size="small" weight={block.strong ? 'bold' : 'regular'}>
              {block.text}
            </Text>
          ),
        )}
      </div>
    </Surface>
  )
}
