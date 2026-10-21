import type { Meta, StoryObj } from '@storybook/react-vite'
import { VisuallyHidden } from './VisuallyHidden'

const meta = {
  title: 'Átomos/VisuallyHidden',
  component: VisuallyHidden,
  args: { children: 'Solo lo leen los lectores de pantalla.' },
} satisfies Meta<typeof VisuallyHidden>

export default meta
type Story = StoryObj<typeof meta>

/** Nothing is visible: the text is only in the accessibility tree. */
export const Default: Story = {}
