import type { Feedback } from '../design-system'

/**
 * Splits a feedback text from the script into its verdict and the rest:
 * "¡Correcto! Las uñas…" → title "¡Correcto!", message "Las uñas…". Texts
 * without a leading exclamation are all message.
 */
export function feedback(tone: Feedback['tone'], text: string): Feedback {
  const match = /^(¡[^!]+!)\s+([\s\S]+)$/.exec(text)
  return match ? { tone, title: match[1], message: match[2] } : { tone, message: text }
}
