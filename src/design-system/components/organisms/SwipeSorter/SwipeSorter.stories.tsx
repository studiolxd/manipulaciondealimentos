import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { fn } from 'storybook/test'
import { fixtures } from '../../../docs/fixtures'
import { Button } from '../../atoms/Button/Button'
import { IdCard } from '../../molecules/IdCard/IdCard'
import type { Feedback } from '../../molecules/FeedbackPanel/FeedbackPanel'
import { SwipeSorter } from './SwipeSorter'

const people = [
  { id: 'oscar', name: 'Óscar Fernández', job: 'Cocinero del restaurante El Caserío', handler: true },
  { id: 'elena', name: 'Elena Torres', job: 'Recepcionista de hotel Gold', handler: false },
]

const labels = {
  roleDescription: 'Carnet',
  keyboardHint: 'Pulsa la flecha derecha para SÍ o la flecha izquierda para NO.',
  yes: 'SÍ',
  no: 'NO',
  yesButton: 'SÍ, es manipulador de alimentos',
  noButton: 'NO, no es manipulador de alimentos',
  continue: 'Continuar',
}

const meta = {
  title: 'Organismos/SwipeSorter',
  component: SwipeSorter,
  parameters: { stage: true },
  args: { item: null, feedback: null, labels, onAnswer: fn() },
} satisfies Meta<typeof SwipeSorter>

export default meta
type Story = StoryObj<typeof meta>

/** Answer by dragging, with ← / → or with the side buttons. */
export const Playable: Story = {
  render: function Render(args) {
    const [index, setIndex] = useState(0)
    const [feedback, setFeedback] = useState<Feedback | null>(null)
    const person = people[index]
    return (
      <SwipeSorter
        {...args}
        item={
          person
            ? {
                id: person.id,
                label: person.name,
                description: person.job,
                content: <IdCard name={person.name} job={person.job} description="…" portrait={fixtures.idPortrait} />,
              }
            : null
        }
        feedback={feedback}
        done={<Button onClick={() => setIndex(0)}>Volver a empezar</Button>}
        onAnswer={(direction) => {
          const correct = (direction === 'right') === person.handler
          setFeedback({ tone: correct ? 'positive' : 'negative', title: correct ? '¡Correcto!' : '¡Incorrecto!', message: person.name })
          setIndex(index + 1)
        }}
      />
    )
  },
}
