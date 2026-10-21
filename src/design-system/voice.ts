// Voice-overs: one line at a time. A line is a list of clips played in order
// with a short pause between them, so a sentence can be split at a full stop
// (e.g. a common part and an ending that depends on the form of address).

// Pause between the clips of one line, like the one between two sentences.
const GAP_MS = 300

export interface VoicePlayback {
  stop: () => void
  pause: () => void
  resume: () => void
}

let enabled = true
let current: VoicePlayback | null = null

/** Turns voice-overs on or off (e.g. from the player's settings). */
export function setVoiceEnabled(value: boolean): void {
  enabled = value
  if (!value) stopVoice()
}

export function stopVoice(): void {
  current?.stop()
  current = null
}

/** Plays a line, stopping any other one. Returns null when voice-overs are off. */
export function playVoice(urls: readonly string[]): VoicePlayback | null {
  stopVoice()
  if (!enabled || urls.length === 0 || typeof Audio === 'undefined') return null

  let index = 0
  let audio: HTMLAudioElement | null = null
  let gap: ReturnType<typeof setTimeout> | undefined
  let stopped = false
  let paused = false

  function playClip() {
    if (stopped || index >= urls.length) return
    audio = new Audio(urls[index])
    audio.addEventListener('ended', () => {
      index += 1
      gap = setTimeout(playClip, GAP_MS)
    })
    // Browsers may refuse to play (e.g. before any user gesture): the text is still there.
    if (!paused) audio.play().catch(() => {})
  }

  const playback: VoicePlayback = {
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
