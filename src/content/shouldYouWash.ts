import type { AssetId } from './assets'

// Scenes 38 to 40 of the "Guion" sheet: activity 10 "¿Te lavarías las manos?"
// and David's conclusion. Situations and feedback come from the "Actividades de
// aprendizaje" sheet.

const backgroundAlt =
  'El fregadero de la cocina profesional visto desde delante, con el grifo y el dosificador de jabón.'

export interface WashSituation {
  id: string
  text: string
  /** Whether the hands must be washed. */
  wash: boolean
  pictogram: AssetId
  /** Feedback without the "¡Correcto!/¡Incorrecto!" prefix. */
  explanation: string
}

// Scenes 38 and 39 (activity 10)
export const shouldYouWash = {
  heading: '¿Te lavarías las manos?',
  backgroundAlt,
  title: '¿Te lavarías las manos?',
  statement: [
    'Durante tu jornada, tus manos tocan decenas de cosas, y no todas ellas son igual de seguras.',
    'En pantalla irán apareciendo situaciones reales de trabajo. En cada una, decide si es necesario lavarse las manos antes de continuar.',
    'Cada situación es independiente: no te dejes llevar por lo que hayas respondido antes. ¡Demuestra que sabes cuándo toca lavarse las manos!',
  ],
  statementLabel: 'Enunciado de la actividad',
  openStatement: 'Ver el enunciado',
  closeStatement: 'Cerrar el enunciado',
  cardLabel: 'Situación',
  yes: 'Sí',
  no: 'No',
  yesButton: 'Sí, hay que lavarse las manos',
  noButton: 'No, no hace falta lavarse las manos',
  progress: (current: number, total: number) => `Situación ${current} de ${total}`,
  /** Question recorded with each answer (xAPI). */
  question: (situation: WashSituation) => `${situation.text} ¿Hay que lavarse las manos?`,
  correct: '¡Correcto!',
  incorrect: '¡Incorrecto!',
  next: 'Siguiente',
  finish: 'Terminar',
  situations: [
    {
      id: 'cash',
      text: 'Acabas de cobrar con dinero en efectivo.',
      wash: true,
      pictogram: 'washSituation1',
      explanation:
        'El dinero pasa por muchas manos y es una fuente de contaminación. Después de tocarlo, hay que lavarse las manos antes de manipular alimentos.',
    },
    {
      id: 'clean-board',
      text: 'Tus manos están limpias y vas a cortar verduras en una tabla limpia.',
      wash: false,
      pictogram: 'washSituation2',
      explanation:
        'No ha habido contacto con ninguna fuente de contaminación y la tabla está limpia. No es necesario un nuevo lavado por ese motivo.',
    },
    {
      id: 'hair',
      text: 'Acabas de tocarte el pelo.',
      wash: true,
      pictogram: 'washSituation3',
      explanation:
        'El pelo puede acumular grasa, polvo y microorganismos. Después de tocarlo, hay que lavarse las manos antes de seguir manipulando alimentos.',
    },
    {
      id: 'label',
      text: 'Acabas de etiquetar un envase con la fecha.',
      wash: false,
      pictogram: 'washSituation4',
      explanation:
        'Etiquetar un envase no implica contacto con fuentes de contaminación. No es necesario lavarse las manos por ese motivo.',
    },
    {
      id: 'phone',
      text: 'Acabas de usar el teléfono móvil.',
      wash: true,
      pictogram: 'washSituation5',
      explanation:
        'El móvil es uno de los objetos que más microorganismos acumula y rara vez se limpia. Tras usarlo, hay que lavarse las manos.',
    },
    {
      id: 'serve',
      text: 'Vas a servir un plato ya terminado.',
      wash: false,
      pictogram: 'washSituation6',
      explanation:
        'Si las manos están limpias y no han tocado nada contaminante, no es necesario un nuevo lavado para servir un plato terminado.',
    },
    {
      id: 'nose',
      text: 'Acabas de sonarte la nariz.',
      wash: true,
      pictogram: 'washSituation7',
      explanation:
        'Sonarse la nariz contamina las manos con secreciones y microorganismos. Es obligatorio lavarse las manos inmediatamente después.',
    },
    {
      id: 'cutlery',
      text: 'Acabas de colocar los cubiertos limpios y secos y ahora tocan los platos.',
      wash: false,
      pictogram: 'washSituation8',
      explanation:
        'Los platos ya están limpios y secos, y la tarea no implica contacto con fuentes de contaminación. No hace falta un nuevo lavado.',
    },
    {
      id: 'mop',
      text: 'Acabas de fregar el suelo con la fregona.',
      wash: true,
      pictogram: 'washSituation9',
      explanation:
        'La fregona, el agua sucia y el suelo son fuentes claras de contaminación. Después de fregar, hay que lavarse las manos antes de tocar alimentos.',
    },
    {
      id: 'floor',
      text: 'Acabas de recoger algo del suelo.',
      wash: true,
      pictogram: 'washSituation10',
      explanation:
        'El suelo es una de las superficies más contaminadas. Después de recoger algo del suelo, hay que lavarse las manos.',
    },
    {
      id: 'napkins',
      text: 'Tus manos están limpias y vas a doblar unas servilletas.',
      wash: false,
      pictogram: 'washSituation11',
      explanation:
        'Doblar servilletas limpias no implica contacto con fuentes de contaminación. No es necesario lavarse las manos por ese motivo.',
    },
    {
      id: 'chemical',
      text: 'Acabas de limpiar la encimera con un producto químico.',
      wash: true,
      pictogram: 'washSituation12',
      explanation:
        'Los productos químicos de limpieza pueden dejar residuos en las manos y contaminar los alimentos. Hay que lavarse las manos después de usarlos.',
    },
    {
      id: 'plate-vegetables',
      text: 'Vas a emplatar unas verduras ya lavadas.',
      wash: false,
      pictogram: 'washSituation13',
      explanation:
        'Si las manos están limpias y las verduras ya han sido lavadas, no es necesario un nuevo lavado para emplatarlas.',
    },
    {
      id: 'raw-chicken',
      text: 'Has terminado de preparar el pollo y tienes que cortar verdura.',
      wash: true,
      pictogram: 'washSituation14',
      explanation:
        'El pollo crudo es una fuente importante de contaminación. Al cambiar de tarea, hay que lavarse las manos para evitar contaminar la verdura.',
    },
  ] satisfies WashSituation[],
}

// Scene 40
export const shouldYouWashConclusion = {
  heading: 'Cocina: conclusión de ¿Te lavarías las manos?',
  backgroundAlt,
  davidAlt: 'David, de pie junto al fregadero.',
  speech: [
    'Las manos son una de las herramientas que más usamos durante la jornada y también una de las principales vías por las que los microorganismos llegan a los alimentos. Aunque parezcan limpias, pueden haber tocado alimentos crudos, superficies, residuos, dinero o el móvil.',
    'Por eso deben lavarse siempre que puedan haberse contaminado. Tantas veces como sea necesario para no contaminar los alimentos.',
    'Pero hay más. Las manos no son la única vía: cualquier herida, corte o lesión en la piel también puede contaminar lo que tocas. Ven, que te enseño algo que todo manipulador debe tener claro.',
  ],
  next: 'Seguir a David',
}
