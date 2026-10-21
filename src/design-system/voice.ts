// Voice-overs: one line at a time. A line is a list of clips played in order
// with a short pause between them, so a sentence can be split at a full stop
// (e.g. a common part and an ending that depends on the form of address).

// Pause between the clips of one line, like the one between two sentences.
export const VOICE_GAP_MS = 300

export interface VoiceWord {
  /** The word as written in the text that was voiced. */
  text: string
  startMs: number
  endMs: number
}

export interface VoiceClip {
  url: string
  durationMs: number
  /** When each word is said, to type the text in step with it. */
  words?: readonly VoiceWord[]
}

export interface VoicePlayback {
  /** How far the line has got, in ms (clips and pauses), following the audio itself. */
  elapsedMs: () => number
  stop: () => void
  pause: () => void
  resume: () => void
}

let enabled = true
let current: VoicePlayback | null = null

export function isVoiceEnabled(): boolean {
  return enabled
}

/** Turns voice-overs on or off (e.g. from the player's settings). */
export function setVoiceEnabled(value: boolean): void {
  enabled = value
  if (!value) stopVoice()
}

export function stopVoice(): void {
  current?.stop()
  current = null
}

/** Length of a whole line, clips and pauses. */
export function lineDurationMs(clips: readonly VoiceClip[]): number {
  return clips.reduce((sum, clip) => sum + clip.durationMs, 0) + VOICE_GAP_MS * Math.max(clips.length - 1, 0)
}

/**
 * Plays a line, stopping any other one. Returns null when voice-overs are off.
 * `onRefused` is called if the browser does not let it play.
 */
export function playVoice(clips: readonly VoiceClip[], onRefused?: () => void): VoicePlayback | null {
  stopVoice()
  if (!enabled || clips.length === 0 || typeof Audio === 'undefined') return null

  // Every clip is loaded up front, so the next one starts on time.
  const audios = clips.map((clip) => {
    const audio = new Audio(clip.url)
    audio.preload = 'auto'
    return audio
  })
  let index = 0
  let audio: HTMLAudioElement | null = null
  let gap: ReturnType<typeof setTimeout> | undefined
  let stopped = false
  let paused = false
  // Time of the clips (and pauses) already over, and when the current pause began.
  let doneMs = 0
  let gapStartedAt: number | null = null

  function playClip() {
    if (stopped || index >= audios.length) return
    gapStartedAt = null
    audio = audios[index]
    audio.addEventListener('ended', () => {
      doneMs += clips[index].durationMs
      index += 1
      if (index >= audios.length) return
      gapStartedAt = performance.now()
      gap = setTimeout(() => {
        doneMs += VOICE_GAP_MS
        playClip()
      }, VOICE_GAP_MS)
    })
    // Browsers may refuse to play (e.g. before any user gesture): the text is still there.
    if (!paused)
      audio.play().catch(() => {
        if (!stopped) onRefused?.()
      })
  }

  const playback: VoicePlayback = {
    elapsedMs() {
      if (gapStartedAt !== null) return doneMs + Math.min(performance.now() - gapStartedAt, VOICE_GAP_MS)
      if (audio && index < audios.length) return doneMs + audio.currentTime * 1000
      return doneMs
    },
    stop() {
      stopped = true
      clearTimeout(gap)
      audio?.pause()
      if (current === playback) current = null
    },
    pause() {
      paused = true
      audio?.pause()
    },
    resume() {
      if (stopped || !paused) return
      paused = false
      if (audio && !audio.ended) audio.play().catch(() => {})
    },
  }

  current = playback
  playClip()
  return playback
}

function normalise(word: string): string {
  return word
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-zñ0-9]/g, '')
}

/**
 * When each character of `text` is due, in ms on the line's clock, from the
 * words of its clips. Text words are matched to voiced words in order; a word
 * that is not voiced (e.g. the player's name) appears with the next one. Each
 * word is typed out while it is said. Undefined when a clip has no word timings.
 */
export function voiceCharTimes(text: string, clips: readonly VoiceClip[]): number[] | undefined {
  if (clips.some((clip) => !clip.words)) return undefined
  const voiced: { norm: string; startMs: number; endMs: number }[] = []
  let offset = 0
  for (const clip of clips) {
    for (const word of clip.words ?? []) {
      voiced.push({ norm: normalise(word.text), startMs: offset + word.startMs, endMs: offset + word.endMs })
    }
    offset += clip.durationMs + VOICE_GAP_MS
  }

  const times: number[] = []
  let next = 0
  let lastMs = 0
  const tokens = text.matchAll(/(\s*)(\S+)/g)
  for (const [, space, word] of tokens) {
    const target = voiced[next]
    let startMs = target?.startMs ?? lastMs
    let endMs = startMs
    if (target && normalise(word) === target.norm) {
      endMs = target.endMs
      next += 1
    }
    startMs = Math.max(startMs, lastMs)
    endMs = Math.max(endMs, startMs)
    for (let i = 0; i < space.length; i += 1) times.push(startMs)
    for (let i = 0; i < word.length; i += 1) times.push(startMs + ((endMs - startMs) * (i + 1)) / word.length)
    lastMs = endMs
  }
  // Trailing spaces, if any.
  while (times.length < text.length) times.push(lastMs)
  return times
}
