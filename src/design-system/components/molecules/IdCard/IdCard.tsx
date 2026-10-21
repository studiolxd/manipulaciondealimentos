import type { ImageSource } from '../../../types'
import { Heading } from '../../atoms/Heading/Heading'
import { Image } from '../../atoms/Image/Image'
import { Surface } from '../../atoms/Surface/Surface'
import { Text } from '../../atoms/Text/Text'
import styles from './IdCard.module.css'

interface IdCardProps {
  name: string
  job: string
  description: string
  portrait: ImageSource
}

// Surface (paper) + Heading + Text + Image: ID-card layout with the details
// on the left and a head-to-chest portrait on the right. It fills its parent.
export function IdCard({ name, job, description, portrait }: IdCardProps) {
  return (
    <Surface tone="paper" padding="md" className={styles.card}>
      <div className={styles.details}>
        <Heading level={2} variant="subheading">
          {name}
        </Heading>
        <Text weight="bold">{job}</Text>
        <Text size="body-sm">{description}</Text>
      </div>
      <Image source={portrait} alt="" />
    </Surface>
  )
}
