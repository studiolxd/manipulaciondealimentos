// Generates flat geometric PNG placeholders for every asset in the manifest.
// Existing files are kept, so final artwork is never overwritten; pass --force
// to regenerate everything.
//
//   pnpm placeholders [--force]

import { existsSync } from 'node:fs'
import { mkdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import sharp from 'sharp'
import { assets, type AssetId } from '../src/content/assets.ts'
import { icons, type IconName } from '../src/design-system/icons.manifest.ts'

type Shape = 'rect' | 'rounded' | 'circle'

interface Placeholder {
  shape: Shape
  color: string
  label: string
}

const placeholders: Record<AssetId | IconName, Placeholder> = {
  avatarSelectBackground: { shape: 'rect', color: '#d9d4c7', label: 'Fondo · Elección de personaje' },
  facadeBackground: { shape: 'rect', color: '#e8c9a0', label: 'Fondo · Fachada del restaurante' },
  diningRoomBackground: { shape: 'rect', color: '#c9d8c5', label: 'Fondo · Salón comedor' },
  diningTableBackground: { shape: 'rect', color: '#b9cbd9', label: 'Fondo · Mesa con David (POV)' },
  diningTableTopBackground: { shape: 'rect', color: '#c7b8a3', label: 'Fondo · Mesa vista desde arriba' },
  playerMale: { shape: 'rounded', color: '#6b8fbf', label: 'Avatar · Chico' },
  playerFemale: { shape: 'rounded', color: '#bf6b9a', label: 'Avatar · Chica' },
  davidStanding: { shape: 'rounded', color: '#4f7a5a', label: 'David · De pie' },
  davidSeated: { shape: 'rounded', color: '#4f7a5a', label: 'David · Sentado' },
  davidPortrait: { shape: 'circle', color: '#4f7a5a', label: 'David' },
  cardOscar: { shape: 'rounded', color: '#8fa9c9', label: 'Óscar' },
  cardLaura: { shape: 'rounded', color: '#c98fb4', label: 'Laura' },
  cardPablo: { shape: 'rounded', color: '#8fc9b0', label: 'Pablo' },
  cardMarta: { shape: 'rounded', color: '#c9b48f', label: 'Marta' },
  cardMiguel: { shape: 'rounded', color: '#a58fc9', label: 'Miguel' },
  cardJavier: { shape: 'rounded', color: '#8fc0c9', label: 'Javier' },
  cardAna: { shape: 'rounded', color: '#c9998f', label: 'Ana' },
  cardSonia: { shape: 'rounded', color: '#b0c98f', label: 'Sonia' },
  cardCarmen: { shape: 'rounded', color: '#c98fa0', label: 'Carmen' },
  cardSergio: { shape: 'rounded', color: '#9aa3b5', label: 'Sergio' },
  cardElena: { shape: 'rounded', color: '#c9c28f', label: 'Elena' },
  // Design system icons
  rotateDevice: { shape: 'circle', color: '#f2f2f2', label: 'Girar' },
  next: { shape: 'circle', color: '#c2410c', label: '>' },
  hudBar: { shape: 'rect', color: '#3a3a3c', label: 'HUD' },
  statement: { shape: 'circle', color: '#ffffff', label: 'Enunciado' },
  close: { shape: 'circle', color: '#c2410c', label: 'X' },
  correct: { shape: 'circle', color: '#2f9e5b', label: 'OK' },
  incorrect: { shape: 'circle', color: '#d64545', label: 'NO' },
}

const manifest: Record<AssetId | IconName, { path: string; width: number; height: number }> = { ...assets, ...icons }

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

function placeholderSvg(id: AssetId | IconName): string {
  const { width, height, path } = manifest[id]
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
for (const id of Object.keys(manifest) as (AssetId | IconName)[]) {
  const target = join(publicDir, manifest[id].path)
  if (existsSync(target) && !force) continue
  await mkdir(dirname(target), { recursive: true })
  await sharp(Buffer.from(placeholderSvg(id))).png().toFile(target)
  console.log(`created ${manifest[id].path}`)
  created++
}
console.log(`${created} placeholder(s) created`)
