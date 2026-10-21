import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Positioned } from '../../templates/Positioned/Positioned'
import { IconButton } from './IconButton'

const meta = {
  title: 'Átomos/IconButton',
  component: IconButton,
  parameters: { stage: true },
  args: { icon: 'statement', label: 'Ver el enunciado', onClick: fn() },
  decorators: [
    (Story) => (
      <Positioned center="both">
        <Story />
      </Positioned>
    ),
  ],
} satisfies Meta<typeof IconButton>

export default meta
type Story = StoryObj<typeof meta>

export const Statement: Story = {}
export const Close: Story = { args: { icon: 'close', label: 'Cerrar' } }
export const Next: Story = { args: { icon: 'next', label: 'Continuar' } }
