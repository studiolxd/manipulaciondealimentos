// Scenes 18 to 20 of the "Guion" sheet: activity 4 "Detectives de la cocina"
// and David's conclusion. Rules, points and feedback come from the
// "Actividades de aprendizaje" sheet.

/** A point of the kitchen picture, in its pixels (a Hotspot of the design system). */
interface KitchenSpot {
  id: string
  label: string
  x: number
  y: number
  width: number
  height: number
}

export interface KitchenRule {
  id: string
  label: string
  /** The point of the picture where this rule is broken. Also read by scripts/generate-placeholders.ts. */
  spot: KitchenSpot
  /** Shown when it is dropped on its point. */
  correct: string
}

// Scenes 18 and 19 (activity 4). The points are boxes of the kitchen picture
// (assets.ts, kitchenScene, 1600×1000): the final art must put each detail
// inside its box, or the boxes must be moved to match it.
export const kitchenDetectives = {
  heading: 'Detectives de la cocina',
  backgroundAlt: 'El mostrador de madera de la recepción, con la tablet encima.',
  title: 'Detectives de la cocina: encuentra las 8 reglas básicas',
  statement: [
    'Esta cocina tiene un problema: en diferentes puntos de la imagen se están incumpliendo cada una de las 8 reglas básicas para trabajar con seguridad alimentaria.',
    'A la izquierda tienes las 8 reglas. Arrastra cada regla hasta el punto donde creas que se está incumpliendo cada una de ellas.',
    'Fíjate bien en todos los detalles de la imagen. ¡Demuestra que sabes leer una cocina como un profesional!',
  ],
  statementLabel: 'Enunciado de la actividad',
  openStatement: 'Ver el enunciado',
  closeStatement: 'Cerrar el enunciado',
  listLabel: 'Las 8 reglas básicas',
  instructions:
    'Arrastra cada regla al punto de la imagen donde se incumple. También puedes pulsar una regla y después pulsar el punto de la imagen.',
  imageAlt:
    'Una cocina profesional en plena actividad, con un cocinero, encimeras, cámara frigorífica, fregadero, pared de cuchillos y el pase de platos.',
  rules: [
    {
      id: 'hygiene',
      label: 'Mantener una buena higiene personal',
      spot: { id: 'dirty-hands', label: 'Manos del cocinero', x: 420, y: 380, width: 160, height: 150 },
      correct:
        '¡Correcto! Las manos sucias del cocinero son el punto donde se incumple esta regla. Una higiene personal deficiente es una de las principales vías de contaminación de los alimentos.',
    },
    {
      id: 'contamination',
      label: 'Evitar la contaminación de los alimentos',
      spot: {
        id: 'cleaner-by-carrots',
        label: 'Bote de limpieza abierto junto a una caja de zanahorias',
        x: 80,
        y: 600,
        width: 220,
        height: 200,
      },
      correct:
        '¡Bien visto! El bote de limpieza abierto junto a los alimentos puede contaminarlos con sustancias químicas. Los productos químicos nunca deben estar cerca de los alimentos.',
    },
    {
      id: 'raw-apart',
      label: 'Separar los alimentos crudos de los cocinados o listos para consumir',
      spot: {
        id: 'raw-meat-by-salad',
        label: 'Bandeja de carne cruda junto a una ensalada lista para consumir',
        x: 640,
        y: 560,
        width: 270,
        height: 160,
      },
      correct: '¡Exacto! La carne cruda junto a la ensalada lista para consumir es un caso claro de contaminación cruzada.',
    },
    {
      id: 'temperature',
      label: 'Mantener los alimentos a temperaturas seguras',
      spot: { id: 'fridge-thermometer', label: 'Termómetro de la nevera', x: 1380, y: 110, width: 160, height: 160 },
      correct:
        '¡Muy bien! Un termómetro de nevera marcando 12 °C indica que los alimentos no están a la temperatura segura establecida. La cadena de frío está rota.',
    },
    {
      id: 'cleaning',
      label: 'Limpiar y desinfectar correctamente los utensilios, equipos e instalaciones',
      spot: { id: 'dirty-knives', label: 'Cuchillos colgados en la pared', x: 700, y: 80, width: 300, height: 140 },
      correct:
        '¡Correcto! Unos cuchillos sucios guardados en su sitio no solo incumplen esta regla: pueden contaminar el próximo alimento que se corte con ellos.',
    },
    {
      id: 'chemicals',
      label: 'Utilizar de forma segura los productos de limpieza',
      spot: {
        id: 'leaking-cleaner',
        label: 'Producto de limpieza bajo el fregadero',
        x: 1040,
        y: 780,
        width: 230,
        height: 190,
      },
      correct:
        '¡Bien detectado! Un producto químico mal cerrado y goteando bajo el fregadero indican un uso y almacenamiento inadecuados de los productos de limpieza.',
    },
    {
      id: 'allergens',
      label: 'Gestionar correctamente los alérgenos',
      spot: {
        id: 'egg-order',
        label: 'Comanda de una ensalada y la ensalada preparada en la mesa de trabajo',
        x: 960,
        y: 520,
        width: 270,
        height: 190,
      },
      correct:
        '¡Exacto! Una comanda que especifica "sin huevo" la ensalada exige una gestión rigurosa del alérgeno: hay que evitar cualquier contacto con el huevo para proteger al cliente.',
    },
    {
      id: 'procedures',
      label: 'Seguir los procedimientos establecidos por el establecimiento',
      spot: {
        id: 'blue-plate',
        label: 'Plato con patatas fritas en el pase y cartel de emplatado en la pared',
        x: 1300,
        y: 440,
        width: 270,
        height: 220,
      },
      correct:
        '¡Correcto! El cartel de emplatado refleja un procedimiento que el manipulador debe conocer y seguir en su trabajo diario.',
    },
  ] satisfies KitchenRule[],
  taken:
    'Ese punto caliente ya está relacionado con otra regla. Fíjate de nuevo en los detalles de la imagen y busca el lugar exacto donde se incumple esta regla.',
  wrong:
    'Casi. Este punto caliente no se corresponde con esta regla. Vuelve a leer la regla y observa con atención qué está ocurriendo en la cocina.',
  feedbackContinue: 'Continuar',
  next: 'Continuar',
}

// Scene 20
export const detectivesConclusion = {
  heading: 'Recepción: conclusión de detectives de la cocina',
  backgroundAlt:
    'La recepción del restaurante: un pequeño recibidor con una tablet encima, en una esquina del salón comedor. David está de pie frente a ti.',
  davidAlt: 'David, de pie frente a ti.',
  speech: [
    'Esas 8 reglas resumen todo lo que un manipulador de alimentos debe hacer para garantizar la seguridad de lo que sirve. Y no son normas aisladas: cada una responde a un peligro real que puede afectar a la salud del consumidor.',
    'Pero hay una novena regla que lo cierra todo: comunicar cualquier problema que pueda afectar a la seguridad alimentaria. De nada sirve conocer las reglas si, cuando algo falla, no se avisa.',
    'Trabajar con seguridad alimentaria es aplicar estas reglas de forma constante y consciente, y comunicar siempre cualquier incidencia. Porque cuando algo sale mal, no solo afecta al cliente que se sienta a la mesa. También nos afecta a nosotros, y al restaurante. Y de eso va lo siguiente.',
  ],
  next: '¡Genial!',
}
