import type { ReactNode } from 'react'
import styles from './Icon.module.css'

// Vector icons, drawn on a 24-unit grid inspired by Rubik: one colour, a
// 2.5 real-pixel stroke at any size, round joins and caps, rounded corners and
// a 2-unit margin.
// Icon paints them with currentColor, so they take the colour of their tone.

export const glyphs = {
  // A phone turning from portrait to landscape, clockwise like the arrow.
  rotateDevice: (
    <>
      <path d="M4.72 6.89A9.5 9.5 0 0 1 19.28 6.89" />
      <polyline points="16.3 6.63 19.28 6.89 19.54 3.9" />
      <rect className={styles.rotateDevicePhone} x="8" y="6.5" width="8" height="13" rx="2.5" />
    </>
  ),
} satisfies Record<string, ReactNode>

export type GlyphName = keyof typeof glyphs

export function isGlyph(name: string): name is GlyphName {
  return Object.hasOwn(glyphs, name)
}
