import type { ReactNode } from 'react'
import { Surface } from '../../atoms/Surface/Surface'
import { Text } from '../../atoms/Text/Text'
import styles from './PromptPanel.module.css'

interface PromptPanelProps {
  /** The question or instruction, centred above the content. */
  prompt: string
  children: ReactNode
}

// Surface + Text: a white panel with a prompt and, under it, the controls that
// answer it (e.g. a row of OptionButtons). The scene names itself with a
// heading, so the visible prompt is hidden from screen readers.
export function PromptPanel({ prompt, children }: PromptPanelProps) {
  return (
    <Surface tone="opaque" padding="lg">
      <div className={styles.panel}>
        <div className={styles.prompt} aria-hidden="true">
          <Text>{prompt}</Text>
        </div>
        {children}
      </div>
    </Surface>
  )
}
