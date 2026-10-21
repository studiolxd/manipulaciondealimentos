import type { Meta, StoryObj } from '@storybook/react-vite'
import { RotateDeviceScreen } from './RotateDeviceScreen'

const meta = {
  title: 'Organismos/RotateDeviceScreen',
  component: RotateDeviceScreen,
  args: {
    title: 'Gira tu dispositivo',
    message: 'Este juego se juega en horizontal. Gira tu dispositivo para continuar.',
  },
} satisfies Meta<typeof RotateDeviceScreen>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
