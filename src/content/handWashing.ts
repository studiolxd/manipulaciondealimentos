// Scenes 35 to 37 of the "Guion" sheet: activity 9 "Manos a la obra: el lavado
// perfecto" and David's conclusion. Steps, hints and feedback come from the
// "Actividades de aprendizaje" sheet.

const backgroundAlt =
  'El fregadero de la cocina profesional visto desde delante, con el grifo y el dosificador de jabón; a un lado, el dispensador de toallas de papel.'

// Scenes 35 and 36 (activity 9)
export const handWashing = {
  heading: 'Manos a la obra: el lavado perfecto',
  backgroundAlt,
  title: 'Manos a la obra: el lavado perfecto',
  statement: [
    'Tus manos son la herramienta más importante… y también la vía más fácil para contaminar un alimento.',
    'A la derecha encontrarás la checklist con los pasos para un lavado correcto. Tu misión es completarlos todos en orden. Si te saltas un paso o no completas bien el movimiento, no avanzarás.',
    'Solo cuando termines la lista tendrás unas manos listas para manipular alimentos con seguridad. ¿Te atreves?',
  ],
  statementLabel: 'Enunciado de la actividad',
  openStatement: 'Ver el enunciado',
  closeStatement: 'Cerrar el enunciado',
  checklistTitle: 'Lavado de manos',
  steps: [
    'Mojar las manos con agua potable.',
    'Aplicar jabón líquido suficiente.',
    'Frotar durante al menos 20 segundos.',
    'Limpiar bien las palmas, el dorso, los espacios entre los dedos, las yemas, los pulgares, las uñas y las muñecas.',
    'Aclarar completamente con agua corriente.',
    'Secar bien las manos con papel desechable.',
  ],
  // What to do now, one per step (step 4 uses the hint of each part).
  hints: [
    'Arrastra las manos hasta el grifo y mantén pulsado hasta que el agua las cubra.',
    'Pulsa el dosificador de jabón y arrastra el jabón hasta las manos.',
    'Frota las palmas entre sí con movimientos circulares y rápidos.',
    '',
    'Arrastra de nuevo las manos hasta el grifo y mantén pulsado hasta que desaparezca toda la espuma.',
    'Coge una toalla de papel y frótala sobre las manos de arriba abajo hasta que queden secas.',
  ],
  zones: [
    { label: 'Palmas', hint: 'Haz círculos amplios con ambas manos enfrentadas.' },
    { label: 'Dorso', hint: 'Mueve una mano de arriba abajo sobre la otra, con los dedos entrelazados.' },
    { label: 'Espacios entre los dedos', hint: 'Haz zigzag entre los dedos.' },
    { label: 'Yemas', hint: 'Haz pequeños círculos con las puntas de los dedos sobre la palma contraria.' },
    { label: 'Pulgares', hint: 'Gira alrededor del pulgar con la otra mano.' },
    { label: 'Uñas', hint: 'Frota las uñas contra la palma contraria.' },
    { label: 'Muñecas', hint: 'Haz círculos alrededor de la muñeca.' },
  ],
  // Accessible names; with the keyboard, pressing an object stands for its gesture.
  hands: 'Manos. Con el teclado, pulsa Intro para frotarlas.',
  tap: 'Grifo. Con el teclado, pulsa Intro para abrirlo y mojar las manos.',
  soap: 'Dosificador de jabón',
  droplet: 'Jabón. Con el teclado, pulsa Intro para echarlo en las manos.',
  towel: 'Toalla de papel',
  seconds: (done: number, total: number) => `${done} de ${total} segundos`,
  zone: (current: number, total: number) => `Zona ${current} de ${total}`,
  /** Feedback of each step, in order. */
  stepFeedback: ['¡Bien hecho!', '¡Muy bien!', '¡Perfecto!', '¡Estupendo!', '¡Fabuloso!', '¡Excelente!'],
  wrongOrder: 'Aún no es el turno de ese paso. Sigue la checklist en orden: cada paso prepara el siguiente.',
  next: 'Continuar',
}

// Scene 37
export const handWashingConclusion = {
  heading: 'Cocina: conclusión del lavado de manos',
  backgroundAlt,
  davidAlt: 'David, de pie junto al fregadero.',
  speech: [
    'Lavarse las manos correctamente no es un gesto simbólico: es el primer paso y el más importante para evitar la contaminación de los alimentos. Mojar, enjabonar, frotar, aclarar, secar con papel desechable y no volver a tocar superficies sucias son pasos que, en conjunto, marcan la diferencia entre unas manos seguras y unas manos que contaminan.',
    'Recuerda: un lavado correcto protege al consumidor y protege también al propio manipulador.',
    'Pero no basta con saber lavarse: hay que saber cuándo hacerlo. Durante una jornada, las manos tocan decenas de cosas… y no todas son igual de seguras. Vamos a comprobarlo.',
  ],
  next: '¡Vamos!',
}
