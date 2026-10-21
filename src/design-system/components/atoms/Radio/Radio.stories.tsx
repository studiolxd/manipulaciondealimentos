import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Radio } from './Radio'

const meta = {
  title: 'Átomos/Radio',
  component: Radio,
  args: { name: 'demo', value: 'a', checked: false, onChange: fn() },
} satisfies Meta<typeof Radio>

export default meta
type Story = StoryObj<typeof meta>

/** Visually hidden on its own: it is shown through ChoiceCard. */
export const Default: Story = {}
