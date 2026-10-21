/** A raster image with its intrinsic size in stage pixels. */
export interface ImageSource {
  src: string
  width: number
  height: number
}

/** Stacking layers, mapped to the semantic layer tokens. */
export type StageLayer = 'base' | 'over-hud' | 'dialog'
