export type Gender = 'male' | 'female'

// Picks the word that matches the player's avatar: g('Bienvenido', 'Bienvenida').
export type GenderPick = (male: string, female: string) => string

// Plain strings are the same for everyone; functions adapt to the avatar.
export type GenderedText = string | ((g: GenderPick) => string)

export function resolveText(text: GenderedText, gender: Gender): string {
  if (typeof text === 'string') return text
  return text((male, female) => (gender === 'male' ? male : female))
}
