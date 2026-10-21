import type { ReactNode } from 'react'
import styles from './Icon.module.css'

// Vector icons, drawn on a 24-unit grid inspired by Rubik: one colour, a
// 2.5-unit stroke, round joins and caps, rounded corners and a 2-unit margin.
// Icon paints them with currentColor, so they take the colour of their tone.

export const glyphs = {
  // A phone turning from portrait to landscape, clockwise like the arrow.
  rotateDevice: (
    <>
      <path d="M4.72 7.89A9.5 9.5 0 0 1 19.28 7.89" />
      <polyline points="15.79 7.59 19.28 7.89 19.59 4.4" />
      <rect className={styles.rotateDevicePhone} x="8.5" y="9" width="7" height="10" rx="2" />
    </>
  ),
} satisfies Record<string, ReactNode>

export type GlyphName = keyof typeof glyphs

export function isGlyph(name: string): name is GlyphName {
  return Object.hasOwn(glyphs, name)
}
