import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { fn } from 'storybook/test'
import { Positioned } from '../../layout/Positioned/Positioned'
import { TextInput } from './TextInput'

const meta = {
  title: 'Átomos/TextInput',
  component: TextInput,
  parameters: { stage: true },
  args: { id: 'demo', value: '', onChange: fn() },
  render: function Render(args) {
    const [value, setValue] = useState(args.value)
    return (
      <Positioned center="both" width={800}>
        <TextInput {...args} value={value} onChange={setValue} />
      </Positioned>
    )
  },
} satisfies Meta<typeof TextInput>

export default meta
type Story = StoryObj<typeof meta>

/** On its own it has no label: use TextField. */
export const Default: Story = {}
export const Invalid: Story = { args: { invalid: true } }
