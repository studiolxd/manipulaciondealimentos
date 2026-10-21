import { iconSource } from '../../../icons'
import styles from './Hud.module.css'

// Top band of the game. Scenes place their controls over it with
// <Positioned layer="over-hud">.
export function Hud() {
  return <img className={styles.hud} src={iconSource('hudBar').src} alt="" />
}
