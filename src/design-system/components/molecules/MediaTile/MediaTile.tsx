import type { ImageSource } from '../../../types'
import { Button } from '../../atoms/Button/Button'
import { Image } from '../../atoms/Image/Image'
import { Label } from '../../atoms/Label/Label'
import styles from './MediaTile.module.css'

interface MediaTileProps {
  thumbnail: ImageSource
  /** Visible caption and accessible name, e.g. "Cámara 1". */
  label: string
  /** Already seen: shown in black and white and no longer pressable. */
  done?: boolean
  /** Added to the accessible name when done, e.g. "revisado". */
  doneLabel?: string
  onOpen: () => void
}

// Image + Label: a clickable thumbnail of a video or document in a gallery.
// Once done it turns black and white and can no longer be opened.
export function MediaTile({ thumbnail, label, done = false, doneLabel, onOpen }: MediaTileProps) {
  return (
    <div className={styles.tile} data-done={done || undefined}>
      <Button
        variant="bare"
        disabled={done}
        aria-label={done && doneLabel ? `${label}, ${doneLabel}` : undefined}
        onClick={onOpen}
      >
        <span className={styles.content}>
          <span className={styles.thumbnail}>
            <Image source={thumbnail} alt="" fit="cover" />
          </span>
          <Label tone="inverse">{label}</Label>
        </span>
      </Button>
    </div>
  )
}
