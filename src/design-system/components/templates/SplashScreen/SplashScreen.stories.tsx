import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { SplashScreen } from './SplashScreen'

const meta = {
  title: 'Plantillas/SplashScreen',
  component: SplashScreen,
  args: { onFinished: fn() },
} satisfies Meta<typeof SplashScreen>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
