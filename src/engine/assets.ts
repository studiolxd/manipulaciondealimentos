// Every graphic in the game is listed here. Files live in public/ with stable
// names, so final artwork replaces a placeholder by overwriting the PNG with
// the same name and size. No code changes are needed.

export interface AssetSpec {
  path: string
  width: number
  height: number
}

export const assets = {
  avatarSelectBackground: { path: 'assets/backgrounds/avatar-select.png', width: 1920, height: 1080 },
  facadeBackground: { path: 'assets/backgrounds/facade.png', width: 1920, height: 1080 },
  diningRoomBackground: { path: 'assets/backgrounds/dining-room.png', width: 1920, height: 1080 },
  diningTableBackground: { path: 'assets/backgrounds/dining-table.png', width: 1920, height: 1080 },
  playerMale: { path: 'assets/avatars/player-male.png', width: 480, height: 640 },
  playerFemale: { path: 'assets/avatars/player-female.png', width: 480, height: 640 },
  davidStanding: { path: 'assets/characters/david-standing.png', width: 640, height: 960 },
  davidSeated: { path: 'assets/characters/david-seated.png', width: 720, height: 640 },
  davidPortrait: { path: 'assets/characters/david-portrait.png', width: 200, height: 200 },
  rotateDeviceIcon: { path: 'assets/ui/rotate-device.png', width: 240, height: 240 },
  nextIcon: { path: 'assets/ui/next.png', width: 96, height: 96 },
} as const satisfies Record<string, AssetSpec>

export type AssetId = keyof typeof assets
