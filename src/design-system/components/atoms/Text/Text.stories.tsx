import type { Meta, StoryObj } from '@storybook/react-vite'
import { NarrationBox } from '../../molecules/NarrationBox/NarrationBox'
import { Positioned } from '../../templates/Positioned/Positioned'
import { Text } from './Text'

const meta = {
  title: 'Átomos/Text',
  component: Text,
  parameters: { stage: true },
  args: { children: 'Un manipulador de alimentos es cualquier persona que, por su trabajo, entra en contacto con alimentos.' },
  decorators: [
    (Story) => (
      <Positioned center="both" width={1200}>
        <NarrationBox>
          <Story />
        </NarrationBox>
      </Positioned>
    ),
  ],
} satisfies Meta<typeof Text>

export default meta
type Story = StoryObj<typeof meta>

export const Body: Story = {}
export const BodySmall: Story = { args: { size: 'body-sm' } }
export const Bold: Story = { args: { weight: 'bold' } }
