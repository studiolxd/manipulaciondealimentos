import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Positioned } from '../../layout/Positioned/Positioned'
import { Switch } from './Switch'

const meta = {
  title: 'Átomos/Switch',
  component: Switch,
  parameters: { stage: true },
  args: { label: 'Sonidos FX', checked: true, onChange: () => {} },
  decorators: [
    (Story) => (
      <Positioned center="both" width={800}>
        <Story />
      </Positioned>
    ),
  ],
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Interactive: Story = {
  render: function Render(args) {
    const [checked, setChecked] = useState(args.checked)
    return <Switch {...args} checked={checked} onChange={setChecked} />
  },
}
export const Off: Story = { args: { checked: false } }
