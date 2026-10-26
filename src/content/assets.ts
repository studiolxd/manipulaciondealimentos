// Every game graphic (backgrounds, characters, cards) is listed here; interface
// graphics belong to the design system (src/design-system/icons.manifest.ts).
// Files live in public/ with stable names, so final artwork replaces a
// placeholder by overwriting the PNG with the same name and size.

export interface AssetSpec {
  path: string
  width: number
  height: number
}

export const assets = {
  addressFormBackground: { path: 'assets/backgrounds/address-form.png', width: 1920, height: 1080 },
  facadeBackground: { path: 'assets/backgrounds/facade.png', width: 1920, height: 1080 },
  diningRoomBackground: { path: 'assets/backgrounds/dining-room.png', width: 1920, height: 1080 },
  diningTableBackground: { path: 'assets/backgrounds/dining-table.png', width: 1920, height: 1080 },
  diningTableTopBackground: { path: 'assets/backgrounds/dining-table-top.png', width: 1920, height: 1080 },
  davidStanding: { path: 'assets/characters/david-standing.png', width: 640, height: 960 },
  davidSeated: { path: 'assets/characters/david-seated.png', width: 720, height: 640 },
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
  // Scenes 7 to 27: reception, counter, changing room and David standing.
  receptionBackground: { path: 'assets/backgrounds/reception.png', width: 1920, height: 1080 },
  counterTopBackground: { path: 'assets/backgrounds/counter-top.png', width: 1920, height: 1080 },
  lockerRoomBackground: { path: 'assets/backgrounds/locker-room.png', width: 1920, height: 1080 },
  davidHalfBody: { path: 'assets/characters/david-half-body.png', width: 720, height: 900 },
  // Activity 3: thumbnails of the security camera videos (videos.ts).
  cameraThumbnail1: { path: 'assets/cameras/thumbnail-1.png', width: 480, height: 270 },
  cameraThumbnail2: { path: 'assets/cameras/thumbnail-2.png', width: 480, height: 270 },
  cameraThumbnail3: { path: 'assets/cameras/thumbnail-3.png', width: 480, height: 270 },
  cameraThumbnail4: { path: 'assets/cameras/thumbnail-4.png', width: 480, height: 270 },
  cameraThumbnail5: { path: 'assets/cameras/thumbnail-5.png', width: 480, height: 270 },
  cameraThumbnail6: { path: 'assets/cameras/thumbnail-6.png', width: 480, height: 270 },
  cameraThumbnail7: { path: 'assets/cameras/thumbnail-7.png', width: 480, height: 270 },
  cameraThumbnail8: { path: 'assets/cameras/thumbnail-8.png', width: 480, height: 270 },
  // Activity 4: the kitchen with the 8 broken rules (points in kitchenDetectives.ts).
  kitchenScene: { path: 'assets/kitchen/kitchen.png', width: 1600, height: 1000 },
  // Activity 8: workers, their hands and a layer for each state of each element (uniformCheck.ts).
  worker1: { path: 'assets/uniform/worker1.png', width: 420, height: 1000 },
  worker1Hands: { path: 'assets/uniform/worker1-hands.png', width: 1200, height: 600 },
  worker1BeardProblem: { path: 'assets/uniform/worker1-beard-problem.png', width: 120, height: 70 },
  worker1BeardCorrected: { path: 'assets/uniform/worker1-beard-corrected.png', width: 120, height: 70 },
  worker1PhoneProblem: { path: 'assets/uniform/worker1-phone-problem.png', width: 70, height: 80 },
  worker1PhoneCorrected: { path: 'assets/uniform/worker1-phone-corrected.png', width: 70, height: 80 },
  worker1EarringProblem: { path: 'assets/uniform/worker1-earring-problem.png', width: 40, height: 80 },
  worker1EarringCorrected: { path: 'assets/uniform/worker1-earring-corrected.png', width: 40, height: 80 },
  worker1NailsProblem: { path: 'assets/uniform/worker1-nails-problem.png', width: 380, height: 170 },
  worker1NailsCorrected: { path: 'assets/uniform/worker1-nails-corrected.png', width: 380, height: 170 },
  worker2: { path: 'assets/uniform/worker2.png', width: 420, height: 1000 },
  worker2Hands: { path: 'assets/uniform/worker2-hands.png', width: 1200, height: 600 },
  worker2ShirtProblem: { path: 'assets/uniform/worker2-shirt-problem.png', width: 220, height: 290 },
  worker2ShirtCorrected: { path: 'assets/uniform/worker2-shirt-corrected.png', width: 220, height: 290 },
  worker2WatchProblem: { path: 'assets/uniform/worker2-watch-problem.png', width: 70, height: 60 },
  worker2WatchCorrected: { path: 'assets/uniform/worker2-watch-corrected.png', width: 70, height: 60 },
  worker2StainProblem: { path: 'assets/uniform/worker2-stain-problem.png', width: 80, height: 70 },
  worker2StainCorrected: { path: 'assets/uniform/worker2-stain-corrected.png', width: 80, height: 70 },
  worker2CapProblem: { path: 'assets/uniform/worker2-cap-problem.png', width: 140, height: 70 },
  worker2CapCorrected: { path: 'assets/uniform/worker2-cap-corrected.png', width: 140, height: 70 },
  worker3: { path: 'assets/uniform/worker3.png', width: 420, height: 1000 },
  worker3Hands: { path: 'assets/uniform/worker3-hands.png', width: 1200, height: 600 },
  worker3EarringsProblem: { path: 'assets/uniform/worker3-earrings-problem.png', width: 40, height: 90 },
  worker3EarringsCorrected: { path: 'assets/uniform/worker3-earrings-corrected.png', width: 40, height: 90 },
  worker3BraceletProblem: { path: 'assets/uniform/worker3-bracelet-problem.png', width: 70, height: 60 },
  worker3BraceletCorrected: { path: 'assets/uniform/worker3-bracelet-corrected.png', width: 70, height: 60 },
  worker3CapProblem: { path: 'assets/uniform/worker3-cap-problem.png', width: 140, height: 70 },
  worker3CapCorrected: { path: 'assets/uniform/worker3-cap-corrected.png', width: 140, height: 70 },
  worker3NailsProblem: { path: 'assets/uniform/worker3-nails-problem.png', width: 380, height: 170 },
  worker3NailsCorrected: { path: 'assets/uniform/worker3-nails-corrected.png', width: 380, height: 170 },
  worker4: { path: 'assets/uniform/worker4.png', width: 420, height: 1000 },
  worker4Hands: { path: 'assets/uniform/worker4-hands.png', width: 1200, height: 600 },
  worker4HairProblem: { path: 'assets/uniform/worker4-hair-problem.png', width: 40, height: 180 },
  worker4HairCorrected: { path: 'assets/uniform/worker4-hair-corrected.png', width: 40, height: 180 },
  worker4ArmpitsProblem: { path: 'assets/uniform/worker4-armpits-problem.png', width: 60, height: 70 },
  worker4ArmpitsCorrected: { path: 'assets/uniform/worker4-armpits-corrected.png', width: 60, height: 70 },
  worker4ShoesProblem: { path: 'assets/uniform/worker4-shoes-problem.png', width: 200, height: 70 },
  worker4ShoesCorrected: { path: 'assets/uniform/worker4-shoes-corrected.png', width: 200, height: 70 },
  worker4NailsProblem: { path: 'assets/uniform/worker4-nails-problem.png', width: 380, height: 170 },
  worker4NailsCorrected: { path: 'assets/uniform/worker4-nails-corrected.png', width: 380, height: 170 },
} as const satisfies Record<string, AssetSpec>

export type AssetId = keyof typeof assets
