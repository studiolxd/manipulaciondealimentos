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
  ContaminationIntroScene,
  FirstAidConclusionScene,
  NotebookConclusionScene,
  FirstAidIntroScene,
  HandWashingConclusionScene,
  WoundCareConclusionScene,
  ShouldYouWashConclusionScene,
  UniformConclusionScene,
  WhoIsAffectedConclusionScene,
} from './dialogueScenes'
import { FirstAidNoteScene } from './FirstAidNoteScene'
import { NotebookPage1Scene, NotebookPage2Scene } from './NotebookScenes'
import { HandWashingScene } from './HandWashingScene'
import { HealthPosterScene } from './HealthPosterScene'
import { KitchenDetectivesScene } from './KitchenDetectivesScene'
import { DiningRoomScene } from './DiningRoomScene'
import { FacadeScene } from './FacadeScene'
import { HandlerDefinitionScene } from './HandlerDefinitionScene'
import { NameFormScene } from './NameFormScene'
import type { SceneId } from './sceneIds'
import { SecurityCamerasScene } from './SecurityCamerasScene'
import { ShouldYouWashScene } from './ShouldYouWashScene'
import { UniformCheckScene } from './UniformCheckScene'
import { WhoIsFoodHandlerConclusionScene } from './WhoIsFoodHandlerConclusionScene'
import { WoundCareScene } from './WoundCareScene'
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
  'hand-washing': HandWashingScene,
  'hand-washing-conclusion': HandWashingConclusionScene,
  'should-you-wash': ShouldYouWashScene,
  'should-you-wash-conclusion': ShouldYouWashConclusionScene,
  'first-aid-intro': FirstAidIntroScene,
  'first-aid-note': FirstAidNoteScene,
  'first-aid-conclusion': FirstAidConclusionScene,
  'wound-care': WoundCareScene,
  'wound-care-conclusion': WoundCareConclusionScene,
  'contamination-intro': ContaminationIntroScene,
  'notebook-page-1': NotebookPage1Scene,
  'notebook-page-2': NotebookPage2Scene,
  'notebook-conclusion': NotebookConclusionScene,
  'coming-soon': ComingSoonScene,
}
