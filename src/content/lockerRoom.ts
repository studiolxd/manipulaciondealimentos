import type { GenderedText } from '@studiolxd/tramoya'
import type { PosterBlock } from '../design-system'

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
  blocks: [
    { type: 'text', text: 'El estado de salud del manipulador puede influir directamente en la seguridad de los alimentos.', strong: true },
    {
      type: 'text',
      text: 'Algunas enfermedades e infecciones pueden transmitirse a través de los alimentos, especialmente cuando se presentan síntomas como:',
    },
    {
      type: 'list',
      items: [
        'Diarrea.',
        'Vómitos.',
        'Fiebre.',
        'Dolor de garganta acompañado de fiebre.',
        'Infecciones en la piel.',
        'Secreciones abundantes de nariz, ojos u oídos.',
        'Otros síntomas que puedan indicar una enfermedad infecciosa.',
      ],
    },
    {
      type: 'text',
      text: 'Si presentas alguno de estos síntomas, debes informar inmediatamente a la persona responsable del establecimiento. Será necesario valorar si puedes continuar trabajando, si debes realizar temporalmente otras tareas o si debes dejar de manipular alimentos hasta que el riesgo haya desaparecido.',
      strong: true,
    },
    {
      type: 'text',
      text: 'No debes ocultar los síntomas ni tomar la decisión por tu cuenta. Tampoco debes pensar que seguir trabajando enfermo demuestra compromiso. Lo responsable es comunicar la situación y evitar poner en riesgo a los consumidores y al resto del equipo.',
    },
    {
      type: 'text',
      text: 'Además, una persona puede continuar siendo portadora de determinados microorganismos después de que los síntomas hayan desaparecido. Por ello, la reincorporación a las tareas de manipulación debe realizarse siguiendo las indicaciones establecidas por la empresa y, cuando corresponda, por los profesionales sanitarios.',
    },
    {
      type: 'text',
      text: 'La seguridad alimentaria comienza con hábitos personales adecuados y con la responsabilidad de reconocer cuándo nuestro estado puede afectar a los alimentos.',
      strong: true,
    },
  ] satisfies PosterBlock[],
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
