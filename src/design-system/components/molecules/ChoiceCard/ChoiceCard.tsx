import { useId } from 'react'
import type { ImageSource } from '../../../types'
import { Image } from '../../atoms/Image/Image'
import { Label } from '../../atoms/Label/Label'
import { Radio } from '../../atoms/Radio/Radio'
import { Surface } from '../../atoms/Surface/Surface'
import styles from './ChoiceCard.module.css'

interface ChoiceCardProps {
  name: string
  value: string
  label: string
  /** Optional picture above the label; without it the option is text only. */
  image?: ImageSource
  /** Display width of the image in stage pixels; the aspect ratio is kept. */
  imageWidth?: number
  checked: boolean
  onChange: () => void
}

// Radio + Label (+ Image) on a Surface: one option of a single choice.
export function ChoiceCard({ name, value, label, image, imageWidth, checked, onChange }: ChoiceCardProps) {
  const id = useId()
  return (
    <label htmlFor={id} className={styles.card}>
      <Surface tone="opaque" padding="md" highlighted={checked} className={styles.surface}>
        <Radio id={id} name={name} value={value} checked={checked} onChange={onChange} />
        {image && <Image source={image} alt="" width={imageWidth} />}
        <Label size={image ? 'md' : 'lg'}>{label}</Label>
      </Surface>
    </label>
  )
}
