import type { NotebookBlock } from '../design-system'

// Scenes 48 to 51 of the "Guion" sheet: activity 13 (David explains what
// contamination is) and activity 14 (the notebook with the three types).

const backgroundAlt =
  'Una zona de la cocina: una encimera pequeña con cajones y, colgado en la pared sobre ella, el botiquín, cerrado.'

// Scene 48 (activity 13)
export const contaminationIntro = {
  heading: 'Cocina: la contaminación de los alimentos',
  backgroundAlt,
  davidAlt: 'David, de pie junto a la encimera.',
  speech: [
    'Ya sabes protegerte a ti. Ahora toca entender al enemigo. Escucha con atención: la contaminación puede producirse en cualquier momento de la cadena alimentaria.',
    'Un alimento se contamina cuando entra en contacto con microorganismos, sustancias u objetos que pueden hacerlo inseguro para el consumo.',
    'Un alimento contaminado puede provocar enfermedades o daños en la salud de las personas que lo consumen. También puede ocasionar la retirada de productos, pérdidas económicas y daños a la reputación del establecimiento.',
    'Es importante recordar que la contaminación no siempre puede detectarse a simple vista. Un alimento puede tener un aspecto, un olor y un sabor normales y, aun así, contener algún peligro.',
    'Por este motivo, no debemos confiar únicamente en nuestros sentidos para decidir si un alimento es seguro. La prevención depende de aplicar correctamente las normas de higiene y manipulación durante todas las tareas.',
    'Y para que no se te olvide nada de lo que estás aprendiendo, tengo algo para ti. Toma, esta es tu libreta de apuntes. Aquí irás anotando lo más importante. Ábrela y échale un vistazo.',
  ],
  next: 'Abrir la libreta',
}

// Scenes 49 and 50 (activity 14)
export const notebook = {
  heading: 'Libreta de apuntes: los tipos de contaminación',
  backgroundAlt: 'Una libreta de cuadritos abierta en primer plano sobre la cocina, oscurecida.',
  label: 'Libreta de apuntes',
  /** The arrow and the cross appear after this long, so the pages are read first. */
  readMs: 5000,
  nextPage: 'Pasar de página',
  close: 'Cerrar la libreta',
  // Scene 49: the left page is blank.
  page1: {
    right: [
      {
        kind: 'text',
        text: 'Los alimentos pueden contaminarse de diferentes formas. Según el peligro que llegue hasta ellos, distinguimos tres tipos principales de contaminación:',
      },
      { kind: 'title', text: 'Contaminación biológica' },
      {
        kind: 'text',
        text: 'Se produce cuando un alimento contiene microorganismos o parásitos capaces de causar enfermedades.',
      },
      {
        kind: 'text',
        text: 'Los microorganismos pueden estar presentes de forma natural en algunos alimentos crudos o llegar hasta ellos a través de:',
      },
      {
        kind: 'list',
        items: [
          'Las manos y el cuerpo del manipulador.',
          'Otros alimentos contaminados.',
          'Utensilios, equipos o superficies sucias.',
          'Insectos y roedores.',
          'Basura, agua sucia, polvo o suciedad ambiental.',
        ],
      },
      {
        kind: 'text',
        text: 'Además, pueden multiplicarse si los alimentos se conservan durante demasiado tiempo a temperaturas inadecuadas.',
      },
      {
        kind: 'text',
        text: 'La contaminación biológica es una de las más frecuentes. Para prevenirla es fundamental mantener una buena higiene, controlar correctamente el tiempo y la temperatura, cocinar adecuadamente y evitar que los alimentos contaminados entren en contacto con otros.',
      },
    ] satisfies NotebookBlock[],
  },
  // Scene 50
  page2: {
    left: [
      { kind: 'title', text: 'Contaminación física' },
      {
        kind: 'text',
        text: 'Se produce cuando aparece en el alimento un objeto o elemento que no debería estar presente.',
      },
      { kind: 'text', text: 'Algunos ejemplos son:' },
      {
        kind: 'list',
        items: [
          'Cabellos.',
          'Trozos de vidrio.',
          'Fragmentos de plástico o metal.',
          'Grapas, envoltorios o partes de envases.',
          'Piedras, astillas o restos de insectos.',
          'Joyas u otros objetos personales.',
        ],
      },
      {
        kind: 'text',
        text: 'Estos elementos pueden causar cortes, atragantamientos, daños en la boca u otras lesiones.',
      },
      {
        kind: 'text',
        text: 'Para prevenir este tipo de contaminación, deben revisarse los alimentos, mantener en buen estado las instalaciones y los equipos, proteger correctamente las elaboraciones y evitar objetos que puedan desprenderse durante el trabajo.',
      },
    ] satisfies NotebookBlock[],
    right: [
      { kind: 'title', text: 'Contaminación química' },
      {
        kind: 'text',
        text: 'Se produce cuando un alimento entra en contacto con una sustancia química que puede resultar perjudicial para la salud.',
      },
      { kind: 'text', text: 'En los establecimientos alimentarios puede deberse, entre otras causas, a:' },
      {
        kind: 'list',
        items: [
          'Detergentes y desinfectantes.',
          'Productos para el control de plagas.',
          'Lubricantes o productos de mantenimiento.',
          'Uso incorrecto de aditivos.',
          'Sustancias químicas trasladadas a envases de alimentos.',
          'Restos de productos utilizados durante la limpieza.',
        ],
      },
      {
        kind: 'text',
        text: 'Para prevenirla, los productos químicos deben mantenerse identificados, en sus envases originales y separados de los alimentos. También deben utilizarse siguiendo las instrucciones del fabricante y los procedimientos establecidos.',
      },
    ] satisfies NotebookBlock[],
  },
}

// Scene 51
export const notebookConclusion = {
  heading: 'Cocina: conclusión de la libreta',
  backgroundAlt,
  davidAlt: 'David, de pie junto a la encimera.',
  speech: [
    'Los tres tipos de contaminación pueden aparecer en cualquier fase de la manipulación. Por eso, es necesario prestar atención desde la recepción de las materias primas hasta el almacenamiento, la preparación y el servicio.',
    'Y ahí es donde vas a demostrar lo que has aprendido: en esta jornada hay varios clientes en la barra con quejas sobre sus platos. Algo ha ido mal en la cocina y quiero que descubras qué tipo de contaminación ha afectado a cada alimento. Ponte tras la barra, escucha a los clientes y saca conclusiones.',
  ],
  next: '¡Vamos allá!',
}
