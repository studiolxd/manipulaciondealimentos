// Scenes 41 to 43 of the "Guion" sheet: activity 11, the first-aid kit and the
// note inside it. Texts come from the "Guion" sheet.

const backgroundAlt =
  'Una zona de la cocina: una encimera pequeña con cajones y, colgado en la pared sobre ella, el botiquín.'

// Scene 41
export const firstAidIntro = {
  heading: 'Cocina: el botiquín',
  backgroundAlt,
  davidAlt: 'David, de pie junto a la encimera.',
  speech: [
    'Aquí guardamos el botiquín, por si algún día hay un corte, una herida o cualquier problema de salud durante la jornada.',
    'Dentro hay una nota que deberías leer con calma.',
  ],
  next: 'Continuar',
}

// Scene 42
export const firstAidNote = {
  heading: 'Nota del botiquín: las heridas y la manipulación de alimentos',
  backgroundAlt: 'El botiquín abierto, con una nota en su interior.',
  title: 'Heridas y lesiones de la piel',
  paragraphs: [
    'Las heridas, cortes, rasguños, granos infectados y otras lesiones de la piel pueden contener microorganismos y contaminar los alimentos.',
    'Por eso, cualquier lesión debe mantenerse limpia y correctamente protegida antes de comenzar a trabajar. Si se encuentra en la mano o en una zona próxima a los alimentos, debe cubrirse con un apósito impermeable y bien ajustado.',
    'Cuando exista riesgo de que el apósito se desprenda, deberá protegerse además con un guante de un solo uso, siguiendo los procedimientos del establecimiento.',
    'Si la herida está infectada, presenta pus, no puede cubrirse adecuadamente o impide trabajar de forma segura, debes informar a la persona responsable para que valore si es necesario cambiar de tarea o dejar de manipular alimentos.',
    'Nunca manipules alimentos con una herida abierta o sin proteger.',
  ],
  /** The button appears after this long, so the note is read first. */
  readMs: 5000,
  next: 'Continuar',
}

// Scene 43
export const firstAidConclusion = {
  heading: 'Cocina: ahora, a ponerlo en práctica',
  backgroundAlt,
  davidAlt: 'David, de pie junto a la encimera.',
  speech: ['Y ahora que ya sabes cómo proteger una herida, vamos a ponerte en situación. ¿Te atreves?'],
  next: '¡Vamos!',
}
