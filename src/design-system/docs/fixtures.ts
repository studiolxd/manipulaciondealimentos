import type { ImageSource } from '../types'
import testDiningRoom from './assets/test-dining-room.jpg'
import testFacade from './assets/test-facade.jpg'

// Sample images for the documentation, taken from the game placeholders in public/.
const sample = (path: string, width: number, height: number): ImageSource => ({
  src: import.meta.env.BASE_URL + path,
  width,
  height,
})

export const fixtures = {
  // Test backgrounds generated with Magnific, to judge the interface over real-looking scenes.
  testDiningRoom: { src: testDiningRoom, width: 1920, height: 1080 },
  testFacade: { src: testFacade, width: 1920, height: 1080 },
  background: sample('assets/backgrounds/dining-room.png', 1920, 1080),
  tableBackground: sample('assets/backgrounds/dining-table-top.png', 1920, 1080),
  character: sample('assets/characters/david-standing.png', 640, 960),
  idPortrait: sample('assets/cards/oscar.png', 360, 440),
}
