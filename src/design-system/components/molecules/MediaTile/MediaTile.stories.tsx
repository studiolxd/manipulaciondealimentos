import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { fixtures } from '../../../docs/fixtures'
import { Positioned } from '../../layout/Positioned/Positioned'
import { MediaTile } from './MediaTile'

const meta = {
  title: 'Moléculas/MediaTile',
  component: MediaTile,
  parameters: { stage: true },
  args: { thumbnail: fixtures.cameraThumbnail, label: 'Cámara 1', doneLabel: 'revisada', onOpen: fn() },
  decorators: [
    (Story) => (
      <Positioned center="both" width={480}>
        <Story />
      </Positioned>
    ),
  ],
} satisfies Meta<typeof MediaTile>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
/** Seen already: black and white, no longer pressable. */
export const Done: Story = { args: { done: true } }
