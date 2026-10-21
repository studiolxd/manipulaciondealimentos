import { assets, type AssetId } from './assets'

// Kept apart from the manifest, which is also read by the placeholder script outside Vite.
export function assetUrl(id: AssetId): string {
  return import.meta.env.BASE_URL + assets[id].path
}
