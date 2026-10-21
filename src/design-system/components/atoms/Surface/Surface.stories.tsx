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
/** The narrator's dark panel. */
export const Ink: Story = { args: { tone: 'ink' } }
export const Paper: Story = { args: { tone: 'paper' } }
export const Highlighted: Story = { args: { highlighted: true } }
export const AccentPositive: Story = { args: { accent: 'positive' } }
export const AccentNegative: Story = { args: { accent: 'negative' } }
/** Speech tail, used by SpeechBubble. */
export const WithTail: Story = { args: { tail: 'left' } }
