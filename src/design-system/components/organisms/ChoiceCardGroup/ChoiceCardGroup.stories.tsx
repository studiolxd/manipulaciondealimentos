import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Positioned } from '../../layout/Positioned/Positioned'
import { ChoiceCardGroup } from './ChoiceCardGroup'

const meta = {
  title: 'Organismos/ChoiceCardGroup',
  component: ChoiceCardGroup,
  parameters: { stage: true },
} satisfies Meta<typeof ChoiceCardGroup>

export default meta
type Story = StoryObj<typeof meta>

const options = [
  { value: 'male', label: 'Masculino' },
  { value: 'female', label: 'Femenino' },
  { value: 'neutral', label: 'Neutro' },
]

const render: Story['render'] = function Render(args) {
  const [value, setValue] = useState<string | null>(args.value)
  return (
    <Positioned center="both">
      <ChoiceCardGroup {...args} value={value} onChange={setValue} />
    </Positioned>
  )
}

export const FormOfAddress: Story = {
  args: { legend: 'Forma de tratamiento', name: 'address', options, value: null, onChange: () => {} },
  render,
}
export const WithError: Story = {
  args: { ...FormOfAddress.args, error: 'Elige una opción para continuar.' } as Story['args'],
  render,
}
