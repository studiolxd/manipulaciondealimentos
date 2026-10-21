import type { Meta, StoryObj } from '@storybook/react-vite'
import { Positioned } from '../../layout/Positioned/Positioned'
import { Label } from './Label'

const meta = {
  title: 'Átomos/Label',
  component: Label,
  parameters: { stage: true },
  args: { children: 'Chica' },
  decorators: [
    (Story) => (
      <Positioned center="both">
        <Story />
      </Positioned>
    ),
  ],
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const Medium: Story = {}
export const Large: Story = { args: { size: 'lg' } }
