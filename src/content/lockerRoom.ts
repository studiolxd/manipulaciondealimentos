import type { GenderedText } from '@studiolxd/tramoya'

// Scenes 24 to 27 of the "Guion" sheet: the changing room (activity 6), the
// health poster (activity 7) and David's conclusion.

const backgroundAlt =
  'El vestuario del personal: tres filas de taquillas al fondo, un banco corrido delante, un perchero a la izquierda y un cartel en la pared derecha, junto a la puerta.'

// Scene 24
export const lockerRoom1 = {
  heading: 'Vestuario: la primera barrera eres tú',
  backgroundAlt,
  davidAlt: 'David, de pie junto a la puerta.',
  speech: [
    (g) =>
      `${g('Bienvenido', 'Bienvenida', 'Te damos la bienvenida')} al vestuario. Aquí empieza todo: antes de tocar un alimento, hay que estar listo para hacerlo.`,
    'Cuando pensamos en seguridad alimentaria, miramos los alimentos, las instalaciones, los utensilios... Pero la primera barrera frente a la contaminación eres tú.',
    'Tu cuerpo alberga microorganismos de forma natural: en la piel, el cabello, la boca, la nariz... No los ves, pero pueden llegar a los alimentos mientras los preparas o los sirves.',
  ] satisfies GenderedText[],
  next: 'Continuar',
}

// Scene 25
export const lockerRoom2 = {
  heading: 'Vestuario: la higiene personal',
  backgroundAlt,
  davidAlt: 'David, de pie junto al cartel de la pared.',
  speech: [
    'La contaminación puede ser directa, al tocar un alimento, o indirecta, a través de la ropa, los utensilios o las superficies.',
    'Por eso la higiene personal no es solo imagen: es una medida esencial para proteger los alimentos.',
    'Implica cuidar el aseo, usar bien la ropa de trabajo, proteger las zonas del cuerpo que puedan contaminar y respetar las normas del establecimiento.',
    'Y hablando de normas... ¿ves ese cartel? Ahí tienes la siguiente pista. Échale un vistazo con calma.',
  ],
  next: 'Ver cartel',
}

// Scene 26 (activity 7)
export const healthPoster = {
  heading: 'Cartel del vestuario: la salud del manipulador',
  backgroundAlt,
  title: 'La salud del manipulador',
  lead: 'Si estás enfermo, puedes contaminar los alimentos.',
  listTitle: 'Avisa si tienes',
  items: [
    'Diarrea',
    'Vómitos',
    'Fiebre',
    'Dolor de garganta con fiebre',
    'Infecciones en la piel',
    'Secreciones de nariz, ojos u oídos',
    'Otros síntomas de infección',
  ],
  stepsTitle: 'Qué hacer',
  steps: [
    'Informa de inmediato a tu responsable.',
    'No lo ocultes ni decidas por tu cuenta.',
    'Vuelve a manipular alimentos solo cuando te lo indiquen.',
  ],
  footer: 'Comunicarlo a tiempo protege a los clientes y a tu equipo.',
  /** The button appears after this long, so the poster is read first. */
  readMs: 7000,
  next: 'Continuar',
}

// Scene 27
export const lockerRoomConclusion = {
  heading: 'Vestuario: conclusión',
  backgroundAlt,
  davidAlt: lockerRoom1.davidAlt,
  speech: [
    'Este cartel está disponible siempre para que todos lo podamos consultar. No queremos que nadie pueda salir perjudicado debido a una mala higiene...',
    '¡Mira! Aquí llegan cuatro compañeros a prepararse para su turno. Son ellos los que ahora te pondrán a prueba.',
  ],
  next: '¡Vamos!',
}
