import { useState } from 'react'
import { Button } from '../../atoms/Button/Button'
import { Surface } from '../../atoms/Surface/Surface'
import { Text } from '../../atoms/Text/Text'
import { RadioOption } from '../../molecules/RadioOption/RadioOption'
import styles from './QuestionPanel.module.css'

interface QuestionPanelProps {
  /** Unique within the scene, for the radio group. */
  name: string
  question: string
  answers: string[]
  /** Button that checks the chosen answer, e.g. "Comprobar". */
  checkLabel: string
  onAnswer: (index: number) => void
}

// Surface + RadioOptions + Button: a question with its answers one under the
// other. The player chooses one and checks it; the button appears once there
// is a choice. It never grows taller than its container: if the answers do
// not fit, they scroll and the button stays in view.
export function QuestionPanel({ name, question, answers, checkLabel, onAnswer }: QuestionPanelProps) {
  const [choice, setChoice] = useState<number | null>(null)
  return (
    <Surface tone="opaque" padding="md" className={styles.panel}>
      <fieldset className={styles.group}>
        <legend className={styles.legend}>
          <Text size="body-sm" weight="bold">
            {question}
          </Text>
        </legend>
        <div className={styles.answers}>
          {answers.map((answer, index) => (
            <RadioOption
              key={answer}
              name={name}
              value={String(index)}
              label={answer}
              checked={choice === index}
              onChange={() => setChoice(index)}
            />
          ))}
        </div>
      </fieldset>
      {choice !== null && (
        <div className={styles.check}>
          <Button onClick={() => onAnswer(choice)}>{checkLabel}</Button>
        </div>
      )}
    </Surface>
  )
}
