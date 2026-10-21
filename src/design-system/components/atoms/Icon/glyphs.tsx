import type { ReactNode } from 'react'
import styles from './Icon.module.css'

// Vector icons, drawn on a 24-unit grid with the straight cuts of Gasoek One:
// one colour, a 2-unit stroke rounded to whole pixels, square ends, mitred
// joins and square corners. Curves are allowed, but they end cut straight;
// arrowheads are solid triangles (class `fill`). 2-unit margin.
// Icon paints them with currentColor, so they take the colour of their tone.

export const glyphs = {
  // A phone turning from portrait to landscape, clockwise like the arrow.
  rotateDevice: (
    <>
      {/* The shaft runs a little under the head, so no seam shows where they meet. */}
      <path d="M5.28 7.28A9.5 9.5 0 0 1 17.31 6.12" />
      <polygon className={styles.fill} points="18.05 3.52 15.45 8.02 19.69 7.47" />
      <rect className={styles.rotateDevicePhone} x="8.5" y="12" width="7" height="9.5" />
    </>
  ),
} satisfies Record<string, ReactNode>

export type GlyphName = keyof typeof glyphs

export function isGlyph(name: string): name is GlyphName {
  return Object.hasOwn(glyphs, name)
}
