import type { ImageSource } from '../../../types'
import styles from './Image.module.css'

interface ImageProps {
  source: ImageSource
  /** Empty for decorative images. */
  alt: string
  /** `intrinsic` (default): its own size or the given one. `cover`: fills its container, cropping if needed (backgrounds). */
  fit?: 'intrinsic' | 'cover'
  /** Display size in stage pixels; with only one of them the aspect ratio is kept. */
  width?: number
  height?: number
}

export function Image({ source, alt, fit = 'intrinsic', width, height }: ImageProps) {
  const fixedSize = fit === 'intrinsic' && width === undefined && height === undefined
  return (
    <img
      className={styles.image}
      data-fit={fit}
      src={source.src}
      alt={alt}
      width={fixedSize ? source.width : width}
      height={fixedSize ? source.height : height}
      draggable={false}
    />
  )
}
