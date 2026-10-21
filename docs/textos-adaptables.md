# Textos adaptables a la forma de tratamiento

Al empezar, el juego pregunta «¿Cómo quieres que nos dirijamos a ti?»: **Masculino**, **Femenino** o **Neutro**.
Los textos que se dirigen al jugador con marca de género tienen las tres versiones.

Este documento recoge todas las frases que cambian. Se amplía cada vez que se añade una escena.

## Normas

- **El neutro reformula la frase.** Nunca se usan terminaciones como «-e», «-x» o «@», ni pronombres como «elle».
- **Solo cambia lo que se dirige al jugador.** Lo que se dice de otros personajes (por ejemplo, «Laura es
  manipuladora de alimentos») no cambia.
- **Mejor una frase que valga para todos.** Si un texto se puede escribir sin marca de género, se escribe así y no
  necesita versiones (por ejemplo, «¿Te atreves?» o «¡Adelante, detective!»).
- **En el Excel del guion**, marcar las frases que dependen del tratamiento y dar su versión neutra.

En el código, cada frase adaptable se escribe con `g(masculino, femenino, neutro)` en `src/content/`.

## Textos

| Escena | Masculino | Femenino | Neutro | Archivo |
| --- | --- | --- | --- | --- |
| 2 · Salón comedor: bienvenida de David | Bienvenido al equipo. | Bienvenida al equipo. | Te damos la bienvenida al equipo. | `src/content/scenes.ts` (`diningRoom`) |
| 3 · ¿Qué es un manipulador de alimentos? | Tranquilo, es más sencillo de lo que parece: | Tranquila, es más sencillo de lo que parece: | No te preocupes, es más sencillo de lo que parece: | `src/content/scenes.ts` (`handlerDefinition`) |
| 3 · ¿Qué es un manipulador de alimentos? | ¿Preparado? | ¿Preparada? | ¿Empezamos? | `src/content/scenes.ts` (`handlerDefinition`) |

## Iguales para todos

Frases que se dirigen al jugador pero se han dejado igual en las tres formas.

| Escena | Texto | Motivo |
| --- | --- | --- |
| 2 · Salón comedor: bienvenida de David | «Tú debes ser el nuevo fichaje» | «Fichaje» es el mismo sustantivo para cualquier persona. |
| 3 · ¿Qué es un manipulador de alimentos? | «qué significa ser manipulador de alimentos» | Nombra la figura profesional y el curso. Pendiente de decidir si se reformula como «qué significa manipular alimentos». |
