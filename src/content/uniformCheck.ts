import type { GenderedText } from '@studiolxd/tramoya'
import type { FigureBox } from '../design-system'
import type { AssetId } from './assets'

// Scenes 28 to 34 of the "Guion" sheet: activity 8 "Revisa tu uniforme e
// higiene" and David's conclusion. Elements and feedback come from the
// "Actividades de aprendizaje" sheet.
//
// Each element has its boxes on the worker picture (420×1000) or on the picture
// of the hands (1200×600), and a layer for each state, as large as its box: the
// final art must keep these sizes and places, or the boxes must follow it.

export interface UniformElement {
  id: string
  /** Accessible name of what is pressed, e.g. "Oreja". */
  label: string
  /** Where it is; pressing any of its boxes corrects it (e.g. both ears). */
  boxes: FigureBox[]
  problem: AssetId
  corrected: AssetId
  feedback: string
}

export interface Worker {
  id: string
  /** Accessible name and description of the worker. */
  label: string
  image: AssetId
  hands: AssetId
  elements: UniformElement[]
  /** Elements checked in the close-up of the hands (the nails). */
  handElements: UniformElement[]
}

// Scenes 28 to 33 (activity 8)
export const uniformCheck = {
  heading: 'Revisión de uniforme e higiene',
  backgroundAlt:
    'El vestuario del personal, con cuatro compañeros de pie, de frente, a punto de empezar su turno.',
  title: 'Antes de comenzar, revisa tu uniforme e higiene',
  statement: [
    'Cuatro compañeros están a punto de empezar su jornada en la cocina. Antes de entrar, hay que revisar que su aspecto sea el adecuado: uniforme completo y limpio, higiene personal correcta y sin objetos que puedan contaminar los alimentos o suponer un riesgo.',
    'Observa bien a cada personaje y pulsa sobre todos los elementos que deban modificarse, retirarse o corregirse. ¡No se te puede escapar ni uno! Cuando los tengas todos, ese trabajador estará listo para empezar.',
  ],
  statementLabel: 'Enunciado de la actividad',
  openStatement: 'Ver el enunciado',
  closeStatement: 'Cerrar el enunciado',
  zoomHands: (worker: string, side: 'left' | 'right') =>
    `Ver de cerca las manos (${side === 'left' ? 'izquierda' : 'derecha'}) · ${worker}`,
  handsLabel: (worker: string) => `Manos · ${worker}`,
  /** Centre of the zoom buttons on the worker picture, over each hand. */
  zoomAt: { left: { x: 75, y: 650 }, right: { x: 345, y: 650 } },
  back: 'Volver',
  wrong: 'Ese elemento no supone un problema para la seguridad alimentaria.',
  feedbackContinue: 'Continuar',
  finish: 'Finalizar',
  workers: [
    {
      id: 'worker1',
      label: 'Personaje 1: hombre con camisa blanca, pantalón negro largo, gorro y zapatos negros',
      image: 'worker1',
      hands: 'worker1Hands',
      elements: [
        {
          id: 'beard',
          label: 'Barba',
          boxes: [{ x: 150, y: 170, width: 120, height: 70 }],
          problem: 'worker1BeardProblem',
          corrected: 'worker1BeardCorrected',
          feedback: '¡Bien! La barba puede acumular microorganismos y restos de comida. Debe cubrirse con una redecilla de protección.',
        },
        {
          id: 'phone',
          label: 'Bolsillo',
          boxes: [{ x: 235, y: 290, width: 70, height: 80 }],
          problem: 'worker1PhoneProblem',
          corrected: 'worker1PhoneCorrected',
          feedback: '¡Muy bien! El móvil acumula microorganismos y no debe llevarse durante la manipulación de alimentos.',
        },
        {
          id: 'earring',
          label: 'Oreja',
          boxes: [{ x: 290, y: 110, width: 40, height: 80 }],
          problem: 'worker1EarringProblem',
          corrected: 'worker1EarringCorrected',
          feedback: '¡Bien visto! Los pendientes grandes pueden caerse y contaminar los alimentos. No deben llevarse durante la jornada.',
        },
      ],
      handElements: [
        {
          id: 'nails',
          label: 'Uñas',
          boxes: [{ x: 120, y: 40, width: 380, height: 170 }, { x: 700, y: 40, width: 380, height: 170 }],
          problem: 'worker1NailsProblem',
          corrected: 'worker1NailsCorrected',
          feedback: '¡Correcto! Las uñas sucias son un foco de contaminación. Hay que mantenerlas cortas y limpias.',
        },
      ],
    },
    {
      id: 'worker2',
      label: 'Personaje 2: hombre con camiseta de tirantes blanca, pantalón negro y zapatos',
      image: 'worker2',
      hands: 'worker2Hands',
      elements: [
        {
          id: 'shirt',
          label: 'Camiseta',
          boxes: [{ x: 100, y: 240, width: 220, height: 290 }],
          problem: 'worker2ShirtProblem',
          corrected: 'worker2ShirtCorrected',
          feedback: '¡Correcto! La ropa de calle no sirve como uniforme. Debe usarse la camisa del uniforme, limpia.',
        },
        {
          id: 'watch',
          label: 'Muñeca',
          boxes: [{ x: 40, y: 540, width: 70, height: 60 }],
          problem: 'worker2WatchProblem',
          corrected: 'worker2WatchCorrected',
          feedback: '¡Bien! El reloj puede acumular suciedad y microorganismos. Debe retirarse antes de manipular alimentos.',
        },
        {
          id: 'stain',
          label: 'Pantalón',
          boxes: [{ x: 170, y: 700, width: 80, height: 70 }],
          problem: 'worker2StainProblem',
          corrected: 'worker2StainCorrected',
          feedback: '¡Muy bien! El uniforme debe estar limpio. Si se mancha, hay que cambiarlo o limpiarlo.',
        },
        {
          id: 'cap',
          label: 'Cabeza',
          boxes: [{ x: 140, y: 20, width: 140, height: 70 }],
          problem: 'worker2CapProblem',
          corrected: 'worker2CapCorrected',
          feedback: '¡Correcto! El gorro de cocina es obligatorio para evitar que el pelo caiga en los alimentos.',
        },
      ],
      handElements: [],
    },
    {
      id: 'worker3',
      label: 'Personaje 3: mujer con camisa blanca, pantalón negro largo y zapatos',
      image: 'worker3',
      hands: 'worker3Hands',
      elements: [
        {
          id: 'earrings',
          label: 'Orejas',
          boxes: [{ x: 90, y: 110, width: 40, height: 90 }, { x: 290, y: 110, width: 40, height: 90 }],
          problem: 'worker3EarringsProblem',
          corrected: 'worker3EarringsCorrected',
          feedback: '¡Bien! Los pendientes grandes pueden desprenderse y contaminar los alimentos. Deben retirarse.',
        },
        {
          id: 'bracelet',
          label: 'Muñeca',
          boxes: [{ x: 310, y: 540, width: 70, height: 60 }],
          problem: 'worker3BraceletProblem',
          corrected: 'worker3BraceletCorrected',
          feedback: '¡Correcto! Las joyas acumulan suciedad y pueden caerse. No deben llevarse durante la manipulación.',
        },
        {
          id: 'cap',
          label: 'Cabeza',
          boxes: [{ x: 140, y: 20, width: 140, height: 70 }],
          problem: 'worker3CapProblem',
          corrected: 'worker3CapCorrected',
          feedback: '¡Correcto! El gorro de cocina es obligatorio para evitar que el pelo caiga en los alimentos.',
        },
      ],
      handElements: [
        {
          id: 'nails',
          label: 'Uñas',
          boxes: [{ x: 120, y: 40, width: 380, height: 170 }, { x: 700, y: 40, width: 380, height: 170 }],
          problem: 'worker3NailsProblem',
          corrected: 'worker3NailsCorrected',
          feedback: '¡Muy bien! Las uñas deben estar cortas y limpias para evitar acumular suciedad y contaminar los alimentos.',
        },
      ],
    },
    {
      id: 'worker4',
      label: 'Personaje 4: mujer con camisa blanca, pantalón negro, gorro de cocina y zapatos de tacón',
      image: 'worker4',
      hands: 'worker4Hands',
      elements: [
        {
          id: 'hair',
          label: 'Pelo',
          boxes: [{ x: 100, y: 120, width: 40, height: 180 }, { x: 280, y: 120, width: 40, height: 180 }],
          problem: 'worker4HairProblem',
          corrected: 'worker4HairCorrected',
          feedback: '¡Bien! El pelo debe llevarse recogido y cubierto por el gorro para evitar que caiga en los alimentos.',
        },
        {
          id: 'armpits',
          label: 'Axilas',
          boxes: [{ x: 90, y: 300, width: 60, height: 70 }, { x: 270, y: 300, width: 60, height: 70 }],
          problem: 'worker4ArmpitsProblem',
          corrected: 'worker4ArmpitsCorrected',
          feedback: '¡Correcto! La higiene corporal es imprescindible. Una ropa limpia no sustituye una higiene personal adecuada.',
        },
        {
          id: 'shoes',
          label: 'Zapatos',
          boxes: [{ x: 110, y: 920, width: 200, height: 70 }],
          problem: 'worker4ShoesProblem',
          corrected: 'worker4ShoesCorrected',
          feedback: '¡Muy bien! El calzado debe ser apropiado para trabajar: cerrado, cómodo, antideslizante y seguro.',
        },
      ],
      handElements: [
        {
          id: 'nails',
          label: 'Uñas',
          boxes: [{ x: 120, y: 40, width: 380, height: 170 }, { x: 700, y: 40, width: 380, height: 170 }],
          problem: 'worker4NailsProblem',
          corrected: 'worker4NailsCorrected',
          feedback: '¡Bien visto! El esmalte puede desprenderse y caer en los alimentos. Las uñas deben llevarse sin pintar, cortas y limpias.',
        },
      ],
    },
  ] satisfies Worker[],
}

// Scene 34
export const uniformConclusion = {
  heading: 'Vestuario: conclusión de la revisión',
  backgroundAlt:
    'El vestuario del personal: tres filas de taquillas al fondo, un banco corrido delante, un perchero a la izquierda y un cartel en la pared derecha, junto a la puerta.',
  davidAlt: 'David, de pie junto a la puerta.',
  speech: [
    'La ropa de calle no sirve como ropa de trabajo: acumula polvo, suciedad y microorganismos. El uniforme debe estar limpio al empezar la jornada, usarse solo para trabajar, cambiarse si se mancha y guardarse separado de la ropa de calle.',
    'Pero una ropa limpia no sustituye una buena higiene personal. Las dos cosas son necesarias para evitar que los microorganismos pasen de ti a los alimentos.',
    (g) =>
      `Bien. ${g('Ya estás listo para entrar en la cocina', 'Ya estás lista para entrar en la cocina', 'Ya puedes entrar en la cocina')}. Y allí, lo primero que vas a hacer es algo que repetirás cientos de veces al día... aunque no lo parezca. Ven, te lo enseño.`,
  ] satisfies GenderedText[],
  next: 'Seguir a David',
}
