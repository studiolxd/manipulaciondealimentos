import { createGame } from '@studiolxd/tramoya'
import { tokens } from '../design-system'
import { sceneProgressWeight, type SceneId } from '../scenes/sceneIds'
import { tracking } from './tracking'

export const { GameProvider, useGame, CurrentScene, isSceneId } = createGame<SceneId>({
  progressWeight: sceneProgressWeight,
  // Inside an LMS the name comes from it; otherwise the player types it first.
  initialScene: ({ lmsName }) => (lmsName ? 'address-form' : 'name-form'),
  // Shown on every load: from it the player begins or continues.
  titleScene: 'welcome',
  // Each half of a scene change; the stage curtain animates with the same token.
  transitionMs: tokens['stage.fade-duration'],
  tracking,
})
