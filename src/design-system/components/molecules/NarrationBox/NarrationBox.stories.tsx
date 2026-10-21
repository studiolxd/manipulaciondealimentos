import type { Meta, StoryObj } from '@storybook/react-vite'
import { Positioned } from '../../templates/Positioned/Positioned'
import { Text } from '../../atoms/Text/Text'
import { NarrationBox } from './NarrationBox'

const meta = {
  title: 'Moléculas/NarrationBox',
  component: NarrationBox,
  parameters: { stage: true },
  args: { children: <Text>Hoy será tu primer día en hostelería. Debes entrar y buscar a David, el encargado.</Text> },
  decorators: [
    (Story) => (
      <Positioned center="both" width={1200}>
        <Story />
      </Positioned>
    ),
  ],
} satisfies Meta<typeof NarrationBox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
