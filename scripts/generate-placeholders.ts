// Generates flat geometric PNG placeholders for every asset in the manifest.
// Existing files are kept, so final artwork is never overwritten; pass --force
// to regenerate everything.
//
//   pnpm placeholders [--force]

import { existsSync } from 'node:fs'
import { mkdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import sharp from 'sharp'
import { assets, type AssetId } from '../src/engine/assets.ts'

type Shape = 'rect' | 'rounded' | 'circle'

interface Placeholder {
  shape: Shape
  color: string
  label: string
}

const placeholders: Record<AssetId, Placeholder> = {
  avatarSelectBackground: { shape: 'rect', color: '#d9d4c7', label: 'Fondo · Elección de personaje' },
  facadeBackground: { shape: 'rect', color: '#e8c9a0', label: 'Fondo · Fachada del restaurante' },
  diningRoomBackground: { shape: 'rect', color: '#c9d8c5', label: 'Fondo · Salón comedor' },
  diningTableBackground: { shape: 'rect', color: '#b9cbd9', label: 'Fondo · Mesa con David (POV)' },
  playerMale: { shape: 'rounded', color: '#6b8fbf', label: 'Avatar · Chico' },
  playerFemale: { shape: 'rounded', color: '#bf6b9a', label: 'Avatar · Chica' },
  davidStanding: { shape: 'rounded', color: '#4f7a5a', label: 'David · De pie' },
  davidSeated: { shape: 'rounded', color: '#4f7a5a', label: 'David · Sentado' },
  davidPortrait: { shape: 'circle', color: '#4f7a5a', label: 'David' },
  rotateDeviceIcon: { shape: 'circle', color: '#f2f2f2', label: 'Girar' },
  nextIcon: { shape: 'circle', color: '#c2410c', label: '>' },
}

const publicDir = join(import.meta.dirname, '..', 'public')
const force = process.argv.includes('--force')

function escapeXml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function shapeSvg(shape: Shape, width: number, height: number, color: string): string {
  switch (shape) {
    case 'rect':
      return `<rect width="${width}" height="${height}" fill="${color}"/>`
    case 'rounded':
      return `<rect width="${width}" height="${height}" rx="${Math.min(width, height) / 2}" fill="${color}"/>`
    case 'circle':
      return `<circle cx="${width / 2}" cy="${height / 2}" r="${Math.min(width, height) / 2}" fill="${color}"/>`
  }
}

function placeholderSvg(id: AssetId): string {
  const { width, height, path } = assets[id]
  const { shape, color, label } = placeholders[id]
  const size = Math.max(14, Math.round(Math.min(width, height) / 14))
  const fileName = path.split('/').pop() ?? path
  const details = escapeXml(`${fileName} · ${width}×${height}`)

  // Backgrounds carry a small label in the bottom-left corner, where the
  // interface rarely sits; other shapes are labelled in the centre.
  if (shape === 'rect') {
    const small = Math.round(size * 0.45)
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  ${shapeSvg(shape, width, height, color)}
  <g font-family="Helvetica, Arial, sans-serif" fill="#1d1d1f" opacity="0.6">
    <text x="${small}" y="${height - small * 2.6}" font-size="${small}" font-weight="700">${escapeXml(label)}</text>
    <text x="${small}" y="${height - small}" font-size="${small * 0.8}">${details}</text>
  </g>
</svg>`
  }

  const showDetails = shape !== 'circle'
  const labelY = showDetails ? height / 2 - size * 0.4 : height / 2 + size * 0.35
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  ${shapeSvg(shape, width, height, color)}
  <g font-family="Helvetica, Arial, sans-serif" fill="#1d1d1f" text-anchor="middle">
    <text x="50%" y="${labelY}" font-size="${size}" font-weight="700">${escapeXml(label)}</text>
    ${showDetails ? `<text x="50%" y="${labelY + size * 1.4}" font-size="${size * 0.6}">${details}</text>` : ''}
  </g>
</svg>`
}

let created = 0
for (const id of Object.keys(assets) as AssetId[]) {
  const target = join(publicDir, assets[id].path)
  if (existsSync(target) && !force) continue
  await mkdir(dirname(target), { recursive: true })
  await sharp(Buffer.from(placeholderSvg(id))).png().toFile(target)
  console.log(`created ${assets[id].path}`)
  created++
}
console.log(`${created} placeholder(s) created`)
