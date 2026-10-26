// Activity 3: the security camera videos (silent, 1280×720). Files live in
// public/ with stable names: final videos replace the 6-second placeholders
// (pnpm placeholders) by overwriting the file with the same name. Also read by
// scripts/generate-placeholders.ts.
export const videos = {
  camera1: { path: 'assets/cameras/video-1.mp4', width: 1280, height: 720 },
  camera2: { path: 'assets/cameras/video-2.mp4', width: 1280, height: 720 },
  camera3: { path: 'assets/cameras/video-3.mp4', width: 1280, height: 720 },
  camera4: { path: 'assets/cameras/video-4.mp4', width: 1280, height: 720 },
  camera5: { path: 'assets/cameras/video-5.mp4', width: 1280, height: 720 },
  camera6: { path: 'assets/cameras/video-6.mp4', width: 1280, height: 720 },
  camera7: { path: 'assets/cameras/video-7.mp4', width: 1280, height: 720 },
  camera8: { path: 'assets/cameras/video-8.mp4', width: 1280, height: 720 },
} as const

export type VideoId = keyof typeof videos
