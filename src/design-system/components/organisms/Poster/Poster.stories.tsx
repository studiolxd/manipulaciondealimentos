import type { Meta, StoryObj } from '@storybook/react-vite'
import { Positioned } from '../../layout/Positioned/Positioned'
import { Poster } from './Poster'

const meta = {
  title: 'Organismos/Poster',
  component: Poster,
  parameters: { stage: true },
  args: {
    title: 'La salud del manipulador',
    lead: 'Si estás enfermo, puedes contaminar los alimentos.',
    listTitle: 'Avisa si tienes',
    items: ['Diarrea', 'Vómitos', 'Fiebre', 'Dolor de garganta con fiebre', 'Infecciones en la piel'],
    stepsTitle: 'Qué hacer',
    steps: ['Informa de inmediato a tu responsable.', 'No lo ocultes ni decidas por tu cuenta.', 'Vuelve a manipular solo cuando te lo indiquen.'],
    footer: 'Comunicarlo a tiempo protege a los clientes y a tu equipo.',
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
