import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { fixtures } from '../../../docs/fixtures'
import { Positioned } from '../../layout/Positioned/Positioned'
import { TabletFrame } from '../../molecules/TabletFrame/TabletFrame'
import { MediaGallery } from './MediaGallery'

const meta = {
  title: 'Organismos/MediaGallery',
  component: MediaGallery,
  parameters: { stage: true },
  args: {
    label: 'Grabaciones de las cámaras',
    doneLabel: 'revisada',
    items: Array.from({ length: 8 }, (_, i) => ({
      id: `video-${i + 1}`,
      label: `Cámara ${i + 1}`,
      thumbnail: fixtures.cameraThumbnail,
      done: i < 3,
    })),
    onOpen: fn(),
  },
  decorators: [
    (Story) => (
      <Positioned top={150} left={160} width={1600} height={880}>
        <TabletFrame>
          <Story />
        </TabletFrame>
      </Positioned>
    ),
  ],
} satisfies Meta<typeof MediaGallery>

export default meta
type Story = StoryObj<typeof meta>

/** On the tablet, three recordings already seen. */
export const OnTablet: Story = {}
