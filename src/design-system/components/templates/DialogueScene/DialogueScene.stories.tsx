import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { fixtures } from '../../../docs/fixtures'
import { DialogueScene } from './DialogueScene'

const meta = {
  title: 'Plantillas/DialogueScene',
  component: DialogueScene,
  parameters: { stage: true },
  args: {
    heading: 'Salón comedor: bienvenida de David',
    background: fixtures.background,
    backgroundAlt: 'Salón comedor del restaurante.',
    ready: true,
    character: { source: fixtures.character, alt: 'David, el encargado.', bottom: 0, left: 120, height: 900 },
    speech: {
      speaker: 'David',
      blocks: ['¡Hola! Soy David, el encargado. Tú debes ser el nuevo fichaje... ¡te estábamos esperando!'],
      tail: 'left',
      top: 140,
      left: 820,
      width: 980,
    },
    action: { label: '¡Vamos!', onClick: fn() },
  },
} satisfies Meta<typeof DialogueScene>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithHud: Story = { args: { hud: true } }
