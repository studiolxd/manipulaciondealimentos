import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { fixtures } from '../../../docs/fixtures'
import { Label } from '../../atoms/Label/Label'
import { IconButton } from '../../molecules/IconButton/IconButton'
import { SceneFrame } from '../../templates/SceneFrame/SceneFrame'
import { Hud } from './Hud'

const meta = {
  title: 'Organismos/Hud',
  component: Hud,
  parameters: { stage: true },
  decorators: [
    (Story) => (
      <SceneFrame heading="Escena" background={fixtures.tableBackground} backgroundAlt="">
        <Story />
      </SceneFrame>
    ),
  ],
} satisfies Meta<typeof Hud>

export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = {}
export const WithControls: Story = {
  args: {
    start: <IconButton icon="statement" label="Ver el enunciado" onClick={fn()} />,
    end: <Label tone="inverse">Tarjeta 3 de 11</Label>,
  },
}
