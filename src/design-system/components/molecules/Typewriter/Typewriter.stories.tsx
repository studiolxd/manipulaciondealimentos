import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Surface } from '../../atoms/Surface/Surface'
import { Positioned } from '../../layout/Positioned/Positioned'
import { Typewriter } from './Typewriter'

const meta = {
  title: 'Moléculas/Typewriter',
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
          <Story />
        </Surface>
      </Positioned>
    ),
  ],
} satisfies Meta<typeof Typewriter>

export default meta
type Story = StoryObj<typeof meta>

/** Press Enter or Space (with the focus outside any button) to show the whole text. */
export const Typing: Story = {}
export const Complete: Story = { args: { complete: true } }
