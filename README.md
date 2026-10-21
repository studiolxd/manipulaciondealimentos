# Manipulación de alimentos

Aventura gráfica de formación de Studio LXD, publicada como paquete SCORM 1.2.
Demo: https://studiolxd.github.io/manipulaciondealimentos/

## Cómo está hecho

- **[Tramoya](https://github.com/studiolxd/tramoya)** (`@studiolxd/tramoya`): el motor, sin estilos. Flujo de
  escenas, progreso en el LMS, xAPI, textos según la forma de tratamiento y el comportamiento de las
  interacciones.
- **`src/design-system`**: el sistema de diseño del juego, que viste a Tramoya. Todo lo que se ve sale de aquí
  (`pnpm storybook`).
- **`src/game`**: configuración del motor para este juego (escenas, seguimiento).
- **`src/scenes`** y **`src/content`**: las escenas y sus textos, según el guion de `docs/`.

## Comandos

| Comando | Qué hace |
| --- | --- |
| `pnpm dev` | Servidor de desarrollo. `?scene=<id>` empieza en una escena, y la URL sigue a la escena actual para volver a ella al recargar; <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd> abre el menú de escenas; `?lms=local` simula un LMS. |
| `pnpm build` | Build de producción en `dist/`. |
| `pnpm package` | Build y paquete SCORM 1.2 en `release/`. |
| `pnpm lint` | oxlint, Stylelint y comprobación de tokens. |
| `pnpm storybook` | Documentación del sistema de diseño. |
| `pnpm placeholders` | Crea las imágenes provisionales que falten en `public/`. |

Cada push a `main` publica la demo en GitHub Pages.

Para cambiar Tramoya a la vez que el juego, ver «Instalación» en su README.

## Créditos

- Sonido de clic de los botones: [UI Audio](https://kenney.nl/assets/ui-audio) de Kenney, CC0.
- Sonidos de acierto y error: [Interface Sounds](https://kenney.nl/assets/interface-sounds) de Kenney, CC0.
- Locuciones: generadas con [ElevenLabs](https://elevenlabs.io) (modelo eleven_v4). Narradora: voz «Carolina - Natural,
  Neutral and Clear»; David: voz «Juan Garcia Jimenez». Ver `src/content/voices.ts`.
