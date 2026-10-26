import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { fixtures } from '../../../docs/fixtures'
import { Positioned } from '../../layout/Positioned/Positioned'
import { Video } from './Video'

const meta = {
  title: 'Átomos/Video',
  component: Video,
  parameters: { stage: true },
  args: { source: fixtures.cameraVideo, label: 'Cámara 1', onEnded: fn() },
  decorators: [
    (Story) => (
      <Positioned center="both" width={1280} height={720}>
        <Story />
      </Positioned>
    ),
  ],
} satisfies Meta<typeof Video>

export default meta
type Story = StoryObj<typeof meta>

export const Playing: Story = {}
/** With the veil, while a question is asked over the frozen frame. */
export const Dimmed: Story = { args: { dimmed: true } }
