import { useEffect, useEffectEvent, useState } from 'react'
import { tokens } from '../../../generated/tokens'
import { Logo } from '../../atoms/Logo/Logo'
import styles from './SplashScreen.module.css'

const HOLD_MS = tokens['splash-screen.hold-duration']
const FADE_MS = tokens['splash-screen.fade-duration']

interface SplashScreenProps {
  /** Called once the logo has faded out; the screen should then be removed. */
  onFinished: () => void
}

// Logo: full-window Studio LXD logo on white, shown when the game loads. It
// stays for a moment and fades out. Outside the stage, in real screen sizes.
export function SplashScreen({ onFinished }: SplashScreenProps) {
  const [leaving, setLeaving] = useState(false)
  const finish = useEffectEvent(onFinished)

  useEffect(() => {
    const fade = setTimeout(() => setLeaving(true), HOLD_MS)
    const done = setTimeout(finish, HOLD_MS + FADE_MS)
    return () => {
      clearTimeout(fade)
      clearTimeout(done)
    }
  }, [])

  return (
    <div className={styles.screen} data-leaving={leaving || undefined}>
      <div className={styles.logo}>
        <Logo />
      </div>
    </div>
  )
}
