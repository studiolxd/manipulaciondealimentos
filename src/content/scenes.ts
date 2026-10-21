import type { Gender, GenderedText } from '@studiolxd/tramoya'

// Texts for each scene, taken from the "Guion" sheet of
// docs/Manipulador de alimentos.xlsx. Headings and image descriptions are only
// read by screen readers.

// Title screen, on every load.
export const welcome = {
  heading: 'Manipulación de alimentos',
  start: 'Comenzar',
  resume: 'Continuar',
}

// Before the script, only outside an LMS (inside one the name comes from it).
export const nameForm = {
  heading: '¿Cómo te llamas?',
  label: 'Tu nombre',
  missingName: 'Escribe tu nombre para continuar.',
  next: 'Continuar',
}

// Before the script: how the player wants to be addressed.
export const addressForm = {
  heading: (name: string | null) =>
    name ? `¡Hola, ${name}! ¿Cómo quieres que nos dirijamos a ti?` : '¿Cómo quieres que nos dirijamos a ti?',
  legend: 'Forma de tratamiento',
  options: [
    { gender: 'male', label: 'Masculino' },
    { gender: 'female', label: 'Femenino' },
    { gender: 'neutral', label: 'Neutro' },
  ] satisfies { gender: Gender; label: string }[],
  missingChoice: 'Elige una opción para continuar.',
  start: 'Empezar',
}

// Scene 1
export const facade = {
  heading: 'Fachada del restaurante',
  backgroundAlt: 'Fachada de un restaurante a pie de calle, con la puerta de entrada en el centro, ventanales a los lados, un toldo y el rótulo del restaurante.',
  narration:
    'Hoy será tu primer día en hostelería. Debes entrar y buscar a David, el encargado. Él te ayudará y te enseñará todo lo que necesitas. ¡Buena suerte!',
  enter: 'Entrar al restaurante',
}

// Scene 2
export const diningRoom = {
  heading: 'Salón comedor: bienvenida de David',
  backgroundAlt:
    'Salón comedor del restaurante, aún cerrado y vacío. Al fondo están las puertas de la cocina, el pasaplatos, el vestuario, los aseos y el almacén. A la derecha, la barra de bebidas.',
  davidAlt: 'David, el encargado.',
  speech: [
    (g) =>
      `¡Hola! Soy David, el encargado. Tú debes ser el nuevo fichaje... ¡te estábamos esperando! ${g('Bienvenido al equipo', 'Bienvenida al equipo', 'Te damos la bienvenida al equipo')}. A partir de ahora yo seré quien te enseñe todo lo que necesitas para trabajar aquí. Durante tu formación recorrerás las distintas zonas del restaurante y pondrás en práctica todo lo que vayas aprendiendo. ¡Vamos a ponernos cómodos!`,
  ] satisfies GenderedText[],
  next: '¡Vamos!',
}

// Scene 3 (activity 1)
export const handlerDefinition = {
  heading: '¿Qué es un manipulador de alimentos?',
  backgroundAlt: 'Mesa para dos en el salón comedor. David está sentado al otro lado de la mesa, frente a ti.',
  davidAlt: 'David, sentado frente a ti.',
  speech: [
    (g) =>
      `Antes de empezar a moverte por el restaurante, hay algo que debes tener claro: qué significa ser manipulador de alimentos. ${g('Tranquilo', 'Tranquila', 'No te preocupes')}, es más sencillo de lo que parece:`,
    'Un manipulador de alimentos es cualquier persona que, por su trabajo, entra en contacto con alimentos o realiza tareas que pueden influir en su seguridad.',
    (g) =>
      `Fíjate en la última parte: "cualquier persona que... realiza tareas que pueden influir en su seguridad". Eso incluye a mucha más gente de la que parece. De hecho, ahora mismo voy a ponerte a prueba con algunos ejemplos. ${g('¿Preparado?', '¿Preparada?', '¿Empezamos?')}`,
  ] satisfies GenderedText[],
  next: '¡A por ello!',
}

// Temporary end of the playable script.
export const comingSoon = {
  heading: 'Continuará',
  message: 'La actividad «Cámaras de seguridad: del manipulador al consumidor» está en desarrollo.',
}
