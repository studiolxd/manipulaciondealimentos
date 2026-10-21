import type { ComponentType } from 'react'
import { AddressFormScene } from './AddressFormScene'
import { ComingSoonScene } from './ComingSoonScene'
import { DiningRoomScene } from './DiningRoomScene'
import { FacadeScene } from './FacadeScene'
import { HandlerDefinitionScene } from './HandlerDefinitionScene'
import { NameFormScene } from './NameFormScene'
import type { SceneId } from './sceneIds'
import { WhoIsFoodHandlerConclusionScene } from './WhoIsFoodHandlerConclusionScene'
import { WelcomeScene } from './WelcomeScene'
import { WhoIsFoodHandlerScene } from './WhoIsFoodHandlerScene'

export const scenes: Record<SceneId, ComponentType> = {
  welcome: WelcomeScene,
  'name-form': NameFormScene,
  'address-form': AddressFormScene,
  facade: FacadeScene,
  'dining-room': DiningRoomScene,
  'handler-definition': HandlerDefinitionScene,
  'who-is-food-handler': WhoIsFoodHandlerScene,
  'who-is-food-handler-conclusion': WhoIsFoodHandlerConclusionScene,
  'coming-soon': ComingSoonScene,
}
