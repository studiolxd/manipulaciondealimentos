import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Text } from '../../atoms/Text/Text'
import { Positioned } from '../../layout/Positioned/Positioned'
import { Dialog } from './Dialog'

const meta = {
  title: 'Organismos/Dialog',
  component: Dialog,
  parameters: { stage: true },
  args: {
    label: 'Enunciado de la actividad',
    closeLabel: 'Cerrar el enunciado',
    onClose: fn(),
    children: (
      <>
        <Text>No todos los manipuladores de alimentos son cocineros.</Text>
        <Text>Desliza la tarjeta a la derecha si crees que SÍ es manipulador de alimentos.</Text>
      </>
    ),
  },
  decorators: [
    (Story) => (
      <Positioned top={160} left={210} width={1500}>
        <Story />
      </Positioned>
    ),
  ],
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
