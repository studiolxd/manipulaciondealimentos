import type { ImageSource } from '../../../types'
import { MediaTile } from '../../molecules/MediaTile/MediaTile'
import styles from './MediaGallery.module.css'

export interface MediaGalleryItem {
  id: string
  label: string
  thumbnail: ImageSource
  done: boolean
}

interface MediaGalleryProps {
  /** Name of the gallery, read by screen readers. */
  label: string
  items: MediaGalleryItem[]
  /** Added to the accessible name of done items, e.g. "revisada". */
  doneLabel: string
  onOpen: (id: string) => void
}

// MediaTiles in a grid of four columns, e.g. the security camera recordings.
export function MediaGallery({ label, items, doneLabel, onOpen }: MediaGalleryProps) {
  return (
    <ul className={styles.gallery} aria-label={label}>
      {items.map((item) => (
        <li key={item.id} className={styles.item}>
          <MediaTile
            thumbnail={item.thumbnail}
            label={item.label}
            done={item.done}
            doneLabel={doneLabel}
            onOpen={() => onOpen(item.id)}
          />
        </li>
      ))}
    </ul>
  )
}
