import type { Gender } from '@studiolxd/tramoya'

// Voice-overs generated with ElevenLabs (model eleven_v4). Narrator: "Carolina
// - Natural, Neutral and Clear"; David: "Juan Garcia Jimenez". Files live in
// public/ with silences trimmed and loudness normalised (-16 LUFS).

export const voiceClips = {
  narratorFacade: 'assets/voice/narrator-facade.mp3',
  davidDiningRoom1: 'assets/voice/david-dining-room-1.mp3',
  davidDiningRoom1Male: 'assets/voice/david-dining-room-1-male.mp3',
  davidDiningRoom1Female: 'assets/voice/david-dining-room-1-female.mp3',
  davidDiningRoom1Neutral: 'assets/voice/david-dining-room-1-neutral.mp3',
} as const

export type VoiceClipId = keyof typeof voiceClips

/** The clips of one voiced text, in order; a function when they depend on the form of address. */
export type VoiceLine = readonly VoiceClipId[] | ((gender: Gender) => readonly VoiceClipId[])

export function voiceUrls(line: VoiceLine | undefined, gender: Gender): string[] | undefined {
  if (!line) return undefined
  const clips = typeof line === 'function' ? line(gender) : line
  return clips.map((id) => import.meta.env.BASE_URL + voiceClips[id])
}
