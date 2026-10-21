import type { AssetId } from '../engine/assets'

// Activity 2 "¿Quién es manipulador de alimentos?" (scenes 4, 5 and 6 of the
// "Guion" sheet). Cards and feedback come from the "Actividades de
// aprendizaje" sheet.

export interface PersonCard {
  id: string
  name: string
  job: string
  description: string
  portrait: AssetId
  isFoodHandler: boolean
  /** Feedback without the "¡Correcto!/¡Incorrecto!" prefix. */
  explanation: string
}

export const whoIsFoodHandler = {
  heading: '¿Quién es manipulador de alimentos?',
  backgroundAlt: 'La mesa del comedor vista desde arriba.',
  title: '¿Quién es manipulador de alimentos?',
  statement: [
    'No todos los manipuladores de alimentos son cocineros. En esta actividad vas a conocer a distintas personas y sus puestos de trabajo. Lee con atención su carnet: su nombre, su oficio y lo que hace en su día a día. Tu misión es decidir si su trabajo implica manipular alimentos:',
    '👉 Desliza la tarjeta a la derecha si crees que SÍ es manipulador de alimentos.\n👈 Desliza la tarjeta a la izquierda si crees que NO lo es.\n¡Adelante, detective!',
  ],
  statementLabel: 'Enunciado de la actividad',
  openStatement: 'Ver el enunciado',
  closeStatement: 'Cerrar el enunciado',
  cardRoleDescription: 'Carnet',
  keyboardHint:
    'Pulsa la flecha derecha si crees que SÍ es manipulador de alimentos, o la flecha izquierda si crees que NO lo es.',
  yes: 'SÍ',
  no: 'NO',
  progress: (current: number, total: number) => `Tarjeta ${current} de ${total}`,
  correct: '¡Correcto!',
  incorrect: '¡Incorrecto!',
  next: 'Continuar',
  cards: [
    {
      id: 'oscar',
      name: 'Óscar Fernández',
      job: 'Cocinero del restaurante El Caserío',
      description: 'Me encargo de preparar los platos de la carta para que los clientes queden satisfechos.',
      portrait: 'cardOscar',
      isFoodHandler: true,
      explanation:
        'Óscar es manipulador de alimentos porque, como cocinero, está en contacto directo con los alimentos durante su preparación.',
    },
    {
      id: 'laura',
      name: 'Laura Martín',
      job: 'Camarera de la cafetería La plaza',
      description: 'Sirvo los platos y las bebidas. Además atiendo a los clientes en la sala.',
      portrait: 'cardLaura',
      isFoodHandler: true,
      explanation:
        'Laura es manipuladora de alimentos porque, como camarera, tiene contacto con los alimentos durante el servicio de los mismos.',
    },
    {
      id: 'pablo',
      name: 'Pablo Sánchez',
      job: 'Personal de cafetería',
      description: 'Preparo cafés, bebidas y otros productos que se sirven a los clientes.',
      portrait: 'cardPablo',
      isFoodHandler: true,
      explanation:
        'Pablo es manipulador de alimentos porque, como personal de cafetería, prepara y sirve cafés, bebidas y otros productos que van destinados directamente al consumo de los clientes.',
    },
    {
      id: 'marta',
      name: 'Marta López',
      job: 'Transportista de la frutería Hermanos López',
      description: 'Reparto la mercancía a los restaurantes de la zona.',
      portrait: 'cardMarta',
      isFoodHandler: true,
      explanation:
        'Marta es manipuladora de alimentos porque, como transportista de una frutería, traslada mercancías alimentarias y debe garantizar que se mantengan en condiciones adecuadas hasta su entrega a los restaurantes.',
    },
    {
      id: 'miguel',
      name: 'Miguel Rodríguez',
      job: 'Repartidor de la pizzería Primavera',
      description: 'Llevo en moto los pedidos a domicilio.',
      portrait: 'cardMiguel',
      isFoodHandler: true,
      explanation:
        'Miguel es manipulador de alimentos porque, como repartidor de una pizzería, transporta los pedidos de comida hasta el domicilio de los clientes, velando por que lleguen en buen estado.',
    },
    {
      id: 'javier',
      name: 'Javier Ruiz',
      job: 'Mozo de almacén de Supermercados Luna',
      description:
        'Recibo las mercancías, compruebo los productos y los coloco en las zonas de almacenamiento correspondientes.',
      portrait: 'cardJavier',
      isFoodHandler: true,
      explanation:
        'Javier es manipulador de alimentos porque, como mozo de almacén de un supermercado, recibe, comprueba y coloca productos alimentarios en las zonas de almacenamiento correspondientes.',
    },
    {
      id: 'ana',
      name: 'Ana García',
      job: 'Dependienta de la carnicería Loli',
      description: 'Atiendo a los clientes, preparo y entrego los productos cárnicos que solicitan.',
      portrait: 'cardAna',
      isFoodHandler: true,
      explanation:
        'Ana es manipuladora de alimentos porque, como dependienta de una carnicería, prepara y entrega directamente a los clientes los productos cárnicos que solicitan.',
    },
    {
      id: 'sonia',
      name: 'Sonia Moreno',
      job: 'Operaria de envasado',
      description: 'Empaqueto y etiqueto comida preparada en envases herméticos.',
      portrait: 'cardSonia',
      isFoodHandler: true,
      explanation:
        'Sonia es manipuladora de alimentos porque, como operaria de envasado, empaqueta y etiqueta comida preparada en envases herméticos, estando en contacto directo con los alimentos.',
    },
    {
      id: 'carmen',
      name: 'Carmen Díaz',
      job: 'Personal de limpieza',
      description: 'Me encargo de mantener limpias las oficinas y las zonas comunes del edificio.',
      portrait: 'cardCarmen',
      isFoodHandler: false,
      explanation:
        'Carmen no es manipuladora de alimentos porque realiza tareas de limpieza en oficinas y zonas comunes que no están relacionadas con la manipulación de alimentos ni con superficies destinadas a ellos.',
    },
    {
      id: 'sergio',
      name: 'Sergio Navarro',
      job: 'Comercial de Homesec',
      description:
        'Visito establecimientos para presentar nuestros productos y explicar sus características a los clientes.',
      portrait: 'cardSergio',
      isFoodHandler: false,
      explanation:
        'Sergio no es manipulador de alimentos porque sus funciones se limitan a presentar productos de un sector que no interviene en ninguna tarea relacionada con los alimentos.',
    },
    {
      id: 'elena',
      name: 'Elena Torres',
      job: 'Recepcionista de hotel Gold',
      description: 'Recibo a los clientes, gestiono sus entradas y salidas y atiendo sus consultas.',
      portrait: 'cardElena',
      isFoodHandler: false,
      explanation:
        'Elena no es manipuladora de alimentos porque sus funciones se limitan a la recepción y atención de clientes y no interviene en ninguna tarea relacionada con los alimentos.',
    },
  ] satisfies PersonCard[],
}

// Scene 6
export const whoIsFoodHandlerConclusion = {
  heading: '¿Quién es manipulador de alimentos? Conclusión',
  backgroundAlt: 'Mesa para dos en el salón comedor. David está sentado al otro lado de la mesa, frente a ti.',
  davidAlt: 'David, sentado frente a ti.',
  speech: [
    'Como has podido comprobar, no solo son manipuladores quienes cocinan. También lo son quienes reciben mercancías, las almacenan, preparan ingredientes, envasan alimentos, transportan pedidos, sirven platos o bebidas... e incluso quienes limpian utensilios y superficies que estarán en contacto con la comida.',
    'La manipulación puede darse en cualquier etapa de la cadena alimentaria. Y todos compartimos el mismo objetivo: que los alimentos lleguen al consumidor en buenas condiciones y sin suponer un peligro para su salud.',
    'Ahora que sabes quién manipula alimentos, toca ver qué pasa cuando algo se hace mal. En este restaurante tenemos cámaras de seguridad. Vamos a revisarlas. ¿Te atreves?',
  ],
  next: '¡Vamos!',
}
