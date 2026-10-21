import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Relative base so the build works from any folder inside a SCORM package.
  base: './',
  plugins: [react()],
  // Tramoya is installed from a release tarball and updated often: served as is,
  // so a new version is picked up without clearing Vite's dependency cache.
  optimizeDeps: { exclude: ['@studiolxd/tramoya'] },
})
