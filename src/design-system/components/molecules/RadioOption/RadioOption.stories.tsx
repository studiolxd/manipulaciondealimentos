import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Positioned } from '../../layout/Positioned/Positioned'
import { RadioOption } from './RadioOption'

const meta = {
  title: 'Moléculas/RadioOption',
  component: RadioOption,
  parameters: { stage: true },
  args: {
    name: 'demo',
    value: 'a',
    label: 'Porque puede transferir microorganismos al alimento.',
    checked: false,
    onChange: fn(),
  },
  decorators: [
    (Story) => (
      <Positioned center="both" width={1100}>
        <Story />
      </Positioned>
    ),
  ],
} satisfies Meta<typeof RadioOption>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Checked: Story = { args: { checked: true } }
