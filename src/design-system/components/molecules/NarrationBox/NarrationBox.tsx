import type { ReactNode } from 'react'
import { useVoice } from '../../../hooks/useVoice'
import { Surface } from '../../atoms/Surface/Surface'
import styles from './NarrationBox.module.css'

interface NarrationBoxProps {
  /** Optional shortcut, e.g. to skip a typing animation. Not a substitute for a real control. */
  onClick?: () => void
  /** Voice-over read by the narrator while the box is shown: the URLs of its clips, in order. */
  voice?: readonly string[]
  /** Usually Text or Typewriter. */
  children: ReactNode
}

// Surface (ink) + text: the narrator's voice, a dark panel unlike the light speech bubbles.
export function NarrationBox({ onClick, voice, children }: NarrationBoxProps) {
  useVoice(voice)
  return (
    <Surface tone="ink" padding="xl" className={onClick ? styles.clickable : undefined} onClick={onClick}>
      {children}
    </Surface>
  )
}
