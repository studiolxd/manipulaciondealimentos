import type { Meta, StoryObj } from '@storybook/react-vite'
import { Positioned } from '../../layout/Positioned/Positioned'
import { Heading } from './Heading'

const meta = {
  title: 'Átomos/Heading',
  component: Heading,
  parameters: { stage: true },
  args: { level: 2, children: '¿Quién es manipulador de alimentos?' },
  decorators: [
    (Story) => (
      <Positioned center="both" width={1600}>
        <Story />
      </Positioned>
    ),
  ],
} satisfies Meta<typeof Heading>

export default meta
type Story = StoryObj<typeof meta>

export const Display: Story = { args: { variant: 'display' } }
export const SceneHeading: Story = { args: { variant: 'heading', children: 'Elige tu personaje' } }
export const Subheading: Story = { args: { variant: 'subheading', children: 'Óscar Fernández' } }
