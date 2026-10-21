// Interface sounds owned by the design system. Files live in public/ with
// stable names: a final sound replaces one by overwriting the file. Sources and
// licences in public/assets/audio/LICENSE.txt.

const sounds = {
  click: 'assets/audio/click.mp3',
  correct: 'assets/audio/correct.mp3',
  incorrect: 'assets/audio/incorrect.mp3',
} as const

export type SoundName = keyof typeof sounds

// Interface sounds sit under any narration or music.
const VOLUME = 0.6

// Loaded once, up front, so the first press already sounds on time.
const loaded = new Map<SoundName, HTMLAudioElement>()
if (typeof Audio !== 'undefined') {
  for (const name of Object.keys(sounds) as SoundName[]) {
    const audio = new Audio(import.meta.env.BASE_URL + sounds[name])
    audio.preload = 'auto'
    audio.volume = VOLUME
    loaded.set(name, audio)
  }
}

export function playSound(name: SoundName): void {
  const audio = loaded.get(name)
  if (!audio) return
  // A quick second press overlaps a copy instead of cutting the first one.
  const instance = audio.paused ? audio : (audio.cloneNode() as HTMLAudioElement)
  instance.volume = VOLUME
  instance.currentTime = 0
  // Browsers may refuse to play (e.g. before any user gesture): the game works silently.
  instance.play().catch(() => {})
}
