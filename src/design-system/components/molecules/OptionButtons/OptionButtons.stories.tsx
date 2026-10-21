import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Positioned } from '../../layout/Positioned/Positioned'
import { OptionButtons } from './OptionButtons'

const meta = {
  title: 'Moléculas/OptionButtons',
  component: OptionButtons,
  parameters: { stage: true },
  args: {
    label: 'Forma de tratamiento',
    options: [
      { value: 'male', label: 'Masculino' },
      { value: 'female', label: 'Femenino' },
      { value: 'neutral', label: 'Neutro' },
    ],
    onSelect: fn(),
  },
  decorators: [
    (Story) => (
      <Positioned center="both">
        <Story />
      </Positioned>
    ),
  ],
} satisfies Meta<typeof OptionButtons>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
