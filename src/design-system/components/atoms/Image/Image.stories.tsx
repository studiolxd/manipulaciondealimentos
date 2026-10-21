import type { Meta, StoryObj } from '@storybook/react-vite'
import { fixtures } from '../../../docs/fixtures'
import { Positioned } from '../../templates/Positioned/Positioned'
import { Image } from './Image'

const meta = {
  title: 'Átomos/Image',
  component: Image,
  parameters: { stage: true },
  args: { source: fixtures.character, alt: 'David, el encargado.' },
  decorators: [
    (Story) => (
      <Positioned bottom={0} left={120}>
        <Story />
      </Positioned>
    ),
  ],
} satisfies Meta<typeof Image>

export default meta
type Story = StoryObj<typeof meta>

export const IntrinsicSize: Story = {}
/** With only a height, the aspect ratio is kept. */
export const FixedHeight: Story = { args: { height: 600 } }
