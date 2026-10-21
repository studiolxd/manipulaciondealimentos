import type { ImageSource } from '../types'

// Sample images for the documentation, taken from the game placeholders in public/.
const sample = (path: string, width: number, height: number): ImageSource => ({
  src: import.meta.env.BASE_URL + path,
  width,
  height,
})

export const fixtures = {
  background: sample('assets/backgrounds/dining-room.png', 1920, 1080),
  tableBackground: sample('assets/backgrounds/dining-table-top.png', 1920, 1080),
  character: sample('assets/characters/david-standing.png', 640, 960),
  idPortrait: sample('assets/cards/oscar.png', 360, 440),
}
