import type { Meta, StoryObj } from '@storybook/react-vite'
import { fixtures } from '../../../docs/fixtures'
import { Image } from '../../atoms/Image/Image'
import { Positioned } from '../../layout/Positioned/Positioned'
import { TabletFrame } from './TabletFrame'

const meta = {
  title: 'Moléculas/TabletFrame',
  component: TabletFrame,
  parameters: { stage: true },
  args: { children: <Image source={fixtures.kitchen} alt="" fit="cover" /> },
  decorators: [
    (Story) => (
      <Positioned top={150} left={160} width={1600} height={880}>
        <Story />
      </Positioned>
    ),
  ],
} satisfies Meta<typeof TabletFrame>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
