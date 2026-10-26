import type { ImageSource } from '../../../types'
import { Button } from '../../atoms/Button/Button'
import { Image } from '../../atoms/Image/Image'
import { IconButton } from '../../molecules/IconButton/IconButton'
import styles from './HotspotFigure.module.css'

/** A box of the picture, in the picture's own pixels. */
export interface FigureBox {
  x: number
  y: number
  width: number
  height: number
}

/** Something to correct on the figure, with a layer for each state. */
export interface FigureSpot extends FigureBox {
  id: string
  /** Accessible name, e.g. "Oreja". */
  label: string
  fixed: boolean
  /** Shown over the box while it is to correct (e.g. an earring). */
  problem?: ImageSource
  /** Shown over the box once corrected (e.g. a hair net). */
  corrected?: ImageSource
}

/** A button over the figure that opens a closer view (e.g. of the hands). */
export interface FigureZoom {
  id: string
  label: string
  /** Centre of the button, in the picture's own pixels. */
  x: number
  y: number
}

interface HotspotFigureProps {
  image: ImageSource
  /** Accessible name of the figure itself; pressing it away from any spot is a miss. */
  label: string
  spots: FigureSpot[]
  zooms?: FigureZoom[]
  /** Everything corrected: shown in black and white and no longer pressable. */
  done?: boolean
  onSpot: (id: string) => void
  onMiss: () => void
  onZoom?: (id: string) => void
}

// Image + layered Buttons: a figure (a worker, a pair of hands…) where the
// player presses what must be corrected. Each spot shows its problem layer
// until it is corrected, then its corrected layer. Pressing the figure
// anywhere else is a miss.
export function HotspotFigure({ image, label, spots, zooms = [], done = false, onSpot, onMiss, onZoom }: HotspotFigureProps) {
  const place = (box: FigureBox) => ({
    left: `${(box.x / image.width) * 100}%`,
    top: `${(box.y / image.height) * 100}%`,
    width: `${(box.width / image.width) * 100}%`,
    height: `${(box.height / image.height) * 100}%`,
  })

  return (
    <div
      className={styles.figure}
      data-done={done || undefined}
      inert={done}
      style={{ aspectRatio: `${image.width} / ${image.height}` }}
    >
      <div className={styles.base}>
        <Button variant="bare" aria-label={label} onClick={onMiss}>
          <Image source={image} alt="" fit="cover" />
        </Button>
      </div>

      {spots.map((spot) => {
        const layer = spot.fixed ? spot.corrected : spot.problem
        return (
          <div key={spot.id} className={styles.spot} style={place(spot)}>
            {layer && (
              <span className={styles.layer}>
                <Image source={layer} alt="" fit="cover" />
              </span>
            )}
            {!spot.fixed && (
              <Button variant="bare" aria-label={spot.label} onClick={() => onSpot(spot.id)}>
                <span className={styles.area} />
              </Button>
            )}
          </div>
        )
      })}

      {zooms.map((zoom) => (
        <div
          key={zoom.id}
          className={styles.zoom}
          style={{ left: `${(zoom.x / image.width) * 100}%`, top: `${(zoom.y / image.height) * 100}%` }}
        >
          <IconButton compact icon="zoomIn" label={zoom.label} opensDialog onClick={() => onZoom?.(zoom.id)} />
        </div>
      ))}
    </div>
  )
}
