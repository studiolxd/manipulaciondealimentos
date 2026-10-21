import type { Meta, StoryObj } from '@storybook/react-vite'
import { Text } from '../../atoms/Text/Text'
import { NarrationBox } from '../../molecules/NarrationBox/NarrationBox'
import { Positioned } from './Positioned'

const meta = {
  title: 'Layout/Positioned',
  component: Positioned,
  parameters: { stage: true },
  args: { children: null },
} satisfies Meta<typeof Positioned>

export default meta
type Story = StoryObj<typeof meta>

const box = (label: string) => (
  <NarrationBox>
    <Text>{label}</Text>
  </NarrationBox>
)

/** Distances and sizes in stage pixels on the 1920×1080 stage. */
export const Placements: Story = {
  render: () => (
    <>
      <Positioned top={40} left={40}>
        {box('top 40 · left 40')}
      </Positioned>
      <Positioned bottom={40} right={40}>
        {box('bottom 40 · right 40')}
      </Positioned>
      <Positioned center="both" width={900}>
        {box('center both · width 900')}
      </Positioned>
    </>
  ),
}
