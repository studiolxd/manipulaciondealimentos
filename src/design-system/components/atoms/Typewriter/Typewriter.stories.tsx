import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { NarrationBox } from '../../molecules/NarrationBox/NarrationBox'
import { Positioned } from '../../templates/Positioned/Positioned'
import { Text } from '../../atoms/Text/Text'
import { Typewriter } from './Typewriter'

const meta = {
  title: 'Átomos/Typewriter',
  component: Typewriter,
  parameters: { stage: true },
  args: {
    text: 'Hoy será tu primer día en hostelería. Debes entrar y buscar a David, el encargado. ¡Buena suerte!',
    onDone: fn(),
  },
  decorators: [
    (Story) => (
      <Positioned center="both" width={1200}>
        <NarrationBox>
          <Text>
            <Story />
          </Text>
        </NarrationBox>
      </Positioned>
    ),
  ],
} satisfies Meta<typeof Typewriter>

export default meta
type Story = StoryObj<typeof meta>

export const Typing: Story = {}
export const Complete: Story = { args: { complete: true } }
