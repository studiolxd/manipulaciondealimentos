// Interface graphics owned by the design system. Files live in public/ with
// stable names: final artwork replaces a placeholder by overwriting the PNG
// with the same name and size. Also read by scripts/generate-placeholders.ts.

export const icons = {
  next: { path: 'assets/ui/next.png', width: 96, height: 96 },
  close: { path: 'assets/ui/close.png', width: 96, height: 96 },
  statement: { path: 'assets/ui/statement.png', width: 120, height: 120 },
  correct: { path: 'assets/ui/correct.png', width: 96, height: 96 },
  incorrect: { path: 'assets/ui/incorrect.png', width: 96, height: 96 },
  rotateDevice: { path: 'assets/ui/rotate-device.png', width: 240, height: 240 },
  hudBar: { path: 'assets/ui/hud-bar.png', width: 1920, height: 120 },
} as const

export type IconName = keyof typeof icons
