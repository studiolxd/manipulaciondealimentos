import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { fixtures } from '../../../docs/fixtures'
import { Positioned } from '../../layout/Positioned/Positioned'
import { ChoiceCard } from './ChoiceCard'

const meta = {
  title: 'Moléculas/ChoiceCard',
  component: ChoiceCard,
  parameters: { stage: true },
  args: { name: 'address', value: 'female', label: 'Femenino', checked: false, onChange: fn() },
  decorators: [
    (Story) => (
      <Positioned center="both">
        <Story />
      </Positioned>
    ),
  ],
} satisfies Meta<typeof ChoiceCard>

export default meta
type Story = StoryObj<typeof meta>

export const TextOnly: Story = {}
export const Selected: Story = { args: { checked: true } }
export const WithImage: Story = { args: { label: 'Óscar', image: fixtures.idPortrait, imageWidth: 240 } }
