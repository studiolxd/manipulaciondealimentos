import type { ComponentType } from 'react'
import { AvatarSelectScene } from './AvatarSelectScene'
import { ComingSoonScene } from './ComingSoonScene'
import { DiningRoomScene } from './DiningRoomScene'
import { FacadeScene } from './FacadeScene'
import { HandlerDefinitionScene } from './HandlerDefinitionScene'
import type { SceneId } from './sceneIds'

export const scenes: Record<SceneId, ComponentType> = {
  'avatar-select': AvatarSelectScene,
  facade: FacadeScene,
  'dining-room': DiningRoomScene,
  'handler-definition': HandlerDefinitionScene,
  'coming-soon': ComingSoonScene,
}
