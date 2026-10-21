import type { Meta, StoryObj } from '@storybook/react-vite'
import { Positioned } from '../../layout/Positioned/Positioned'
import { InlineAlert } from './InlineAlert'

const meta = {
  title: 'Moléculas/InlineAlert',
  component: InlineAlert,
  parameters: { stage: true },
  args: { message: 'Elige un personaje para continuar.' },
  decorators: [
    (Story) => (
      <Positioned center="both" width={1600}>
        <Story />
      </Positioned>
    ),
  ],
} satisfies Meta<typeof InlineAlert>

export default meta
type Story = StoryObj<typeof meta>

export const WithMessage: Story = {}
export const Empty: Story = { args: { message: null } }
