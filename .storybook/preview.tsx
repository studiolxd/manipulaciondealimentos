import type { Decorator, Preview } from '@storybook/react-vite'
import { DesignSystemProvider, Stage } from '../src/design-system'

// Sample interface strings; the game passes its own from src/content/ui.ts.
const strings = {
  continue: 'Continuar',
  showFullText: 'Mostrar el texto completo',
  speakerSays: (speaker: string) => `${speaker} dice:`,
}

// Stories with `parameters: { stage: true }` render inside a 16:9 stage, at
// the same scale as in the game.
const withStage: Decorator = (Story, context) =>
  context.parameters.stage ? (
    <Stage fit="container" landmark={false}>
      <Story />
    </Stage>
  ) : (
    <Story />
  )

const withDesignSystem: Decorator = (Story) => (
  <DesignSystemProvider strings={strings}>
    <Story />
  </DesignSystemProvider>
)

const preview: Preview = {
  decorators: [withStage, withDesignSystem],
  parameters: {
    layout: 'fullscreen',
    controls: {
      matchers: {
        color: /(background|color)$/i,
      },
    },
    a11y: {
      // Accessibility violations fail the story in the test runner and show in the panel.
      test: 'error',
    },
    options: {
      storySort: {
        method: 'alphabetical',
        order: [
          'Fundamentos',
          ['Introducción', 'Tokens', ['Colores', 'Tipografía', 'Espaciado y tamaños', 'Forma', 'Movimiento', 'Capas']],
          'Átomos',
          'Moléculas',
          'Organismos',
          'Plantillas',
        ],
      },
    },
  },
}

export default preview
