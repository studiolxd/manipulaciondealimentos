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
    touchMessage: 'Este juego se juega en horizontal. Gira tu dispositivo para continuar.',
    desktopMessage: 'Este juego se juega en horizontal. Haz la ventana del navegador más ancha que alta para continuar.',
  },
}
