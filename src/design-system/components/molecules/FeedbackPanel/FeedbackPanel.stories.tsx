import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Layer } from '../../layout/Layer/Layer'
import { Positioned } from '../../layout/Positioned/Positioned'
import { FeedbackPanel } from './FeedbackPanel'

const meta = {
  title: 'Moléculas/FeedbackPanel',
  component: FeedbackPanel,
  parameters: { stage: true },
  args: { closeLabel: 'Continuar', onClose: fn() },
  decorators: [
    (Story) => (
      <Layer layer="dialog" backdrop>
        <Positioned center="both" width={1300}>
          <Story />
        </Positioned>
      </Layer>
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
