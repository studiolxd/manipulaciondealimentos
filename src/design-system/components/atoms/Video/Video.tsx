import { useImperativeHandle, useRef, type Ref } from 'react'
import type { ImageSource } from '../../../types'
import styles from './Video.module.css'

export interface VideoHandle {
  /** Plays it again from the start. */
  replay: () => void
}

interface VideoProps {
  source: ImageSource
  /** What the video shows, for screen readers (videos have no sound). */
  label: string
  /** Darkens the frame with a veil, e.g. while a question is asked over it. */
  dimmed?: boolean
  ref?: Ref<VideoHandle>
  onEnded?: () => void
}

// A silent clip that plays once on its own and stays on its last frame. It
// fills its container.
export function Video({ source, label, dimmed = false, ref, onEnded }: VideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useImperativeHandle(ref, () => ({
    replay() {
      const video = videoRef.current
      if (!video) return
      video.currentTime = 0
      video.play().catch(() => {})
    },
  }))

  return (
    <div className={styles.frame} data-dimmed={dimmed || undefined}>
      <video
        ref={videoRef}
        className={styles.video}
        src={source.src}
        width={source.width}
        height={source.height}
        aria-label={label}
        autoPlay
        muted
        playsInline
        onEnded={onEnded}
      />
    </div>
  )
}
