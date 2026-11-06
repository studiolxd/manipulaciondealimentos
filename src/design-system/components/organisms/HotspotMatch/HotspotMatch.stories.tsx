import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { fixtures } from '../../../docs/fixtures'
import { Positioned } from '../../layout/Positioned/Positioned'
import { TabletFrame } from '../../molecules/TabletFrame/TabletFrame'
import { HotspotMatch } from './HotspotMatch'

const meta = {
  title: 'Organismos/HotspotMatch',
  component: HotspotMatch,
  parameters: { stage: true },
  args: {
    listLabel: 'Las reglas',
    instructions: 'Arrastra cada regla al punto de la imagen, o pulsa una regla y después el punto.',
    items: [
      { id: 'hygiene', label: 'Mantener una buena higiene personal' },
      { id: 'temperature', label: 'Mantener los alimentos a temperaturas seguras' },
      { id: 'cleaning', label: 'Limpiar y desinfectar correctamente los utensilios, equipos e instalaciones' },
    ],
    done: ['cleaning'],
    image: fixtures.kitchen,
    imageAlt: 'Una cocina profesional.',
    spots: [
      { id: 'hands', label: 'Manos del cocinero', x: 420, y: 380, width: 160, height: 150 },
      { id: 'thermometer', label: 'Termómetro de la nevera', x: 1380, y: 110, width: 160, height: 160 },
      { id: 'knives', label: 'Cuchillos colgados en la pared', x: 700, y: 80, width: 300, height: 140 },
    ],
    onAttempt: fn(),
  },
  decorators: [
    (Story) => (
      <Positioned top={130} left={40} width={1840} height={930}>
        <TabletFrame>
          <Story />
        </TabletFrame>
      </Positioned>
    ),
  ],
} satisfies Meta<typeof HotspotMatch>

export default meta
type Story = StoryObj<typeof meta>

/** Drag a rule onto the picture, or pick it and then press a point (Tab reaches the hidden points). */
export const Default: Story = {}
