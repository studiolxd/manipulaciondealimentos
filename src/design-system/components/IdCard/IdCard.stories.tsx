import type { Meta, StoryObj } from '@storybook/react-vite'
import { fixtures } from '../../docs/fixtures'
import { Positioned } from '../Positioned/Positioned'
import { IdCard } from './IdCard'

const meta = {
  title: 'Actividades/IdCard',
  component: IdCard,
  parameters: { stage: true },
  args: {
    name: 'Javier Ruiz',
    job: 'Mozo de almacén de Supermercados Luna',
    description: 'Recibo las mercancías, compruebo los productos y los coloco en las zonas de almacenamiento correspondientes.',
    portrait: fixtures.idPortrait,
  },
  decorators: [
    (Story) => (
      <Positioned top={160} left={400} width={1120} height={520}>
        <Story />
      </Positioned>
    ),
  ],
} satisfies Meta<typeof IdCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
