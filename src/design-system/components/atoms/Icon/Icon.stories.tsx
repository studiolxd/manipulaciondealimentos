import type { Meta, StoryObj } from '@storybook/react-vite'
import { Positioned } from '../../layout/Positioned/Positioned'
import { Icon } from './Icon'

const meta = {
  title: 'Átomos/Icon',
  component: Icon,
  parameters: { stage: true },
  args: { name: 'correct', size: 'md' },
  decorators: [
    (Story) => (
      <Positioned center="both">
        <Story />
      </Positioned>
    ),
  ],
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof meta>

export const Small: Story = { args: { size: 'sm' } }
export const Medium: Story = {}
export const Large: Story = { args: { size: 'lg', name: 'statement' } }
export const Vector: Story = { args: { size: 'lg', name: 'rotateDevice', tone: 'default' } }
export const Accent: Story = { args: { size: 'lg', name: 'rotateDevice', tone: 'accent' } }
export const Animated: Story = { args: { size: 'lg', name: 'rotateDevice', tone: 'default', animated: true } }
