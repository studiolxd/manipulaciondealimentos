import type { GenderedText } from '@studiolxd/tramoya'

// Scenes 7 to 17 of the "Guion" sheet: the reception, activity 3 "Cámaras de
// seguridad" and David's conclusion. Videos, questions and feedback come from
// the "Actividades de aprendizaje" sheet.

// Scene 7
export const camerasIntro = {
  heading: 'Recepción: el sistema de videovigilancia',
  backgroundAlt:
    'La recepción del restaurante: un pequeño recibidor con una tablet encima, en una esquina del salón comedor. David está de pie frente a ti.',
  davidAlt: 'David, de pie frente a ti.',
  speech: [
    'Aquí es donde empieza tu trabajo de verdad. Esta tablet es el centro de control del restaurante: desde ella se gestionan las cámaras de todas las zonas, y también las incidencias del día a día.',
    'Me gustaría que vieras lo que han grabado nuestras cámaras. A veces, lo que parece normal en una cocina no lo es tanto...\nEnciéndela y échale un vistazo.',
  ],
  next: '¡Comencemos!',
}

export interface CameraQuestion {
  question: string
  /** The right answer first; they are shuffled on screen, except Sí / No. */
  answers: string[]
  shuffle: boolean
  /** Which kind of question it is, for its feedback. */
  kind: 'risk' | 'why' | 'consequence'
}

export interface CameraVideo {
  id: string
  /** What the video shows: its description for screen readers and the placeholder. */
  description: string
  questions: CameraQuestion[]
}

const risk = (isRisk: boolean): CameraQuestion => ({
  question: '¿Supone un riesgo para la seguridad alimentaria?',
  answers: isRisk ? ['Sí', 'No'] : ['No', 'Sí'],
  shuffle: false,
  kind: 'risk',
})

// Scenes 8 to 16 (activity 3)
export const securityCameras = {
  heading: 'Cámaras de seguridad: del manipulador al consumidor',
  backgroundAlt: 'El mostrador de madera de la recepción visto desde arriba, con la tablet encima.',
  title: 'Cámaras de seguridad: del manipulador al consumidor',
  statement: [
    (g) =>
      `${g('Bienvenido', 'Bienvenida', 'Te damos la bienvenida')} al sistema de videovigilancia del restaurante. Observa las grabaciones de la cámara de seguridad.`,
    'Tu misión es decidir si lo que ves supone un riesgo para la seguridad alimentaria y averiguar por qué es importante la actuación del manipulador de alimentos. En algunos casos, tendrás que ir más allá y detectar qué consecuencias podría tener cada situación para el consumidor.',
    'Analiza cada escena como si fueras el responsable de seguridad alimentaria del local. ¡Adelante!',
  ] satisfies GenderedText[],
  statementLabel: 'Enunciado de la actividad',
  openStatement: 'Ver el enunciado',
  closeStatement: 'Cerrar el enunciado',
  galleryLabel: 'Grabaciones de las cámaras',
  camera: (n: number) => `Cámara ${n}`,
  cameraDone: 'revisada',
  replay: 'Ver de nuevo',
  toQuestions: 'Siguiente',
  check: 'Comprobar',
  nextQuestion: 'Siguiente',
  tryAgain: 'Volver a intentarlo',
  backToCameras: 'Volver a las cámaras',
  videos: [
    {
      id: 'video-1',
      description: 'En la cocina, un cocinero coge tomates para cortarlos y preparar una ensalada, pero no se ha lavado las manos previamente.',
      questions: [
        risk(true),
        {
          question: '¿Por qué es importante que el manipulador se lave las manos antes de manipular los alimentos?',
          answers: [
            'Porque puede transferir microorganismos al alimento.',
            'Porque los alimentos tendrán mejor aspecto.',
            'Porque terminará antes la preparación.',
            'Porque evitará que el alimento se enfríe.',
          ],
          shuffle: true,
          kind: 'why',
        },
      ],
    },
    {
      id: 'video-2',
      description: 'Una cocinera corta pollo crudo y utiliza una tabla y un cuchillo limpios, específicos para ese uso.',
      questions: [risk(false)],
    },
    {
      id: 'video-3',
      description: 'Un ayudante de cocina utiliza un cuchillo y una tabla que tienen restos de comida seca de usos anteriores para trocear verduras.',
      questions: [
        risk(true),
        {
          question: '¿Por qué es importante utilizar utensilios limpios durante la preparación de los alimentos?',
          answers: [
            'Porque los restos y microorganismos de usos anteriores pueden pasar al alimento.',
            'Porque es suficiente retirar los restos de comida antes de utilizar de nuevo los utensilios.',
            'Porque los utensilios deben limpiarse al terminar el servicio, aunque se utilicen con distintos alimentos durante la preparación.',
            'Porque basta con utilizar utensilios diferentes para cada alimento, aunque no se hayan limpiado previamente.',
          ],
          shuffle: true,
          kind: 'why',
        },
      ],
    },
    {
      id: 'video-4',
      description: 'Un trabajador saca un recipiente con mayonesa casera de la nevera y lo deja encima de la encimera durante horas, a temperatura ambiente, mientras prepara otras tareas.',
      questions: [
        risk(true),
        {
          question: '¿Por qué es importante mantener los alimentos perecederos a temperatura segura?',
          answers: [
            'Porque a temperatura ambiente los microorganismos pueden multiplicarse rápidamente en el alimento.',
            'Porque es suficiente mantener el alimento refrigerado hasta el momento de empezar a prepararlo.',
            'Porque mantener el alimento tapado permite dejarlo fuera de la nevera mientras se realizan otras tareas.',
            'Porque la temperatura solo necesita controlarse cuando el alimento va a conservarse hasta el día siguiente.',
          ],
          shuffle: true,
          kind: 'why',
        },
        {
          question: '¿Qué consecuencia podría tener esta situación para el consumidor?',
          answers: [
            'Que el alimento pueda contener microorganismos capaces de causar una enfermedad alimentaria.',
            'Que el alimento se deteriore antes, pero sin que ello suponga necesariamente un riesgo para el consumidor.',
            'Que el alimento conserve sus condiciones de seguridad siempre que se refrigere antes de servirlo.',
            'Que el alimento solo represente un riesgo si presenta cambios visibles en su aspecto u olor.',
          ],
          shuffle: true,
          kind: 'consequence',
        },
      ],
    },
    {
      id: 'video-5',
      description: 'En la cámara frigorífica, un cocinero comprueba con un termómetro que los lácteos y las carnes están a la temperatura establecida y anota el registro.',
      questions: [risk(false)],
    },
    {
      id: 'video-6',
      description: 'Un manipulador coloca pechugas de pollo crudas en la misma bandeja donde hay lechuga ya lavada y lista para servir.',
      questions: [
        risk(true),
        {
          question: '¿Por qué es importante separar los alimentos crudos de los listos para consumir?',
          answers: [
            'Porque los microorganismos del pollo crudo pueden pasar a la lechuga.',
            'Porque los alimentos crudos deben mantenerse separados únicamente durante su almacenamiento en la cámara frigorífica.',
            'Porque utilizar una bandeja para cada alimento es suficiente, aunque después se coloquen una junto a otra y entren en contacto.',
            'Porque los alimentos listos para consumir solo necesitan separarse de los crudos cuando van a servirse sin lavar.',
          ],
          shuffle: true,
          kind: 'why',
        },
        {
          question: '¿Qué consecuencia podría tener esta situación para el consumidor?',
          answers: [
            'Que la lechuga se contamine y transmita microorganismos al consumidor al ingerirla.',
            'Que el pollo necesite cocinarse durante más tiempo para compensar el contacto con la lechuga.',
            'Que la lechuga pierda frescura durante su conservación, aunque no se vea afectada su seguridad alimentaria.',
            'Que sea suficiente retirar las hojas que han estado en contacto directo con el pollo para eliminar el riesgo.',
          ],
          shuffle: true,
          kind: 'consequence',
        },
      ],
    },
    {
      id: 'video-7',
      description: 'En la zona de preparación, un cocinero tiene la carne cruda en una bandeja y, en otra separada, los vegetales listos para consumir.',
      questions: [risk(false)],
    },
    {
      id: 'video-8',
      description: 'Un trabajador consulta la ficha de procedimiento del local, se coloca el gorro y unos guantes limpios y sigue los pasos indicados para manipular un alimento.',
      questions: [risk(false)],
    },
  ] satisfies CameraVideo[],
  feedback: {
    risk: {
      correct: '¡Correcto! Has identificado bien si la situación supone o no un riesgo para la seguridad alimentaria.',
      incorrect:
        'Revisa la escena con calma. ¿La actuación del manipulador puede contaminar el alimento? ¿O se trata de una práctica segura? Recuerda: los riesgos no siempre se ven a simple vista.',
    },
    why: {
      correct: '¡Exacto! Has entendido por qué la actuación del manipulador afecta directamente a la seguridad del alimento.',
      incorrect:
        'Vuelve a pensarlo: la actuación del manipulador no es una formalidad, tiene un efecto real sobre el alimento. ¿Qué puede pasarle al alimento si esa actuación es incorrecta?',
    },
    consequence: {
      correct:
        '¡Perfecto! Has llegado hasta el final de la cadena: la actuación del manipulador puede acabar afectando a la salud del consumidor.',
      incorrect:
        'Recuerda la cadena completa: actuación incorrecta del manipulador → contaminación del alimento → riesgo para el consumidor. ¿Cuál de las opciones refleja ese efecto real sobre la salud?',
    },
  },
}

// Scene 17
export const camerasConclusion = {
  heading: 'Recepción: conclusión de las cámaras de seguridad',
  backgroundAlt: camerasIntro.backgroundAlt,
  davidAlt: camerasIntro.davidAlt,
  speech: [
    'Cada vez que un cliente se sienta a la mesa, confía en que lo que va a comer se ha preparado y servido de forma segura. Y esa confianza depende, en gran parte, de las decisiones que tomamos quienes trabajamos aquí.',
    'Hay peligros que no se ven y que comprometen la seguridad alimentaria. Trabajar de forma segura no es solo cumplir normas. Es asumir que cada actuación nuestra tiene un efecto directo sobre la salud de quien nos pone su confianza.',
    (g) =>
      `Y hablando de mirar... ahora te toca a ti demostrar que sabes leer una cocina como un profesional. ${g('¿Preparado?', '¿Preparada?', '¿Empezamos?')}`,
  ] satisfies GenderedText[],
  next: '¡Siempre!',
}
