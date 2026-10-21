import type { ImageSource } from '../../../types'
import { Heading } from '../../atoms/Heading/Heading'
import { Image } from '../../atoms/Image/Image'
import { Surface } from '../../atoms/Surface/Surface'
import { Text } from '../../atoms/Text/Text'
import styles from './IdCard.module.css'

interface IdCardProps {
  name: string
  job: string
  /** Where the person works, if known. */
  company?: string
  description: string
  /** Head-to-chest portrait, cropped into a round avatar. */
  portrait: ImageSource
}

// Surface (paper) + Image + Heading + Text: ID card, centred and stacked: round
// avatar, then name, job and company on a line each, then the description.
// It fills its parent.
export function IdCard({ name, job, company, description, portrait }: IdCardProps) {
  return (
    <Surface tone="paper" padding="md" className={styles.card}>
      <div className={styles.avatar}>
        <Image source={portrait} alt="" fit="cover" />
      </div>
      <div className={styles.identity}>
        <Heading level={2} variant="subheading" align="center">
          {name}
        </Heading>
        <Text weight="bold">{job}</Text>
        {company && <Text>{company}</Text>}
      </div>
      <Text size="body-sm">{description}</Text>
    </Surface>
  )
}
