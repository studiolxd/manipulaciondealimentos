import type { Meta, StoryObj } from '@storybook/react-vite'
import { fixtures } from '../../../docs/fixtures'
import { Positioned } from '../../layout/Positioned/Positioned'
import { SceneFrame } from '../../templates/SceneFrame/SceneFrame'
import { Text } from '../Text/Text'
import { Surface } from './Surface'

const meta = {
  title: 'Átomos/Surface',
  component: Surface,
  parameters: { stage: true },
  args: { tone: 'opaque', padding: 'lg', children: <Text>Base de todos los paneles del juego.</Text> },
  decorators: [
    (Story) => (
      <SceneFrame heading="Superficie" background={fixtures.background} backgroundAlt="">
        <Positioned center="both" width={1000}>
          <Story />
        </Positioned>
      </SceneFrame>
    ),
  ],
} satisfies Meta<typeof Surface>

export default meta
type Story = StoryObj<typeof meta>

export const Opaque: Story = {}
export const Translucent: Story = { args: { tone: 'translucent' } }
export const Paper: Story = { args: { tone: 'paper' } }
export const Highlighted: Story = { args: { tone: 'translucent', highlighted: true } }
/** Speech tail, used by SpeechBubble. */
export const WithTail: Story = { args: { tail: 'left' } }
