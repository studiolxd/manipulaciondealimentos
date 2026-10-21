import type { Meta, StoryObj } from '@storybook/react-vite'
import { fixtures } from '../../../docs/fixtures'
import { SceneFrame } from './SceneFrame'

const meta = {
  title: 'Plantillas/SceneFrame',
  component: SceneFrame,
  parameters: { stage: true },
  args: {
    heading: 'Salón comedor',
    background: fixtures.background,
    backgroundAlt: 'Salón comedor del restaurante, aún cerrado y vacío.',
  },
} satisfies Meta<typeof SceneFrame>

export default meta
type Story = StoryObj<typeof meta>

/** The heading exists for screen readers only. */
export const HiddenHeading: Story = {}
export const VisibleHeading: Story = { args: { heading: 'Elige tu personaje', visibleHeadingTop: 64 } }
