import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { fn } from 'storybook/test'
import { Surface } from '../../atoms/Surface/Surface'
import { Positioned } from '../../layout/Positioned/Positioned'
import { TextField } from './TextField'

const meta = {
  title: 'Moléculas/TextField',
  component: TextField,
  parameters: { stage: true },
  args: { label: 'Tu nombre', value: '', autoComplete: 'given-name', onChange: fn() },
  render: function Render(args) {
    const [value, setValue] = useState(args.value)
    return (
      <Positioned center="both" width={900}>
        <Surface tone="opaque" padding="lg">
          <TextField {...args} value={value} onChange={setValue} />
        </Surface>
      </Positioned>
    )
  },
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Filled: Story = { args: { value: 'Ana' } }
export const Invalid: Story = { args: { invalid: true } }
