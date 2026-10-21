import type { Meta, StoryObj } from '@storybook/react-vite'
import { fixtures } from '../../docs/fixtures'
import { NarrationBox } from '../NarrationBox/NarrationBox'
import { Positioned } from '../Positioned/Positioned'
import { SceneFrame } from '../SceneFrame/SceneFrame'
import { Text } from '../Text/Text'
import { Stage } from './Stage'

const meta = {
  title: 'Escenario/Stage',
  component: Stage,
  args: { fit: 'container', landmark: false, children: null },
} satisfies Meta<typeof Stage>

export default meta
type Story = StoryObj<typeof meta>

/** 1920×1080 canvas scaled to fit its container; resize the window to see the scaling. */
export const Default: Story = {
  render: (args) => (
    <Stage {...args}>
      <SceneFrame heading="Escenario" background={fixtures.background} backgroundAlt="">
        <Positioned center="both" width={1200}>
          <NarrationBox>
            <Text>Todo se maqueta en píxeles de escenario (1920×1080).</Text>
          </NarrationBox>
        </Positioned>
      </SceneFrame>
    </Stage>
  ),
}
