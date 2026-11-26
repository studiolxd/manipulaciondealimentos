import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { fixtures } from '../../../docs/fixtures'
import { HandWashing } from './HandWashing'

const meta = {
  title: 'Organismos/HandWashing',
  component: HandWashing,
  parameters: { stage: true },
  args: {
    images: { hands: fixtures.kitchen, soap: fixtures.worker, towel: fixtures.worker },
    labels: {
      checklistTitle: 'Lavado de manos',
      steps: [
        'Mojar las manos con agua potable.',
        'Aplicar jabón líquido suficiente.',
        'Frotar durante al menos 20 segundos.',
        'Limpiar palmas, dorso, dedos, yemas, pulgares, uñas y muñecas.',
        'Aclarar completamente con agua corriente.',
        'Secar bien las manos con papel desechable.',
      ],
      hints: [
        'Arrastra las manos hasta el grifo y mantén pulsado hasta que el agua las cubra.',
        'Pulsa el dosificador de jabón y arrastra el jabón hasta las manos.',
        'Frota las palmas entre sí con movimientos circulares y rápidos.',
        '',
        'Arrastra de nuevo las manos hasta el grifo y mantén pulsado hasta que desaparezca la espuma.',
        'Coge una toalla de papel y frótala sobre las manos de arriba abajo.',
      ],
      zones: [
        { label: 'Palmas', hint: 'Haz círculos amplios con ambas manos enfrentadas.' },
        { label: 'Dorso', hint: 'Mueve una mano de arriba abajo sobre la otra.' },
        { label: 'Uñas', hint: 'Frota las uñas contra la palma contraria.' },
      ],
      hands: 'Manos',
      tap: 'Grifo',
      soap: 'Dosificador de jabón',
      droplet: 'Jabón',
      towel: 'Toalla de papel',
      seconds: (done: number, total: number) => `${done} de ${total} segundos`,
      zone: (current: number, total: number) => `Zona ${current} de ${total}`,
    },
    onStepDone: fn(),
    onWrongOrder: fn(),
    onComplete: fn(),
  },
} satisfies Meta<typeof HandWashing>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
