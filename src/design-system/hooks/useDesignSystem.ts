import { createContext, useContext } from 'react'

/** Interface strings used inside design system components. */
export interface DesignSystemStrings {
  /** Button that advances a speech bubble to its next block. */
  continue: string
  /** Same button while the text is still being typed. */
  showFullText: string
  /** Hidden prefix announcing who speaks, e.g. "David dice:". */
  speakerSays: (speaker: string) => string
}

export interface DesignSystemContextValue {
  strings: DesignSystemStrings
  /** Timed effects (typewriter…) stop while true, e.g. behind the rotate screen. */
  paused: boolean
}

export const DesignSystemContext = createContext<DesignSystemContextValue>({
  strings: { continue: 'Continue', showFullText: 'Show full text', speakerSays: (speaker) => `${speaker} says:` },
  paused: false,
})

export function useDesignSystem(): DesignSystemContextValue {
  return useContext(DesignSystemContext)
}
