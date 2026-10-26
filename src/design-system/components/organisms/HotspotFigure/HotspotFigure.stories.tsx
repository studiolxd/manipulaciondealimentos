import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { fixtures } from '../../../docs/fixtures'
import { Positioned } from '../../layout/Positioned/Positioned'
import { HotspotFigure } from './HotspotFigure'

const watch = { id: 'watch', label: 'Muñeca', x: 40, y: 540, width: 70, height: 60 }

const meta = {
  title: 'Organismos/HotspotFigure',
  component: HotspotFigure,
  parameters: { stage: true },
  args: {
    image: fixtures.worker,
    label: 'Personaje 2',
    spots: [{ ...watch, fixed: false, problem: fixtures.workerWatch, corrected: fixtures.workerNoWatch }],
    zooms: [{ id: 'left', label: 'Ver de cerca las manos', x: 75, y: 650 }],
    onSpot: fn(),
    onMiss: fn(),
    onZoom: fn(),
  },
  decorators: [
    (Story) => (
      <Positioned top={100} center="x" width={380}>
        <Story />
      </Positioned>
    ),
  ],
} satisfies Meta<typeof HotspotFigure>

export default meta
type Story = StoryObj<typeof meta>

/** Press the wrist to correct it; anywhere else is a miss. */
export const ToCorrect: Story = {}
/** The corrected layer replaces the problem one. */
export const Corrected: Story = {
  args: { spots: [{ ...watch, fixed: true, problem: fixtures.workerWatch, corrected: fixtures.workerNoWatch }] },
}
/** Everything corrected: black and white, no longer pressable. */
export const Done: Story = {
  args: {
    done: true,
    spots: [{ ...watch, fixed: true, problem: fixtures.workerWatch, corrected: fixtures.workerNoWatch }],
  },
}
