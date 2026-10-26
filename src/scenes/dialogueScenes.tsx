import { detectivesConclusion } from '../content/kitchenDetectives'
import { lockerRoom1, lockerRoom2, lockerRoomConclusion } from '../content/lockerRoom'
import { camerasConclusion, camerasIntro } from '../content/securityCameras'
import { uniformConclusion } from '../content/uniformCheck'
import { whoIsAffectedConclusion } from '../content/whoIsAffected'
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
  return <StandingDavidScene content={uniformConclusion} background="lockerRoomBackground" side="right" next="coming-soon" />
}
