import { autoTerminate, createScormSession } from '@studiolxd/scorm'
import { installDevLms } from './devLms'

// One SCORM 1.2 session per page load, created outside React: a terminated
// session cannot be initialized again, and React mounts components twice in
// development. Without an LMS (plain web preview) an in-memory mock is used.
if (import.meta.env.DEV) installDevLms()

export const scorm = createScormSession('1.2', { noLmsBehavior: 'mock', debug: import.meta.env.DEV })

// Initializes now; records session time, commits and terminates on unload.
autoTerminate(scorm)
