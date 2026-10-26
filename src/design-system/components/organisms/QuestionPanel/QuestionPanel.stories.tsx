import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Positioned } from '../../layout/Positioned/Positioned'
import { QuestionPanel } from './QuestionPanel'

const meta = {
  title: 'Organismos/QuestionPanel',
  component: QuestionPanel,
  parameters: { stage: true },
  args: {
    name: 'demo',
    question: '¿Por qué es importante que el manipulador se lave las manos antes de manipular los alimentos?',
    answers: [
      'Porque los alimentos tendrán mejor aspecto.',
      'Porque puede transferir microorganismos al alimento.',
      'Porque terminará antes la preparación.',
      'Porque evitará que el alimento se enfríe.',
    ],
    checkLabel: 'Comprobar',
    onAnswer: fn(),
  },
  decorators: [
    (Story) => (
      <Positioned top={80} center="x" width={1200}>
        <Story />
      </Positioned>
    ),
  ],
} satisfies Meta<typeof QuestionPanel>

export default meta
type Story = StoryObj<typeof meta>

/** Choose an answer: "Comprobar" appears. */
export const MultipleChoice: Story = {}
export const YesNo: Story = { args: { question: '¿Supone un riesgo para la seguridad alimentaria?', answers: ['Sí', 'No'] } }
