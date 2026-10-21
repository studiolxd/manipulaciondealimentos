import type { ComponentType } from 'react'
import { AvatarSelectScene } from './AvatarSelectScene'
import { ComingSoonScene } from './ComingSoonScene'
import { DiningRoomScene } from './DiningRoomScene'
import { FacadeScene } from './FacadeScene'
import { HandlerDefinitionScene } from './HandlerDefinitionScene'
import type { SceneId } from './sceneIds'
import { WhoIsFoodHandlerConclusionScene } from './WhoIsFoodHandlerConclusionScene'
import { WhoIsFoodHandlerScene } from './WhoIsFoodHandlerScene'

interface SceneDefinition {
  component: ComponentType
  /** Shows the top HUD band. */
  hud?: boolean
}

export const scenes: Record<SceneId, SceneDefinition> = {
  'avatar-select': { component: AvatarSelectScene },
  facade: { component: FacadeScene },
  'dining-room': { component: DiningRoomScene },
  'handler-definition': { component: HandlerDefinitionScene },
  'who-is-food-handler': { component: WhoIsFoodHandlerScene, hud: true },
  'who-is-food-handler-conclusion': { component: WhoIsFoodHandlerConclusionScene, hud: true },
  'coming-soon': { component: ComingSoonScene, hud: true },
}
