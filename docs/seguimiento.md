# Seguimiento del alumno (SCORM y xAPI)

El juego informa al LMS con **SCORM 1.2** y, opcionalmente, registra el detalle de lo que hace el alumno con
**xAPI** en un LRS.

## SCORM 1.2 (decidido)

| Dato SCORM | Qué guarda |
| --- | --- |
| `cmi.core.score.raw` | **Progreso**, no nota: % de escenas del guion completadas (0–100). Un 10 % significa 10 escenas de 100. |
| `cmi.core.lesson_status` | `incomplete` mientras quede alguna escena; `completed` al terminarlas todas. Nunca `passed`/`failed`: no hay nota de corte. |
| `cmi.core.lesson_location` | Escena en la que está el alumno. |
| `cmi.suspend_data` | Forma de tratamiento, escenas completadas y escena actual, para **continuar por donde iba** al volver; fuera de un LMS, también el nombre escrito. |
| `cmi.core.student_name` | **Nombre del alumno**, solo lectura. Viene como «Apellido, Nombre» y el juego usa el nombre de pila. |

- **Nombre:** dentro de un LMS se toma de `cmi.core.student_name`. Fuera de un LMS, la primera pantalla pregunta
  «¿Cómo te llamas?».
- No hay nota por actividad.
- Una escena se da por completada al salir de ella.
- Las escenas cuentan según el guion: las escenas 4 y 5 son una sola pantalla del juego, pero suman dos
  (`sceneProgressWeight` en `src/scenes/sceneIds.ts`). La elección de avatar y la pantalla final provisional no cuentan.
- Cada vez que se abre, el juego empieza en la portada («Manipulación de alimentos»). Si el LMS tiene progreso de
  otra sesión, el botón dice «Continuar» y lleva a la escena guardada; si no, «Comenzar». La portada no cuenta ni se
  guarda como escena actual (`titleScene` en `src/game/game.ts`).
- Al volver, el juego continúa al principio de la escena en la que estaba. El estado interno de una actividad a
  medias (por ejemplo, las tarjetas ya respondidas) no se guarda.
- Mientras se añadan escenas, el total crece y el porcentaje de quien ya había avanzado baja.
- SCORM 1.2 limita `suspend_data` a 4.096 caracteres. Con el formato actual caben unas 150 escenas.

Código: [Tramoya](https://github.com/studiolxd/tramoya) (`createTracking` y el progreso de `createGame`); el juego lo configura en `src/game/tracking.ts` y `src/game/game.ts`.

### Paquete

`pnpm package` compila y genera `release/manipulador-de-alimentos-scorm12-<versión>.zip`, con el `imsmanifest.xml`,
listo para subir al LMS.

### Pruebas en desarrollo

- `?lms=local`: simula un LMS SCORM 1.2 que guarda en el navegador; al recargar, el juego reanuda.
- `?lms=reset`: borra ese LMS simulado y empieza de cero.
- Sin estos parámetros, ni fuera de un LMS, el juego usa un LMS en memoria y no guarda nada entre recargas.

## xAPI (preparado, desactivado)

Está montado pero **desactivado**. Se activa por cliente en `xapi.config.json`, en la raíz del paquete, que se
puede editar sin recompilar:

```json
{
  "enabled": true,
  "endpoint": "https://lrs.cliente.com/xapi/",
  "auth": { "username": "clave", "password": "secreto" },
  "lmsHomePage": "https://campus.cliente.com",
  "activityIriBase": "https://…/manipulador-de-alimentos"
}
```

| Campo | Para qué |
| --- | --- |
| `enabled` | Activa xAPI. Sin el archivo, o con `false`, no se envía nada. |
| `endpoint` | Dirección del LRS. |
| `auth` | Credenciales: `{ "username", "password" }` (básica) o `{ "token" }`. |
| `lmsHomePage` | Dirección del LMS. Junto con el identificador SCORM del alumno, lo identifica en xAPI (`actor.account`). |
| `activityIriBase` | Base de los identificadores de actividades (ver pendientes). |

En desarrollo, `?xapi=mock` activa xAPI contra un LRS simulado en memoria y muestra cada registro en la consola.

Código: Tramoya (`src/tracking/xapi.ts`), configurado en `src/game/tracking.ts`.

### Eventos propuestos (a matizar)

| Evento | Verbo xAPI | Cuándo | Datos |
| --- | --- | --- | --- |
| Escena visitada | `experienced` | Al entrar en cada escena | Escena |
| Inicio de actividad | `attempted` | Al empezar la parte interactiva | Actividad |
| Respuesta | `answered` | En cada respuesta | Pregunta, respuesta, si es correcta y respuesta correcta (`true-false` en la actividad 2) |
| Fin de actividad | `completed` | Al responder la última pregunta | Aciertos sobre el total |

Ahora mismo envía estos eventos la actividad 2 («¿Quién es manipulador de alimentos?»), y las escenas visitadas
en todo el juego.

## Pendiente

- [ ] **Lista definitiva de eventos xAPI.** Qué se registra y con qué detalle.
- [ ] **Convención de identificadores (IRI).** Crear la nuestra o reutilizar un estándar: perfiles xAPI de ADL,
      vocabulario cmi5… Afecta a `activityIriBase` y a las rutas de actividades, escenas y preguntas.
- [ ] **Conexión con el LRS.** Endpoint y credenciales de cada cliente.
- [ ] **Seguridad de las credenciales.** Viajan en `xapi.config.json`, dentro del paquete, y cualquiera que lo
      inspeccione puede verlas. Opciones: credenciales del LRS que solo permitan escribir registros, o un
      intermediario en nuestro servidor que los reciba y los reenvíe al LRS.
