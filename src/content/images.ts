import type { ImageSource } from '../design-system'
import { assets, type AssetId } from './assets'
import { videos, type VideoId } from './videos'

// Kept apart from the manifest, which is also read by the placeholder script outside Vite.
export function image(id: AssetId): ImageSource {
  const { path, width, height } = assets[id]
  return { src: import.meta.env.BASE_URL + path, width, height }
}

export function video(id: VideoId): ImageSource {
  const { path, width, height } = videos[id]
  return { src: import.meta.env.BASE_URL + path, width, height }
}
