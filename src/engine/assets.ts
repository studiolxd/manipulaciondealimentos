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
  diningTableTopBackground: { path: 'assets/backgrounds/dining-table-top.png', width: 1920, height: 1080 },
  playerMale: { path: 'assets/avatars/player-male.png', width: 480, height: 640 },
  playerFemale: { path: 'assets/avatars/player-female.png', width: 480, height: 640 },
  davidStanding: { path: 'assets/characters/david-standing.png', width: 640, height: 960 },
  davidSeated: { path: 'assets/characters/david-seated.png', width: 720, height: 640 },
  davidPortrait: { path: 'assets/characters/david-portrait.png', width: 200, height: 200 },
  rotateDeviceIcon: { path: 'assets/ui/rotate-device.png', width: 240, height: 240 },
  nextIcon: { path: 'assets/ui/next.png', width: 96, height: 96 },
  hudBar: { path: 'assets/ui/hud-bar.png', width: 1920, height: 120 },
  statementIcon: { path: 'assets/ui/statement.png', width: 120, height: 120 },
  closeIcon: { path: 'assets/ui/close.png', width: 96, height: 96 },
  correctIcon: { path: 'assets/ui/correct.png', width: 96, height: 96 },
  incorrectIcon: { path: 'assets/ui/incorrect.png', width: 96, height: 96 },
  // Activity 2: portraits on the ID cards, head to chest, in work uniform.
  cardOscar: { path: 'assets/cards/oscar.png', width: 360, height: 440 },
  cardLaura: { path: 'assets/cards/laura.png', width: 360, height: 440 },
  cardPablo: { path: 'assets/cards/pablo.png', width: 360, height: 440 },
  cardMarta: { path: 'assets/cards/marta.png', width: 360, height: 440 },
  cardMiguel: { path: 'assets/cards/miguel.png', width: 360, height: 440 },
  cardJavier: { path: 'assets/cards/javier.png', width: 360, height: 440 },
  cardAna: { path: 'assets/cards/ana.png', width: 360, height: 440 },
  cardSonia: { path: 'assets/cards/sonia.png', width: 360, height: 440 },
  cardCarmen: { path: 'assets/cards/carmen.png', width: 360, height: 440 },
  cardSergio: { path: 'assets/cards/sergio.png', width: 360, height: 440 },
  cardElena: { path: 'assets/cards/elena.png', width: 360, height: 440 },
} as const satisfies Record<string, AssetSpec>

export type AssetId = keyof typeof assets
