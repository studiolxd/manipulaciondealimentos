import type { Meta, StoryObj } from '@storybook/react-vite'
import { Surface } from '../Surface/Surface'
import { Positioned } from '../../layout/Positioned/Positioned'
import { Text } from './Text'

const meta = {
  title: 'Átomos/Text',
  component: Text,
  parameters: { stage: true },
  args: { children: 'Una persona que manipula alimentos es cualquiera que, por su trabajo, entra en contacto con alimentos.' },
  decorators: [
    (Story) => (
      <Positioned center="both" width={1200}>
        <Surface tone="opaque" padding="lg">
          <Story />
        </Surface>
      </Positioned>
    ),
  ],
} satisfies Meta<typeof Text>

export default meta
type Story = StoryObj<typeof meta>

export const Body: Story = {}
export const BodySmall: Story = { args: { size: 'body-sm' } }
export const Bold: Story = { args: { weight: 'bold' } }
export const Positive: Story = { args: { tone: 'positive', weight: 'bold', children: '¡Correcto!' } }
export const Negative: Story = { args: { tone: 'negative', weight: 'bold', children: '¡Incorrecto!' } }
