import { icons, type RasterIconName } from './icons.manifest'
import type { ImageSource } from './types'

export function iconSource(name: RasterIconName): ImageSource {
  const { path, width, height } = icons[name]
  return { src: import.meta.env.BASE_URL + path, width, height }
}
