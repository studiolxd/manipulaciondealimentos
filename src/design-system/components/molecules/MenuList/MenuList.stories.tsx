import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Positioned } from '../../layout/Positioned/Positioned'
import { Surface } from '../../atoms/Surface/Surface'
import { MenuList } from './MenuList'

const meta = {
  title: 'Moléculas/MenuList',
  component: MenuList,
  parameters: { stage: true },
  args: {
    label: 'Ir a una escena',
    items: Array.from({ length: 18 }, (_, i) => ({ value: `scene-${i + 1}`, label: `${i + 1} · scene-${i + 1}` })),
    current: 'scene-4',
    onSelect: fn(),
  },
  decorators: [
    (Story) => (
      <Positioned top={120} center="x" width={1600}>
        <Surface padding="lg">
          <Story />
        </Surface>
      </Positioned>
    ),
  ],
} satisfies Meta<typeof MenuList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
