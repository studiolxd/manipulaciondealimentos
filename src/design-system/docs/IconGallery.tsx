import { Icon, type IconName } from '../components/atoms/Icon/Icon'
import { glyphs, isGlyph } from '../components/atoms/Icon/glyphs'
import { icons } from '../icons.manifest'
import styles from './IconGallery.module.css'

const names = [...Object.keys(glyphs), ...Object.keys(icons)] as IconName[]

// Documentation: every icon of the library, on a light and a dark surface.
// PNGs are placeholders still waiting to be redrawn as vector icons.
export function IconGallery() {
  return (
    <ul className={styles.gallery}>
      {names.map((name) => (
        <li key={name} className={styles.card}>
          <div className={styles.swatches}>
            <div className={styles.swatch} data-surface="light">
              <Icon name={name} size="fill" animated />
            </div>
            <div className={styles.swatch} data-surface="dark">
              <Icon name={name} size="fill" animated />
            </div>
          </div>
          <code className={styles.name}>{name}</code>
          <span className={styles.kind}>{isGlyph(name) ? 'SVG' : 'PNG provisional'}</span>
        </li>
      ))}
    </ul>
  )
}
