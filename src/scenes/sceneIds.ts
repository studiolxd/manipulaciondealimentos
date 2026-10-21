// Scenes in play order. The numbers refer to the "Guion" sheet.
export type SceneId =
  | 'name-form'
  | 'address-form'
  | 'facade' // 1
  | 'dining-room' // 2
  | 'handler-definition' // 3
  | 'who-is-food-handler' // 4 and 5
  | 'who-is-food-handler-conclusion' // 6
  | 'coming-soon'

/**
 * How many script scenes each game scene covers. Progress (the SCORM score)
 * is the share of these that the learner has completed; scenes outside the
 * script count 0.
 */
export const sceneProgressWeight: Record<SceneId, number> = {
  'name-form': 0,
  'address-form': 0,
  facade: 1,
  'dining-room': 1,
  'handler-definition': 1,
  'who-is-food-handler': 2,
  'who-is-food-handler-conclusion': 1,
  'coming-soon': 0,
}
