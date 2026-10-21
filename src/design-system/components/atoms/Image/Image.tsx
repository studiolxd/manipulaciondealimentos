import type { ImageSource } from '../../../types'
import styles from './Image.module.css'

interface ImageProps {
  source: ImageSource
  /** Empty for decorative images. */
  alt: string
  /** Display size in stage pixels; with only one of them the aspect ratio is kept. */
  width?: number
  height?: number
}

export function Image({ source, alt, width, height }: ImageProps) {
  const fixedSize = width === undefined && height === undefined
  return (
    <img
      className={styles.image}
      src={source.src}
      alt={alt}
      width={fixedSize ? source.width : width}
      height={fixedSize ? source.height : height}
      draggable={false}
    />
  )
}
