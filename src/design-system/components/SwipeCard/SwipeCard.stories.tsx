import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { fixtures } from '../../docs/fixtures'
import { IdCard } from '../IdCard/IdCard'
import { Positioned } from '../Positioned/Positioned'
import { SwipeCard } from './SwipeCard'

const meta = {
  title: 'Actividades/SwipeCard',
  component: SwipeCard,
  parameters: { stage: true },
  args: {
    label: 'Óscar Fernández',
    description: 'Cocinero del restaurante El Caserío. Me encargo de preparar los platos de la carta.',
    roleDescription: 'Carnet',
    keyboardHint: 'Pulsa la flecha derecha para SÍ o la flecha izquierda para NO.',
    leftStamp: 'NO',
    rightStamp: 'SÍ',
    onSwipe: fn(),
    children: (
      <IdCard
        name="Óscar Fernández"
        job="Cocinero del restaurante El Caserío"
        description="Me encargo de preparar los platos de la carta para que los clientes queden satisfechos."
        portrait={fixtures.idPortrait}
      />
    ),
  },
  decorators: [
    (Story) => (
      <Positioned top={160} left={400} width={1120} height={520}>
        <Story />
      </Positioned>
    ),
  ],
} satisfies Meta<typeof SwipeCard>

export default meta
type Story = StoryObj<typeof meta>

/** Drag it left or right, or focus it and press ← / →. */
export const Default: Story = {}
