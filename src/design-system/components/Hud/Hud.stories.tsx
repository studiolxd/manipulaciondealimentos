import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { fixtures } from '../../docs/fixtures'
import { HudLabel } from '../HudLabel/HudLabel'
import { IconButton } from '../IconButton/IconButton'
import { Positioned } from '../Positioned/Positioned'
import { SceneFrame } from '../SceneFrame/SceneFrame'
import { Hud } from './Hud'

const meta = {
  title: 'Escenario/Hud',
  component: Hud,
  parameters: { stage: true },
} satisfies Meta<typeof Hud>

export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = {
  render: () => (
    <>
      <SceneFrame heading="Escena" background={fixtures.tableBackground} backgroundAlt="" />
      <Hud />
    </>
  ),
}

/** Scenes place their controls over the band with layer="over-hud". */
export const WithControls: Story = {
  render: () => (
    <>
      <SceneFrame heading="Escena" background={fixtures.tableBackground} backgroundAlt="" />
      <Hud />
      <Positioned top={4} left={24} layer="over-hud">
        <IconButton icon="statement" label="Ver el enunciado" onClick={fn()} />
      </Positioned>
      <Positioned top={0} right={0} layer="over-hud">
        <HudLabel>Tarjeta 3 de 11</HudLabel>
      </Positioned>
    </>
  ),
}
