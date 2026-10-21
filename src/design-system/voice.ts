// Voice-overs: one line at a time. A line is a list of clips played in order
// with a short pause between them, so a sentence can be split at a full stop
// (e.g. a common part and an ending that depends on the form of address).

// Pause between the clips of one line, like the one between two sentences.
const GAP_MS = 300

export interface VoicePlayback {
  /** How far the line has got, in ms (clips and pauses), following the audio itself. */
  elapsedMs: () => number
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

/**
 * Plays a line, stopping any other one. Returns null when voice-overs are off.
 * `onDuration` gets the length of the whole line in ms (clips and pauses) once
 * it is known, or null if the browser refuses to play it.
 */
export function playVoice(urls: readonly string[], onDuration?: (ms: number | null) => void): VoicePlayback | null {
  stopVoice()
  if (!enabled || urls.length === 0 || typeof Audio === 'undefined') return null

  // Every clip is loaded up front, so the line's length is known before it ends.
  const clips = urls.map((url) => {
    const clip = new Audio(url)
    clip.preload = 'auto'
    return clip
  })
  let index = 0
  let audio: HTMLAudioElement | null = null
  let gap: ReturnType<typeof setTimeout> | undefined
  // Time of the clips (and pauses) already over, and when the current pause began.
  let doneMs = 0
  let gapStartedAt: number | null = null
  let stopped = false
  let paused = false

  let loaded = 0
  for (const clip of clips) {
    clip.addEventListener('loadedmetadata', () => {
      loaded += 1
      if (loaded < clips.length || stopped) return
      const seconds = clips.reduce((sum, each) => sum + each.duration, 0)
      onDuration?.(seconds * 1000 + GAP_MS * (clips.length - 1))
    })
  }

  function playClip() {
    if (stopped || index >= clips.length) return
    gapStartedAt = null
    audio = clips[index]
    audio.addEventListener('ended', () => {
      doneMs += (clips[index]?.duration ?? 0) * 1000
      index += 1
      if (index >= clips.length) return
      gapStartedAt = performance.now()
      gap = setTimeout(() => {
        doneMs += GAP_MS
        playClip()
      }, GAP_MS)
    })
    // Browsers may refuse to play (e.g. before any user gesture): the text is still there.
    if (!paused)
      audio.play().catch(() => {
        if (!stopped) onDuration?.(null)
      })
  }

  const playback: VoicePlayback = {
    elapsedMs() {
      if (gapStartedAt !== null) return doneMs + Math.min(performance.now() - gapStartedAt, GAP_MS)
      if (audio && index < clips.length) return doneMs + audio.currentTime * 1000
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
