import type { ReactNode } from 'react'
import styles from './Icon.module.css'

// Vector icons, drawn on a 24-unit grid: one colour, a 1-unit stroke rounded
// to whole pixels, round joins and caps, rounded corners,
// right-angled arrowheads whose tips sit at the same distance from a curved
// shaft, and a 2-unit margin.
// Icon paints them with currentColor, so they take the colour of their tone.

export const glyphs = {
  // A phone turning from portrait to landscape, clockwise like the arrow.
  rotateDevice: (
    <>
      <path d="M5.28 7.28A9.5 9.5 0 0 1 18.72 7.28" />
      <polyline points="15.74 7.62 18.72 7.28 18.38 4.3" />
      <rect className={styles.rotateDevicePhone} x="8.25" y="9.25" width="7.5" height="11.5" rx="2.5" />
    </>
  ),
} satisfies Record<string, ReactNode>

export type GlyphName = keyof typeof glyphs

export function isGlyph(name: string): name is GlyphName {
  return Object.hasOwn(glyphs, name)
}
