import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Positioned } from '../../layout/Positioned/Positioned'
import { Surface } from '../Surface/Surface'
import { Text } from '../Text/Text'
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
        <Surface tone="opaque" padding="lg">
          <Text>
            <Story />
          </Text>
        </Surface>
      </Positioned>
    ),
  ],
} satisfies Meta<typeof Typewriter>

export default meta
type Story = StoryObj<typeof meta>

export const Typing: Story = {}
export const Complete: Story = { args: { complete: true } }
