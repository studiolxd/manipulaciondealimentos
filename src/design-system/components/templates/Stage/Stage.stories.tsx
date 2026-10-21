import type { Meta, StoryObj } from '@storybook/react-vite'
import { fixtures } from '../../../docs/fixtures'
import { Text } from '../../atoms/Text/Text'
import { Positioned } from '../../layout/Positioned/Positioned'
import { NarrationBox } from '../../molecules/NarrationBox/NarrationBox'
import { SceneFrame } from '../SceneFrame/SceneFrame'
import { Stage } from './Stage'

const meta = {
  title: 'Plantillas/Stage',
  component: Stage,
  args: { fit: 'container', landmark: false, curtainClosed: false, children: null },
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
} satisfies Meta<typeof Stage>

export default meta
type Story = StoryObj<typeof meta>

/** 1920×1080 canvas scaled to fit its container; resize the window to see the scaling. */
export const Default: Story = {}
/** Toggle `curtainClosed` to see the fade between scenes. */
export const CurtainClosed: Story = { args: { curtainClosed: true } }
