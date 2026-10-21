import type { Meta, StoryObj } from '@storybook/react-vite'
import { Positioned } from '../Positioned/Positioned'
import { FeedbackPanel } from './FeedbackPanel'

const meta = {
  title: 'Actividades/FeedbackPanel',
  component: FeedbackPanel,
  parameters: { stage: true },
  decorators: [
    (Story) => (
      <Positioned top={720} left={210} width={1500}>
        <Story />
      </Positioned>
    ),
  ],
} satisfies Meta<typeof FeedbackPanel>

export default meta
type Story = StoryObj<typeof meta>

export const Positive: Story = {
  args: {
    feedback: {
      tone: 'positive',
      title: '¡Correcto!',
      message: 'Óscar es manipulador de alimentos porque, como cocinero, está en contacto directo con los alimentos.',
    },
  },
}

export const Negative: Story = {
  args: {
    feedback: {
      tone: 'negative',
      title: '¡Incorrecto!',
      message: 'Elena no es manipuladora de alimentos porque sus funciones se limitan a la recepción y atención de clientes.',
    },
  },
}

/** Hidden, but the live region is already in place to announce the first answer. */
export const Empty: Story = { args: { feedback: null } }
