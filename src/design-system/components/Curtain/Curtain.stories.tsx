import type { Meta, StoryObj } from '@storybook/react-vite'
import { fixtures } from '../../docs/fixtures'
import { SceneFrame } from '../SceneFrame/SceneFrame'
import { Curtain } from './Curtain'

const meta = {
  title: 'Escenario/Curtain',
  component: Curtain,
  parameters: { stage: true },
  args: { closed: true },
  render: (args) => (
    <>
      <SceneFrame heading="Escena" background={fixtures.background} backgroundAlt="" />
      <Curtain {...args} />
    </>
  ),
} satisfies Meta<typeof Curtain>

export default meta
type Story = StoryObj<typeof meta>

/** Toggle `closed` in the controls to see the fade. */
export const Closed: Story = {}
export const Open: Story = { args: { closed: false } }
