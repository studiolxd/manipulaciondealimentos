import { iconSource } from '../../../icons'
import type { RasterIconName } from '../../../icons.manifest'
import { glyphs, isGlyph, type GlyphName } from './glyphs'
import styles from './Icon.module.css'

export type IconName = GlyphName | RasterIconName

/**
 * `current` takes the text colour around it, so it already works on light and
 * dark surfaces; the other tones force a colour. Only vector icons are tinted.
 */
export type IconTone = 'current' | 'default' | 'inverse' | 'accent' | 'positive' | 'negative'

interface IconProps {
  name: IconName
  /** `fill` takes the size of its container (e.g. inside a button). */
  size?: 'sm' | 'md' | 'lg' | 'fill'
  tone?: IconTone
  /** Plays the icon's animation, if it has one. Still with reduced motion. */
  animated?: boolean
}

// Interface icon. Always decorative: the control or text next to it carries the meaning.
export function Icon({ name, size = 'md', tone = 'current', animated = false }: IconProps) {
  if (!isGlyph(name)) {
    return <img className={styles.icon} data-size={size} src={iconSource(name).src} alt="" draggable={false} />
  }
  return (
    <svg
      className={styles.icon}
      data-size={size}
      data-tone={tone}
      data-animated={animated || undefined}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      {glyphs[name]}
    </svg>
  )
}
