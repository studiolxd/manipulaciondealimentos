import type { Meta, StoryObj } from '@storybook/react-vite'
import { Hud } from '../../organisms/Hud/Hud'
import { Positioned } from '../../templates/Positioned/Positioned'
import { HudLabel } from './HudLabel'

const meta = {
  title: 'Átomos/HudLabel',
  component: HudLabel,
  parameters: { stage: true },
  args: { children: 'Tarjeta 3 de 11' },
  decorators: [
    (Story) => (
      <>
        <Hud />
        <Positioned top={0} right={0} layer="over-hud">
          <Story />
        </Positioned>
      </>
    ),
  ],
} satisfies Meta<typeof HudLabel>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
