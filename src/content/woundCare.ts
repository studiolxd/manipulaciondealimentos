// Scenes 44 to 47 of the "Guion" sheet: activity 12 "Heridas a raya" (a
// simulation and a test) and David's conclusion. Situations and feedback come
// from the "Actividades de aprendizaje" sheet.

const backgroundAlt =
  'Una zona de la cocina con una encimera. En primer plano, las manos del alumno con una pequeña herida y, alrededor, algodón, desinfectante, apósito, tijeras y un guante de un solo uso.'

export interface InjurySituation {
  id: string
  situation: string
  /** The right answer is always the first; the scene shuffles them. */
  answers: [string, string, string]
  /** Feedback without the "¡Correcto!/¡Incorrecto!" prefix. */
  explanation: string
}

// Scenes 44 to 46 (activity 12)
export const woundCare = {
  heading: 'Heridas a raya: protege, decide y trabaja seguro',
  backgroundAlt,
  title: 'Heridas a raya: protege, decide y trabaja seguro',
  statement: [
    'Te has hecho una pequeña herida en la mano y estás en plena jornada en la cocina. Antes de volver a manipular alimentos, debes protegerla correctamente.',
    'Alrededor de tus manos tienes varias herramientas: selecciona y ejecuta los pasos necesarios para dejar la herida limpia y bien cubierta.',
  ],
  statementLabel: 'Enunciado de la actividad',
  openStatement: 'Ver el enunciado',
  closeStatement: 'Cerrar el enunciado',
  // Accessible names of the pieces; with the keyboard, pressing one stands for its gesture.
  labels: {
    hands: 'Manos',
    wound: 'Herida',
    cotton: 'Algodón',
    bottle: 'Bote de desinfectante de heridas',
    dressing: 'Apósito',
    scissors: 'Tijeras',
    glove: 'Guante de un solo uso',
  },
  /** Feedback of each step of the simulation, in order. */
  stepFeedback: ['¡Bien hecho!', '¡Muy bien!', '¡Perfecto!'],
  check: 'Comprobar',
  progress: (current: number, total: number) => `Situación ${current} de ${total}`,
  correct: '¡Correcto!',
  incorrect: '¡Incorrecto!',
  next: 'Siguiente',
  finish: 'Terminar',
  situations: [
    {
      id: 'clean-covered',
      situation: 'Herida limpia y correctamente cubierta con un apósito impermeable.',
      answers: [
        'Puede continuar trabajando.',
        'Debe informar al responsable y dejar de manipular alimentos.',
        'Debe retirarse el apósito antes de continuar.',
      ],
      explanation:
        'Si la herida está limpia y correctamente cubierta con un apósito impermeable, se puede continuar trabajando con normalidad.',
    },
    {
      id: 'dressing-may-come-off',
      situation: 'Herida en la mano cubierta, pero el apósito puede desprenderse durante el trabajo.',
      answers: [
        'Debe protegerse además con un guante de un solo uso.',
        'Puede continuar sin cambios, porque la herida ya está cubierta.',
        'Debe informar al responsable y abandonar la manipulación de alimentos.',
      ],
      explanation:
        'Si existe riesgo de que el apósito se desprenda durante el trabajo, hay que proteger la herida además con un guante de un solo uso.',
    },
    {
      id: 'pus',
      situation: 'Herida con presencia de pus.',
      answers: [
        'Debe informar al responsable.',
        'Puede continuar si se limpia con alcohol antes de trabajar.',
        'Puede continuar si se cubre con doble apósito.',
      ],
      explanation:
        'La presencia de pus indica infección. No se debe manipular alimentos y hay que informar al responsable de inmediato.',
    },
    {
      id: 'cannot-cover',
      situation: 'Herida que no puede cubrirse completamente con un apósito ni con un guante.',
      answers: [
        'Debe informar al responsable.',
        'Puede continuar si se coloca un guante por encima.',
        'Puede continuar si evita tocar los alimentos directamente.',
      ],
      explanation:
        'Si la herida no puede cubrirse bien, no hay garantía de que no contamine los alimentos. Hay que informar al responsable.',
    },
    {
      id: 'cannot-move-hand',
      situation: 'Lesión que te impide mover la mano con normalidad y trabajar de forma segura.',
      answers: [
        'Debe informar al responsable para valorar un cambio de tarea o dejar de manipular alimentos.',
        'Puede continuar si se coloca un guante de un solo uso.',
        'Puede continuar si se cubre la lesión con un apósito impermeable.',
      ],
      explanation:
        'Si la lesión impide trabajar con seguridad, hay que informar al responsable para que valore un cambio de tarea o dejar de manipular alimentos.',
    },
  ] satisfies InjurySituation[],
}

// Scene 47
export const woundCareConclusion = {
  heading: 'Cocina: conclusión de Heridas a raya',
  backgroundAlt:
    'Una zona de la cocina: una encimera pequeña con cajones y, colgado en la pared sobre ella, el botiquín.',
  davidAlt: 'David, de pie junto a la encimera.',
  speech: [
    'Cualquier herida, corte o lesión en la piel puede contener microorganismos y contaminar los alimentos. Por eso debe mantenerse limpia y bien protegida antes de trabajar: apósito impermeable y ajustado y, si hay riesgo de que se desprenda, un guante de un solo uso.',
    'Si la herida está infectada, presenta pus, no puede cubrirse bien o te impide trabajar con seguridad, informa al responsable. Y recuerda la regla de oro: nunca manipules alimentos con una herida abierta o sin proteger.',
  ],
  next: 'Continuar',
}
