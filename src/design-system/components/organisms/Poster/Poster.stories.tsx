import type { Meta, StoryObj } from '@storybook/react-vite'
import { Positioned } from '../../layout/Positioned/Positioned'
import { Poster } from './Poster'

const meta = {
  title: 'Organismos/Poster',
  component: Poster,
  parameters: { stage: true },
  args: {
    title: 'La salud del manipulador',
    blocks: [
      { type: 'text', text: 'El estado de salud del manipulador puede influir directamente en la seguridad de los alimentos.', strong: true },
      { type: 'text', text: 'Algunas enfermedades pueden transmitirse a través de los alimentos, sobre todo con síntomas como:' },
      { type: 'list', items: ['Diarrea.', 'Vómitos.', 'Fiebre.', 'Infecciones en la piel.'] },
      { type: 'text', text: 'Si presentas alguno de estos síntomas, debes informar inmediatamente a la persona responsable.', strong: true },
    ],
  },
  decorators: [
    (Story) => (
      <Positioned top={150} center="x" width={1640} height={760}>
        <Story />
      </Positioned>
    ),
  ],
} satisfies Meta<typeof Poster>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
