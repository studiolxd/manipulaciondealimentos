import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Positioned } from '../../layout/Positioned/Positioned'
import { SpeechBubble } from './SpeechBubble'

const meta = {
  title: 'Organismos/SpeechBubble',
  component: SpeechBubble,
  parameters: { stage: true },
  args: {
    speaker: 'David',
    blocks: [
      'Antes de empezar a moverte por el restaurante, hay algo que debes tener claro: qué significa manipular alimentos.',
      'Un manipulador de alimentos es cualquier persona que, por su trabajo, entra en contacto con alimentos.',
    ],
    onFinished: fn(),
  },
  decorators: [
    (Story) => (
      <Positioned top={160} left={460} width={1000}>
        <Story />
      </Positioned>
    ),
  ],
} satisfies Meta<typeof SpeechBubble>

export default meta
type Story = StoryObj<typeof meta>

/** The tail points to whoever speaks. */
export const TailLeft: Story = { args: { tail: 'left' } }
export const TailRight: Story = { args: { tail: 'right' } }
export const TailBottom: Story = { args: { tail: 'bottom' } }
/** The final click closes it (used to shrink a statement into an icon). */
export const Dismissible: Story = { args: { onDismiss: fn() } }
