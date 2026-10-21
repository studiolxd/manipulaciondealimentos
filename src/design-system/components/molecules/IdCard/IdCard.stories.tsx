import type { Meta, StoryObj } from '@storybook/react-vite'
import { fixtures } from '../../../docs/fixtures'
import { Positioned } from '../../layout/Positioned/Positioned'
import { IdCard } from './IdCard'

const meta = {
  title: 'Moléculas/IdCard',
  component: IdCard,
  parameters: { stage: true },
  args: {
    name: 'Javier Ruiz',
    job: 'Mozo de almacén',
    company: 'Supermercados Luna',
    description: 'Recibo las mercancías, compruebo los productos y los coloco en las zonas de almacenamiento correspondientes.',
    portrait: fixtures.idPortrait,
  },
  decorators: [
    (Story) => (
      <Positioned top={160} left={580} width={760} height={840}>
        <Story />
      </Positioned>
    ),
  ],
} satisfies Meta<typeof IdCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
/** Without a company, the job is followed by the description. */
export const WithoutCompany: Story = { args: { name: 'Carmen Díaz', job: 'Personal de limpieza', company: undefined } }
