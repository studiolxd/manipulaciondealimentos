import type { Meta, StoryObj } from '@storybook/react-vite'
import { Positioned } from '../../layout/Positioned/Positioned'
import { Stamp } from './Stamp'

const meta = {
  title: 'Átomos/Stamp',
  component: Stamp,
  parameters: { stage: true },
  args: { tone: 'positive', children: 'SÍ' },
  decorators: [
    (Story) => (
      <Positioned center="both">
        <Story />
      </Positioned>
    ),
  ],
} satisfies Meta<typeof Stamp>

export default meta
type Story = StoryObj<typeof meta>

export const Positive: Story = {}
export const Negative: Story = { args: { tone: 'negative', children: 'NO' } }
