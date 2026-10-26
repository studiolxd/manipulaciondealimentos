// Scenes in play order. The numbers refer to the "Guion" sheet.
export type SceneId =
  | 'welcome'
  | 'name-form'
  | 'address-form'
  | 'facade' // 1
  | 'dining-room' // 2
  | 'handler-definition' // 3
  | 'who-is-food-handler' // 4 and 5
  | 'who-is-food-handler-conclusion' // 6
  | 'cameras-intro' // 7
  | 'security-cameras' // 8 to 16
  | 'cameras-conclusion' // 17
  | 'kitchen-detectives' // 18 and 19
  | 'detectives-conclusion' // 20
  | 'who-is-affected' // 21 and 22
  | 'who-is-affected-conclusion' // 23
  | 'locker-room-intro' // 24
  | 'locker-room-hygiene' // 25
  | 'health-poster' // 26
  | 'locker-room-conclusion' // 27
  | 'uniform-check' // 28 to 33
  | 'uniform-conclusion' // 34
  | 'coming-soon'

/**
 * How many script scenes each game scene covers. Progress (the SCORM score)
 * is the share of these that the learner has completed; scenes outside the
 * script count 0.
 */
export const sceneProgressWeight: Record<SceneId, number> = {
  welcome: 0,
  'name-form': 0,
  'address-form': 0,
  facade: 1,
  'dining-room': 1,
  'handler-definition': 1,
  'who-is-food-handler': 2,
  'who-is-food-handler-conclusion': 1,
  'cameras-intro': 1,
  'security-cameras': 9,
  'cameras-conclusion': 1,
  'kitchen-detectives': 2,
  'detectives-conclusion': 1,
  'who-is-affected': 2,
  'who-is-affected-conclusion': 1,
  'locker-room-intro': 1,
  'locker-room-hygiene': 1,
  'health-poster': 1,
  'locker-room-conclusion': 1,
  'uniform-check': 6,
  'uniform-conclusion': 1,
  'coming-soon': 0,
}
