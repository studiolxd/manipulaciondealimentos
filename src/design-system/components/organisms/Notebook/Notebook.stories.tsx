import type { Meta, StoryObj } from '@storybook/react-vite'
import { Positioned } from '../../layout/Positioned/Positioned'
import { Notebook } from './Notebook'

const meta = {
  title: 'Organismos/Notebook',
  component: Notebook,
  parameters: { stage: true },
  args: {
    label: 'Libreta de apuntes',
    left: [
      { kind: 'title', text: 'Contaminación física' },
      { kind: 'text', text: 'Se produce cuando aparece en el alimento un objeto que no debería estar presente.' },
      { kind: 'list', items: ['Cabellos.', 'Trozos de vidrio.', 'Joyas u otros objetos personales.'] },
    ],
    right: [
      { kind: 'title', text: 'Contaminación química' },
      { kind: 'text', text: 'Se produce cuando un alimento entra en contacto con una sustancia química perjudicial.' },
      { kind: 'list', items: ['Detergentes y desinfectantes.', 'Productos para el control de plagas.'] },
    ],
  },
  decorators: [
    (Story) => (
      <Positioned top={90} center="x" width={1700} height={900}>
        <Story />
      </Positioned>
    ),
  ],
} satisfies Meta<typeof Notebook>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const BlankLeftPage: Story = { args: { left: null } }
