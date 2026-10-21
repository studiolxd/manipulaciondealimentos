import { createTracking } from '@studiolxd/tramoya'

// SCORM 1.2 session and optional xAPI, started once per page load.
// See docs/seguimiento.md.
export const tracking = createTracking({
  dev: import.meta.env.DEV,
  baseUrl: import.meta.env.BASE_URL,
  language: 'es-ES',
  mockActivityIriBase: 'https://example.com/xapi/manipulacion-de-alimentos',
})

/** Events proposed in docs/seguimiento.md; the final list is still to be decided. */
export const xapi = tracking.xapi
