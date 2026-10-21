import { icons, type IconName } from './icons.manifest'
import type { ImageSource } from './types'

export function iconSource(name: IconName): ImageSource {
  const { path, width, height } = icons[name]
  return { src: import.meta.env.BASE_URL + path, width, height }
}
