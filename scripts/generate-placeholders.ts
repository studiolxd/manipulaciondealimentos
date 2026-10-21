// Generates flat geometric PNG placeholders for every asset in the manifest.
// Existing files are kept, so final artwork is never overwritten; pass --force
// to regenerate everything.
//
//   pnpm placeholders [--force]

import { join } from 'node:path'
import { generatePlaceholders, type Placeholder } from '@studiolxd/tramoya/placeholders'
import { assets, type AssetId } from '../src/content/assets.ts'
import { icons, type IconName } from '../src/design-system/icons.manifest.ts'

const placeholders: Record<AssetId | IconName, Placeholder> = {
  addressFormBackground: { shape: 'rect', color: '#d9d4c7', label: 'Fondo · Forma de tratamiento' },
  facadeBackground: { shape: 'rect', color: '#e8c9a0', label: 'Fondo · Fachada del restaurante' },
  diningRoomBackground: { shape: 'rect', color: '#c9d8c5', label: 'Fondo · Salón comedor' },
  diningTableBackground: { shape: 'rect', color: '#b9cbd9', label: 'Fondo · Mesa con David (POV)' },
  diningTableTopBackground: { shape: 'rect', color: '#c7b8a3', label: 'Fondo · Mesa vista desde arriba' },
  davidStanding: { shape: 'rounded', color: '#4f7a5a', label: 'David · De pie' },
  davidSeated: { shape: 'rounded', color: '#4f7a5a', label: 'David · Sentado' },
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
  statement: { shape: 'circle', color: '#ffffff', label: 'Enunciado' },
  close: { shape: 'circle', color: '#c2410c', label: 'X' },
  correct: { shape: 'circle', color: '#2f9e5b', label: 'OK' },
  incorrect: { shape: 'circle', color: '#d64545', label: 'NO' },
}

const created = await generatePlaceholders({
  publicDir: join(import.meta.dirname, '..', 'public'),
  assets: { ...assets, ...icons },
  placeholders,
  force: process.argv.includes('--force'),
})
console.log(`${created} placeholder(s) created`)
