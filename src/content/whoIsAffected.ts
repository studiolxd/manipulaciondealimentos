// Scenes 21 to 23 of the "Guion" sheet: activity 5 "¿A quién afecta?" and
// David's conclusion. Consequences and feedback come from the "Actividades de
// aprendizaje" sheet.

export type Affected = 'consumer' | 'business' | 'handler'

export interface Consequence {
  id: string
  text: string
  affected: Affected
}

// Scenes 21 and 22 (activity 5)
export const whoIsAffected = {
  heading: '¿A quién afecta?',
  backgroundAlt:
    'La recepción del restaurante: un pequeño recibidor con una tablet encima, en una esquina del salón comedor. David está de pie frente a ti.',
  davidAlt: 'David, de pie frente a ti.',
  title: '¿A quién afecta?',
  statement: [
    'Cuando un alimento no se manipula correctamente, las consecuencias no afectan solo a una parte. Detrás de cada error hay personas, negocios y profesionales que pueden salir perjudicados.',
    'Yo te iré leyendo diferentes consecuencias. Tu tarea es elegir el botón correcto según a quién afecta principalmente cada una:',
    'Consumidor → si la consecuencia recae sobre la salud o la experiencia de quien consume el alimento.\nEstablecimiento → si la consecuencia afecta al negocio, su funcionamiento o su economía.\nManipulador → si la consecuencia recae sobre el propio trabajador que manipula los alimentos.',
    'Presta atención a cada consecuencia antes de elegir: algunas pueden parecer similares, pero el impacto principal marca la diferencia.',
  ],
  start: 'Comenzar',
  optionsLabel: '¿A quién afecta principalmente?',
  options: [
    { value: 'consumer', label: 'Consumidor' },
    { value: 'business', label: 'Establecimiento' },
    { value: 'handler', label: 'Manipulador' },
  ] satisfies { value: Affected; label: string }[],
  progress: (current: number, total: number) => `Consecuencia ${current} de ${total}`,
  next: 'Siguiente',
  finish: 'Terminar',
  consequences: [
    { id: 'ill', text: 'Un cliente enferma después de consumir un alimento contaminado.', affected: 'consumer' },
    {
      id: 'medical-care',
      text: 'Un cliente tiene que recibir atención médica después de consumir un alimento contaminado.',
      affected: 'consumer',
    },
    {
      id: 'allergy',
      text: 'Una persona alérgica sufre una reacción grave por una gestión incorrecta de un alérgeno.',
      affected: 'consumer',
    },
    { id: 'complaints', text: 'El establecimiento recibe quejas y reclamaciones de los clientes.', affected: 'business' },
    { id: 'returns', text: 'Se producen devoluciones o es necesario retirar productos.', affected: 'business' },
    {
      id: 'waste',
      text: 'Se desperdician alimentos como consecuencia de un problema de seguridad alimentaria.',
      affected: 'business',
    },
    {
      id: 'trust',
      text: 'Un cliente pierde la confianza en el establecimiento después de sufrir un problema relacionado con un alimento.',
      affected: 'business',
    },
    { id: 'inspection', text: 'El negocio recibe una inspección o una sanción.', affected: 'business' },
    {
      id: 'sanction',
      text: 'El trabajador puede recibir una sanción laboral por incumplir los procedimientos de seguridad alimentaria.',
      affected: 'handler',
    },
    {
      id: 'worker-ill',
      text: 'El trabajador puede enfermar al entrar en contacto con alimentos contaminados durante una manipulación incorrecta.',
      affected: 'handler',
    },
  ] satisfies Consequence[],
  /** Feedback when the right button is pressed, by who is affected. */
  correct: {
    consumer:
      '¡Correcto! Cuando la consecuencia recae sobre la salud o la seguridad de quien consume el alimento, estamos ante un impacto directo en el consumidor. Enfermedades, intoxicaciones o reacciones alérgicas graves son las consecuencias más serias de una mala manipulación.',
    business:
      '¡Muy bien! Quejas, devoluciones, retirada de productos, desperdicio de alimentos, pérdidas económicas, inspecciones o sanciones afectan directamente al negocio y a su reputación.',
    handler:
      '¡Exacto! El trabajador que ignora los procedimientos puede enfrentarse a consecuencias laborales y, en casos graves, a responsabilidades administrativas, civiles o incluso penales.',
  } satisfies Record<Affected, string>,
  /** Feedback when a wrong button is pressed, by the button pressed. */
  incorrect: {
    consumer:
      'Cuidado: no todas las consecuencias graves afectan al consumidor. Si la tarjeta hablaba de sanciones, pérdidas, quejas o responsabilidades del trabajador, el afectado no es quien consume el alimento. Pregúntate de nuevo: ¿quién sufre directamente esta consecuencia?',
    business:
      'Cuidado: no todo lo que ocurre en el local afecta al negocio como tal. Si la tarjeta hablaba de enfermedades, reacciones alérgicas o responsabilidades del trabajador, el afectado no es el establecimiento. Pregúntate de nuevo: ¿quién sufre directamente esta consecuencia?',
    handler:
      'Cuidado: no todas las consecuencias recaen sobre el trabajador. Si la tarjeta hablaba de enfermedades del cliente, quejas, pérdidas económicas o sanciones al negocio, el afectado no es el manipulador. Pregúntate de nuevo: ¿quién sufre directamente esta consecuencia?',
  } satisfies Record<Affected, string>,
}

// Scene 23
export const whoIsAffectedConclusion = {
  heading: 'Recepción: conclusión de ¿A quién afecta?',
  backgroundAlt: whoIsAffected.backgroundAlt,
  davidAlt: whoIsAffected.davidAlt,
  speech: [
    'Fíjate en lo que acabas de ver: un mismo error puede acabar afectando a tres frentes a la vez. Al consumidor, porque su salud está en juego. Al establecimiento, porque pierde confianza, dinero y reputación. Y al manipulador, porque responde de sus actos.',
    'Pero hay algo más importante: casi todas esas consecuencias empiezan en un mismo punto. En las manos, la ropa o los hábitos de quien manipula. Por eso, a partir de ahora vamos a hablar de ti. Del manipulador. De cómo tu higiene personal se convierte en la primera barrera frente a la contaminación.',
    'Ven conmigo al vestuario. Allí te lo explico con calma.',
  ],
  next: 'Seguir a David',
}
