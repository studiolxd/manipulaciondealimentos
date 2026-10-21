import type { DesignSystemStrings } from '../design-system'

// Interface strings that are not part of the script.

/** Strings used inside design system components. */
export const designSystemStrings: DesignSystemStrings = {
  continue: 'Continuar',
  showFullText: 'Mostrar el texto completo',
  speakerSays: (speaker) => `${speaker} dice:`,
}

export const ui = {
  rotateDevice: {
    title: 'Gira tu dispositivo',
  },
  // Development only (Ctrl+Shift+M).
  devSceneMenu: {
    label: 'Ir a una escena',
    close: 'Cerrar',
  },
}
