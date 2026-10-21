import type { Gender } from '@studiolxd/tramoya'
import type { VoiceClip } from '../design-system'

// Voice-overs generated with ElevenLabs (model eleven_v4). Narrator: "Carolina
// - Natural, Neutral and Clear"; David: "Juan Garcia Jimenez". Files live in
// public/ with silences trimmed and loudness normalised (-16 LUFS).
//
// Each clip keeps its length (ffprobe) and, once transcribed with ElevenLabs
// Scribe, when each word is said (matched to the words of the voiced text), so
// the text is typed word by word with the voice. A clip without words is typed
// at an even pace over its length instead. Regenerating a clip means updating
// these numbers.

type WordTiming = readonly [text: string, startMs: number, endMs: number]

interface ClipSpec {
  path: string
  durationMs: number
  words?: readonly WordTiming[]
}

export const voiceClips = {
  narratorFacade: {
    path: 'assets/voice/narrator-facade.mp3',
    durationMs: 9112,
    words: [
      ['Hoy', 0, 200],
      ['será', 240, 460],
      ['tu', 560, 620],
      ['primer', 740, 1120],
      ['día', 1220, 1380],
      ['en', 1400, 1460],
      ['hostelería.', 1500, 2080],
      ['Debes', 2560, 2780],
      ['entrar', 2820, 3180],
      ['y', 3220, 3260],
      ['buscar', 3300, 3600],
      ['a', 3620, 3660],
      ['David,', 3700, 4040],
      ['el', 4260, 4320],
      ['encargado.', 4360, 4880],
      ['Él', 5440, 5520],
      ['te', 5560, 5620],
      ['ayudará', 5660, 6200],
      ['y', 6260, 6280],
      ['te', 6340, 6400],
      ['enseñará', 6420, 6860],
      ['todo', 7060, 7280],
      ['lo', 7300, 7360],
      ['que', 7420, 7480],
      ['necesitas.', 7520, 8160],
      ['¡Buena', 8460, 8640],
      ['suerte!', 8720, 9040],
    ],
  },
  davidDiningRoom1: {
    path: 'assets/voice/david-dining-room-1.mp3',
    durationMs: 5761,
    words: [
      ['¡Hola!', 0, 260],
      ['Soy', 640, 760],
      ['David,', 780, 1120],
      ['el', 1420, 1480],
      ['encargado.', 1520, 2000],
      ['Tú', 2480, 2560],
      ['debes', 2600, 2820],
      ['ser', 2860, 3000],
      ['el', 3040, 3120],
      ['nuevo', 3160, 3400],
      ['fichaje...', 3440, 4000],
      ['¡te', 4420, 4460],
      ['estábamos', 4500, 5000],
      ['esperando!', 5060, 5680],
    ],
  },
  davidDiningRoom1Male: {
    path: 'assets/voice/david-dining-room-1-male.mp3',
    durationMs: 1148,
    words: [
      ['Bienvenido', 80, 560],
      ['al', 600, 660],
      ['equipo.', 700, 1060],
    ],
  },
  davidDiningRoom1Female: {
    path: 'assets/voice/david-dining-room-1-female.mp3',
    durationMs: 1137,
    words: [
      ['Bienvenida', 80, 580],
      ['al', 600, 680],
      ['equipo.', 720, 1060],
    ],
  },
  davidDiningRoom1Neutral: {
    path: 'assets/voice/david-dining-room-1-neutral.mp3',
    durationMs: 1757,
    words: [
      ['Te', 0, 100],
      ['damos', 140, 420],
      ['la', 480, 560],
      ['bienvenida', 600, 1140],
      ['al', 1200, 1280],
      ['equipo.', 1320, 1680],
    ],
  },
} as const satisfies Record<string, ClipSpec>

export type VoiceClipId = keyof typeof voiceClips

/** The clips of one voiced text, in order; a function when they depend on the form of address. */
export type VoiceLine = readonly VoiceClipId[] | ((gender: Gender) => readonly VoiceClipId[])

export function voiceLine(line: VoiceLine | undefined, gender: Gender): VoiceClip[] | undefined {
  if (!line) return undefined
  const ids = typeof line === 'function' ? line(gender) : line
  return ids.map((id) => {
    const { path, durationMs, words }: ClipSpec = voiceClips[id]
    return {
      url: import.meta.env.BASE_URL + path,
      durationMs,
      words: words?.map(([text, startMs, endMs]) => ({ text, startMs, endMs })),
    }
  })
}
