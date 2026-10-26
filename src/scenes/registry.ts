import type { ComponentType } from 'react'
import { AddressFormScene } from './AddressFormScene'
import { ComingSoonScene } from './ComingSoonScene'
import {
  CamerasConclusionScene,
  CamerasIntroScene,
  DetectivesConclusionScene,
  LockerRoomConclusionScene,
  LockerRoomHygieneScene,
  LockerRoomIntroScene,
  UniformConclusionScene,
  WhoIsAffectedConclusionScene,
} from './dialogueScenes'
import { HealthPosterScene } from './HealthPosterScene'
import { KitchenDetectivesScene } from './KitchenDetectivesScene'
import { DiningRoomScene } from './DiningRoomScene'
import { FacadeScene } from './FacadeScene'
import { HandlerDefinitionScene } from './HandlerDefinitionScene'
import { NameFormScene } from './NameFormScene'
import type { SceneId } from './sceneIds'
import { SecurityCamerasScene } from './SecurityCamerasScene'
import { UniformCheckScene } from './UniformCheckScene'
import { WhoIsFoodHandlerConclusionScene } from './WhoIsFoodHandlerConclusionScene'
import { WelcomeScene } from './WelcomeScene'
import { WhoIsAffectedScene } from './WhoIsAffectedScene'
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
  'cameras-intro': CamerasIntroScene,
  'security-cameras': SecurityCamerasScene,
  'cameras-conclusion': CamerasConclusionScene,
  'kitchen-detectives': KitchenDetectivesScene,
  'detectives-conclusion': DetectivesConclusionScene,
  'who-is-affected': WhoIsAffectedScene,
  'who-is-affected-conclusion': WhoIsAffectedConclusionScene,
  'locker-room-intro': LockerRoomIntroScene,
  'locker-room-hygiene': LockerRoomHygieneScene,
  'health-poster': HealthPosterScene,
  'locker-room-conclusion': LockerRoomConclusionScene,
  'uniform-check': UniformCheckScene,
  'uniform-conclusion': UniformConclusionScene,
  'coming-soon': ComingSoonScene,
}
