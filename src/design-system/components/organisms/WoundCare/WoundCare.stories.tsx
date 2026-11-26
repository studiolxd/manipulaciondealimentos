import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { fixtures } from '../../../docs/fixtures'
import { WoundCare } from './WoundCare'

const meta = {
  title: 'Organismos/WoundCare',
  component: WoundCare,
  parameters: { stage: true },
  args: {
    images: {
      hands: fixtures.kitchen,
      cotton: fixtures.worker,
      bottle: fixtures.worker,
      dressing: fixtures.worker,
      scissors: fixtures.worker,
      glove: fixtures.worker,
    },
    labels: {
      hands: 'Manos',
      wound: 'Herida',
      cotton: 'Algodón',
      bottle: 'Bote de desinfectante de heridas',
      dressing: 'Apósito',
      scissors: 'Tijeras',
      glove: 'Guante de un solo uso',
    },
    onStepDone: fn(),
    onComplete: fn(),
  },
} satisfies Meta<typeof WoundCare>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
