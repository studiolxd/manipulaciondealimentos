import type { Meta, StoryObj } from '@storybook/react-vite'
import { fixtures } from '../../../docs/fixtures'
import { Label } from '../../atoms/Label/Label'
import { Text } from '../../atoms/Text/Text'
import { Positioned } from '../../layout/Positioned/Positioned'
import { NarrationBox } from '../../molecules/NarrationBox/NarrationBox'
import { ActivityScene } from './ActivityScene'

const meta = {
  title: 'Plantillas/ActivityScene',
  component: ActivityScene,
  parameters: { stage: true },
  args: {
    heading: '¿Quién es manipulador de alimentos?',
    background: fixtures.tableBackground,
    backgroundAlt: 'La mesa del comedor vista desde arriba.',
    ready: true,
    title: '¿Quién es manipulador de alimentos?',
    statement: {
      speaker: 'David',
      blocks: ['No todos los manipuladores de alimentos son cocineros.', '¡Adelante, detective!'],
      label: 'Enunciado de la actividad',
      openLabel: 'Ver el enunciado',
      closeLabel: 'Cerrar el enunciado',
    },
    hudEnd: <Label tone="inverse">Tarjeta 1 de 11</Label>,
    children: (
      <Positioned center="both" width={1200}>
        <NarrationBox>
          <Text>Aquí va la actividad.</Text>
        </NarrationBox>
      </Positioned>
    ),
  },
} satisfies Meta<typeof ActivityScene>

export default meta
type Story = StoryObj<typeof meta>

/** Title → statement (click through it) → activity, with the statement reopenable from the HUD. */
export const Default: Story = {}
