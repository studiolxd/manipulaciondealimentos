import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { fixtures } from '../../../docs/fixtures'
import { Positioned } from '../../templates/Positioned/Positioned'
import { ChoiceCardGroup } from './ChoiceCardGroup'

const meta = {
  title: 'Moléculas/ChoiceCardGroup',
  component: ChoiceCardGroup,
  parameters: { stage: true },
} satisfies Meta<typeof ChoiceCardGroup>

export default meta
type Story = StoryObj<typeof meta>

const options = [
  { value: 'male', label: 'Chico', image: fixtures.avatarMale },
  { value: 'female', label: 'Chica', image: fixtures.avatarFemale },
]

export const Avatars: Story = {
  args: { legend: 'Personaje', name: 'avatar', options, value: null, imageWidth: 336, onChange: () => {} },
  render: function Render(args) {
    const [value, setValue] = useState<string | null>(args.value)
    return (
      <Positioned center="both">
        <ChoiceCardGroup {...args} value={value} onChange={setValue} />
      </Positioned>
    )
  },
}
