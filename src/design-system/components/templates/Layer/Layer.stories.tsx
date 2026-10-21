import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Button } from '../../atoms/Button/Button'
import { Positioned } from '../../templates/Positioned/Positioned'
import { Layer } from './Layer'

const meta = {
  title: 'Plantillas/Layer',
  component: Layer,
  parameters: { stage: true },
  args: {
    children: (
      <Positioned center="both">
        <Button onClick={fn()}>Botón dentro de la capa</Button>
      </Positioned>
    ),
  },
} satisfies Meta<typeof Layer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
/** Inert content cannot be focused or clicked (e.g. behind a dialog). */
export const Inert: Story = { args: { inert: true } }
