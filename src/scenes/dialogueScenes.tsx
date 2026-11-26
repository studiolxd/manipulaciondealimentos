import { contaminationIntro, notebookConclusion } from '../content/contamination'
import { firstAidConclusion, firstAidIntro } from '../content/firstAid'
import { handWashingConclusion } from '../content/handWashing'
import { detectivesConclusion } from '../content/kitchenDetectives'
import { lockerRoom1, lockerRoom2, lockerRoomConclusion } from '../content/lockerRoom'
import { camerasConclusion, camerasIntro } from '../content/securityCameras'
import { shouldYouWashConclusion } from '../content/shouldYouWash'
import { uniformConclusion } from '../content/uniformCheck'
import { whoIsAffectedConclusion } from '../content/whoIsAffected'
import { woundCareConclusion } from '../content/woundCare'
import { StandingDavidScene } from './StandingDavidScene'

// Scenes where David, standing, talks to the player between activities.

// Scene 7: the reception and its tablet.
export function CamerasIntroScene() {
  return <StandingDavidScene content={camerasIntro} background="receptionBackground" side="right" next="security-cameras" />
}

// Scene 17
export function CamerasConclusionScene() {
  return (
    <StandingDavidScene content={camerasConclusion} background="receptionBackground" side="right" next="kitchen-detectives" />
  )
}

// Scene 20
export function DetectivesConclusionScene() {
  return (
    <StandingDavidScene content={detectivesConclusion} background="receptionBackground" side="right" next="who-is-affected" />
  )
}

// Scene 23
export function WhoIsAffectedConclusionScene() {
  return (
    <StandingDavidScene
      content={whoIsAffectedConclusion}
      background="receptionBackground"
      side="right"
      next="locker-room-intro"
    />
  )
}

// Scene 24: David by the door of the changing room.
export function LockerRoomIntroScene() {
  return <StandingDavidScene content={lockerRoom1} background="lockerRoomBackground" side="right" next="locker-room-hygiene" />
}

// Scene 25: David on the left, so he can point at the poster on the right.
export function LockerRoomHygieneScene() {
  return <StandingDavidScene content={lockerRoom2} background="lockerRoomBackground" side="left" next="health-poster" />
}

// Scene 27
export function LockerRoomConclusionScene() {
  return (
    <StandingDavidScene content={lockerRoomConclusion} background="lockerRoomBackground" side="right" next="uniform-check" />
  )
}

// Scene 34
export function UniformConclusionScene() {
  return <StandingDavidScene content={uniformConclusion} background="lockerRoomBackground" side="right" next="hand-washing" />
}

// Scene 37: David by the kitchen sink.
export function HandWashingConclusionScene() {
  return (
    <StandingDavidScene content={handWashingConclusion} background="kitchenSinkBackground" side="right" next="should-you-wash" />
  )
}

// Scene 40
export function ShouldYouWashConclusionScene() {
  return (
    <StandingDavidScene content={shouldYouWashConclusion} background="kitchenSinkBackground" side="right" next="first-aid-intro" />
  )
}

// Scene 41: David by the counter with the first-aid kit.
export function FirstAidIntroScene() {
  return <StandingDavidScene content={firstAidIntro} background="kitchenCounterBackground" side="right" next="first-aid-note" />
}

// Scene 43
export function FirstAidConclusionScene() {
  return <StandingDavidScene content={firstAidConclusion} background="kitchenCounterBackground" side="right" next="wound-care" />
}

// Scene 47
export function WoundCareConclusionScene() {
  return <StandingDavidScene content={woundCareConclusion} background="kitchenCounterBackground" side="right" next="contamination-intro" />
}

// Scene 48: David tells what contamination is.
export function ContaminationIntroScene() {
  return (
    <StandingDavidScene content={contaminationIntro} background="kitchenCounterBackground" side="right" next="notebook-page-1" />
  )
}

// Scene 51: the next activity, "Tras la barra", is not built yet.
export function NotebookConclusionScene() {
  return <StandingDavidScene content={notebookConclusion} background="kitchenCounterBackground" side="right" next="coming-soon" />
}
