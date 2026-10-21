import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Positioned } from '../../templates/Positioned/Positioned'
import { ActivityTitle } from './ActivityTitle'

const meta = {
  title: 'Átomos/ActivityTitle',
  component: ActivityTitle,
  parameters: { stage: true },
  args: { title: '¿Quién es manipulador de alimentos?', onFinished: fn() },
  decorators: [
    (Story) => (
      <Positioned center="both">
        <Story />
      </Positioned>
    ),
  ],
} satisfies Meta<typeof ActivityTitle>

export default meta
type Story = StoryObj<typeof meta>

/** Fades out after the hold duration; reload the story to see it again. */
export const Default: Story = {}
