// Raster interface graphics owned by the design system, until they are redrawn
// as vector icons (components/atoms/Icon/glyphs.tsx). Files live in public/
// with stable names: final artwork replaces a placeholder by overwriting the
// PNG with the same name and size. Also read by scripts/generate-placeholders.ts.

export const icons = {
  next: { path: 'assets/ui/next.png', width: 96, height: 96 },
  close: { path: 'assets/ui/close.png', width: 96, height: 96 },
  statement: { path: 'assets/ui/statement.png', width: 120, height: 120 },
  correct: { path: 'assets/ui/correct.png', width: 96, height: 96 },
  incorrect: { path: 'assets/ui/incorrect.png', width: 96, height: 96 },
} as const

export type RasterIconName = keyof typeof icons
