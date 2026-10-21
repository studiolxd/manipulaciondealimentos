import { Button } from '../components/atoms/Button/Button'
import { playSound, soundNames, type SoundName } from '../sounds'
import styles from './SoundGallery.module.css'

const uses: Record<SoundName, { use: string; source: string }> = {
  click: { use: 'Al pulsar cualquier botón', source: 'mouseclick1 · UI Audio (Kenney)' },
  correct: { use: 'Al aparecer un feedback de acierto', source: 'glass_004 · Interface Sounds (Kenney)' },
  incorrect: { use: 'Al aparecer un feedback de error', source: 'error_008 · Interface Sounds (Kenney)' },
}

// Documentation: every interface sound, with what it is for and a button to hear it.
export function SoundGallery() {
  return (
    <ul className={styles.gallery}>
      {soundNames.map((name) => (
        <li key={name} className={styles.row}>
          <code className={styles.name}>{name}</code>
          <span className={styles.use}>{uses[name].use}</span>
          <span className={styles.source}>{uses[name].source}</span>
          <Button variant="secondary" silent onClick={() => playSound(name)} aria-label={`Escuchar ${name}`}>
            Escuchar
          </Button>
        </li>
      ))}
    </ul>
  )
}
