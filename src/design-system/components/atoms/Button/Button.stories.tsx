import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Positioned } from '../../layout/Positioned/Positioned'
import { Button } from './Button'

const meta = {
  title: 'Átomos/Button',
  component: Button,
  parameters: { stage: true },
  args: { onClick: fn(), children: 'Entrar al restaurante' },
  decorators: [
    (Story) => (
      <Positioned center="both">
        <Story />
      </Positioned>
    ),
  ],
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
export const Secondary: Story = { args: { variant: 'secondary', children: 'Neutro' } }
export const SlideUp: Story = { args: { entrance: 'slide-up', children: 'Entrar al restaurante' } }
export const ChoicePositive: Story = {
  args: { variant: 'choice-positive', children: 'SÍ →', 'aria-label': 'SÍ, es manipulador de alimentos' },
}
export const ChoiceNegative: Story = {
  args: { variant: 'choice-negative', children: '← NO', 'aria-label': 'NO, no es manipulador de alimentos' },
}
