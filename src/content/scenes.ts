import type { Gender, GenderedText } from './gendered'

// Texts for each scene, taken from the "Guion" sheet of
// docs/Manipulador de alimentos.xlsx. Headings and image descriptions are only
// read by screen readers.

export const avatarSelect = {
  heading: 'Elige tu personaje',
  legend: 'Personaje',
  options: [
    { gender: 'male', label: 'Chico' },
    { gender: 'female', label: 'Chica' },
  ] satisfies { gender: Gender; label: string }[],
  missingChoice: 'Elige un personaje para continuar.',
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
      `¡Hola! Soy David, el encargado. Tú debes ser el nuevo fichaje... ¡te estábamos esperando! ${g('Bienvenido', 'Bienvenida')} al equipo. A partir de ahora yo seré quien te enseñe todo lo que necesitas para trabajar aquí. Durante tu formación recorrerás las distintas zonas del restaurante y pondrás en práctica todo lo que vayas aprendiendo. ¡Vamos a ponernos cómodos!`,
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
      `Antes de empezar a moverte por el restaurante, hay algo que debes tener claro: qué significa ser manipulador de alimentos. ${g('Tranquilo', 'Tranquila')}, es más sencillo de lo que parece:`,
    'Un manipulador de alimentos es cualquier persona que, por su trabajo, entra en contacto con alimentos o realiza tareas que pueden influir en su seguridad.',
    (g) =>
      `Fíjate en la última parte: "cualquier persona que... realiza tareas que pueden influir en su seguridad". Eso incluye a mucha más gente de la que parece. De hecho, ahora mismo voy a ponerte a prueba con algunos ejemplos. ¿${g('Preparado', 'Preparada')}?`,
  ] satisfies GenderedText[],
  next: '¡A por ello!',
}

// Temporary end of the playable script.
export const comingSoon = {
  heading: 'Continuará',
  message: 'La actividad «¿Quién es manipulador de alimentos?» está en desarrollo.',
}
