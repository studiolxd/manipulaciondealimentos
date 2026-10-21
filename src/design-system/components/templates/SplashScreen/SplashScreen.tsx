import { useEffect, useEffectEvent, useState } from 'react'
import { tokens } from '../../../generated/tokens'
import { Logo } from '../../atoms/Logo/Logo'
import styles from './SplashScreen.module.css'

const HOLD_MS = tokens['splash-screen.hold-duration']
const LOGO_FADE_MS = tokens['splash-screen.logo-fade-duration']
const FADE_MS = tokens['splash-screen.fade-duration']

type Phase = 'hold' | 'logo-out' | 'screen-out'

interface SplashScreenProps {
  /** Called once the screen has faded out; it should then be removed. */
  onFinished: () => void
}

// Logo: full-window Studio LXD logo on white, shown when the game loads. The
// logo stays for a moment and fades out completely; only then does the white
// screen fade out and uncover the game. Outside the stage, in real screen sizes.
export function SplashScreen({ onFinished }: SplashScreenProps) {
  const [phase, setPhase] = useState<Phase>('hold')
  const finish = useEffectEvent(onFinished)

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase('logo-out'), HOLD_MS),
      setTimeout(() => setPhase('screen-out'), HOLD_MS + LOGO_FADE_MS),
      setTimeout(finish, HOLD_MS + LOGO_FADE_MS + FADE_MS),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div className={styles.screen} data-phase={phase}>
      <div className={styles.logo}>
        <Logo />
      </div>
    </div>
  )
}
