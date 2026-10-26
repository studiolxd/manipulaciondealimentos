// Generates flat geometric PNG placeholders for every asset in the manifest,
// plus a few drawn ones: the kitchen of activity 4 with its 8 details where the
// points are, and the security camera videos of activity 3 (6-second clips,
// with ffmpeg) and their thumbnails. Existing files are kept, so final artwork
// is never overwritten; pass --force to regenerate everything.
//
//   pnpm placeholders [--force]

import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { generatePlaceholders, type Placeholder } from '@studiolxd/tramoya/placeholders'
import { assets, type AssetId } from '../src/content/assets.ts'
import { kitchenDetectives } from '../src/content/kitchenDetectives.ts'
import { securityCameras } from '../src/content/securityCameras.ts'
import { videos } from '../src/content/videos.ts'
import { icons, type RasterIconName } from '../src/design-system/icons.manifest.ts'

const publicDir = join(import.meta.dirname, '..', 'public')
const force = process.argv.includes('--force')

const placeholders: Record<AssetId | RasterIconName, Placeholder> = {
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
  receptionBackground: { shape: 'rect', color: '#d8c3a5', label: 'Fondo · Recepción (tablet en el mostrador)' },
  counterTopBackground: { shape: 'rect', color: '#a87b51', label: 'Fondo · Mostrador de madera desde arriba' },
  lockerRoomBackground: { shape: 'rect', color: '#b8c4cc', label: 'Fondo · Vestuario' },
  davidHalfBody: { shape: 'rounded', color: '#4f7a5a', label: 'David · De pie, medio cuerpo' },
  cameraThumbnail1: { shape: 'rect', color: '#2b3a40', label: 'Cámara 1' },
  cameraThumbnail2: { shape: 'rect', color: '#2b3a40', label: 'Cámara 2' },
  cameraThumbnail3: { shape: 'rect', color: '#2b3a40', label: 'Cámara 3' },
  cameraThumbnail4: { shape: 'rect', color: '#2b3a40', label: 'Cámara 4' },
  cameraThumbnail5: { shape: 'rect', color: '#2b3a40', label: 'Cámara 5' },
  cameraThumbnail6: { shape: 'rect', color: '#2b3a40', label: 'Cámara 6' },
  cameraThumbnail7: { shape: 'rect', color: '#2b3a40', label: 'Cámara 7' },
  cameraThumbnail8: { shape: 'rect', color: '#2b3a40', label: 'Cámara 8' },
  kitchenScene: { shape: 'rect', color: '#dfe6e9', label: 'Cocina profesional' },
  worker1: { shape: 'rounded', color: '#9aa3b5', label: 'Trabajador 1' },
  worker1Hands: { shape: 'rect', color: '#c9b48f', label: 'Manos · trabajador 1' },
  worker1BeardProblem: { shape: 'rect', color: '#d64545', label: 'Barba larga' },
  worker1BeardCorrected: { shape: 'rect', color: '#2f9e5b', label: 'Redecilla' },
  worker1PhoneProblem: { shape: 'rect', color: '#d64545', label: 'Móvil' },
  worker1PhoneCorrected: { shape: 'rect', color: '#2f9e5b', label: 'Bolsillo vacío' },
  worker1EarringProblem: { shape: 'rect', color: '#d64545', label: 'Pendiente' },
  worker1EarringCorrected: { shape: 'rect', color: '#2f9e5b', label: 'Sin pendiente' },
  worker1NailsProblem: { shape: 'rect', color: '#d64545', label: 'Uñas sucias' },
  worker1NailsCorrected: { shape: 'rect', color: '#2f9e5b', label: 'Uñas limpias' },
  worker2: { shape: 'rounded', color: '#9aa3b5', label: 'Trabajador 2' },
  worker2Hands: { shape: 'rect', color: '#c9b48f', label: 'Manos · trabajador 2' },
  worker2ShirtProblem: { shape: 'rect', color: '#d64545', label: 'Tirantes' },
  worker2ShirtCorrected: { shape: 'rect', color: '#2f9e5b', label: 'Camisa' },
  worker2WatchProblem: { shape: 'rect', color: '#d64545', label: 'Reloj' },
  worker2WatchCorrected: { shape: 'rect', color: '#2f9e5b', label: 'Sin reloj' },
  worker2StainProblem: { shape: 'rect', color: '#d64545', label: 'Mancha' },
  worker2StainCorrected: { shape: 'rect', color: '#2f9e5b', label: 'Limpio' },
  worker2CapProblem: { shape: 'rect', color: '#d64545', label: 'Sin gorro' },
  worker2CapCorrected: { shape: 'rect', color: '#2f9e5b', label: 'Gorro' },
  worker3: { shape: 'rounded', color: '#9aa3b5', label: 'Trabajador 3' },
  worker3Hands: { shape: 'rect', color: '#c9b48f', label: 'Manos · trabajador 3' },
  worker3EarringsProblem: { shape: 'rect', color: '#d64545', label: 'Pendientes' },
  worker3EarringsCorrected: { shape: 'rect', color: '#2f9e5b', label: 'Sin pendientes' },
  worker3BraceletProblem: { shape: 'rect', color: '#d64545', label: 'Brazalete' },
  worker3BraceletCorrected: { shape: 'rect', color: '#2f9e5b', label: 'Sin brazalete' },
  worker3CapProblem: { shape: 'rect', color: '#d64545', label: 'Sin gorro' },
  worker3CapCorrected: { shape: 'rect', color: '#2f9e5b', label: 'Gorro' },
  worker3NailsProblem: { shape: 'rect', color: '#d64545', label: 'Uñas largas' },
  worker3NailsCorrected: { shape: 'rect', color: '#2f9e5b', label: 'Uñas cortas' },
  worker4: { shape: 'rounded', color: '#9aa3b5', label: 'Trabajador 4' },
  worker4Hands: { shape: 'rect', color: '#c9b48f', label: 'Manos · trabajador 4' },
  worker4HairProblem: { shape: 'rect', color: '#d64545', label: 'Pelo suelto' },
  worker4HairCorrected: { shape: 'rect', color: '#2f9e5b', label: 'Pelo recogido' },
  worker4ArmpitsProblem: { shape: 'rect', color: '#d64545', label: 'Mal olor' },
  worker4ArmpitsCorrected: { shape: 'rect', color: '#2f9e5b', label: 'Aseo' },
  worker4ShoesProblem: { shape: 'rect', color: '#d64545', label: 'Tacones' },
  worker4ShoesCorrected: { shape: 'rect', color: '#2f9e5b', label: 'Calzado' },
  worker4NailsProblem: { shape: 'rect', color: '#d64545', label: 'Esmalte' },
  worker4NailsCorrected: { shape: 'rect', color: '#2f9e5b', label: 'Sin esmalte' },
  // Design system icons
  next: { shape: 'circle', color: '#c2410c', label: '>' },
  statement: { shape: 'circle', color: '#ffffff', label: 'Enunciado' },
  close: { shape: 'circle', color: '#c2410c', label: 'X' },
  correct: { shape: 'circle', color: '#2f9e5b', label: 'OK' },
  incorrect: { shape: 'circle', color: '#d64545', label: 'NO' },
}

const { default: sharp } = await import('sharp')

function escapeXml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function wrap(text: string, maxChars: number): string[] {
  const lines: string[] = []
  let line = ''
  for (const word of text.split(' ')) {
    if (line && (line + ' ' + word).length > maxChars) {
      lines.push(line)
      line = word
    } else line = line ? `${line} ${word}` : word
  }
  if (line) lines.push(line)
  return lines
}

function textLines(lines: string[], x: number, y: number, size: number, color: string, anchor = 'middle'): string {
  return lines
    .map(
      (line, i) =>
        `<text x="${x}" y="${y + i * size * 1.25}" font-family="Helvetica, Arial, sans-serif" font-size="${size}" fill="${color}" text-anchor="${anchor}">${escapeXml(line)}</text>`,
    )
    .join('')
}

async function drawPng(path: string, width: number, height: number, body: string): Promise<boolean> {
  const file = join(publicDir, path)
  if (existsSync(file) && !force) return false
  mkdirSync(dirname(file), { recursive: true })
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">${body}</svg>`
  await sharp(Buffer.from(svg)).png().toFile(file)
  return true
}

let drawn = 0

// Activity 4: the kitchen, each detail drawn inside the box of its point.
{
  const { path, width, height } = assets.kitchenScene
  const details = kitchenDetectives.rules
    .map(({ spot }) => {
      const label = wrap(spot.label, Math.max(12, Math.floor(spot.width / 13)))
      return `<rect x="${spot.x}" y="${spot.y}" width="${spot.width}" height="${spot.height}" rx="12" fill="#ffffff" stroke="#14262e" stroke-width="4" stroke-dasharray="14 10"/>${textLines(label, spot.x + spot.width / 2, spot.y + 34, 22, '#14262e')}`
    })
    .join('')
  const body = `<rect width="${width}" height="${height}" fill="#dfe6e9"/>${textLines(['Cocina profesional · placeholder'], width / 2, height - 30, 30, '#5b6b73')}${details}`
  if (await drawPng(path, width, height, body)) drawn += 1
}

// Activity 3: a frame per camera (description, REC, time), its thumbnail and a 6-second video.
const frameDir = join(tmpdir(), 'slxd-camera-frames')
mkdirSync(frameDir, { recursive: true })
let ffmpegMissing = false
for (const [index, item] of securityCameras.videos.entries()) {
  const n = index + 1
  const clip = videos[`camera${n}` as keyof typeof videos]
  const thumbnail = assets[`cameraThumbnail${n}` as AssetId]
  const { width, height } = clip
  const frame = `<rect width="${width}" height="${height}" fill="#1d2529"/><circle cx="60" cy="60" r="14" fill="#e03131"/>${textLines([`REC · CÁMARA ${n}`], 90, 72, 34, '#ffffff', 'start')}${textLines([`26/10/2026  09:0${n}:00`], width - 40, height - 40, 30, '#c9d1d5', 'end')}${textLines(wrap(item.description, 52), width / 2, height / 2 - 60, 40, '#ffffff')}`
  const framePath = join(frameDir, `camera-${n}.png`)
  await sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">${frame}</svg>`))
    .png()
    .toFile(framePath)

  const thumbnailFile = join(publicDir, thumbnail.path)
  if (!existsSync(thumbnailFile) || force) {
    mkdirSync(dirname(thumbnailFile), { recursive: true })
    await sharp(framePath).resize(thumbnail.width, thumbnail.height).png().toFile(thumbnailFile)
    drawn += 1
  }

  const videoFile = join(publicDir, clip.path)
  if ((existsSync(videoFile) && !force) || ffmpegMissing) continue
  try {
    execFileSync('ffmpeg', [
      '-loglevel', 'error', '-y', '-loop', '1', '-i', framePath, '-t', '6', '-r', '25',
      '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an', videoFile,
    ])
    drawn += 1
  } catch {
    ffmpegMissing = true
    console.warn('ffmpeg not found: the camera videos were not created.')
  }
}
rmSync(frameDir, { recursive: true, force: true })

const created = await generatePlaceholders({
  publicDir,
  assets: { ...assets, ...icons },
  placeholders,
  force,
})
console.log(`${created + drawn} placeholder(s) created`)
