// Fails when a CSS file uses a design token (var(--slxd-…)) that does not
// exist, e.g. after renaming or removing a token. Part of `pnpm lint`.

import { readdir, readFile } from 'node:fs/promises'
import { join, relative } from 'node:path'

const root = join(import.meta.dirname, '..')
const generated = join(root, 'src/design-system/generated/tokens.css')
// Set at runtime by Stage, not by the token build.
const runtimeVariables = new Set(['--slxd-stage-scale'])

async function cssFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true })
  const nested = await Promise.all(
    entries.map((entry) => {
      const path = join(dir, entry.name)
      if (entry.isDirectory()) return entry.name === 'generated' ? [] : cssFiles(path)
      return path.endsWith('.css') ? [path] : []
    }),
  )
  return nested.flat()
}

const defined = new Set([...(await readFile(generated, 'utf8')).matchAll(/(--slxd-[\w-]+):/g)].map((m) => m[1]))
const problems: string[] = []
for (const file of await cssFiles(join(root, 'src'))) {
  const css = await readFile(file, 'utf8')
  for (const [, name] of css.matchAll(/var\((--slxd-[\w-]+)/g)) {
    if (!defined.has(name) && !runtimeVariables.has(name)) problems.push(`${relative(root, file)}: ${name}`)
  }
}

if (problems.length > 0) {
  console.error(`Unknown design tokens:\n${[...new Set(problems)].map((p) => `  - ${p}`).join('\n')}`)
  process.exit(1)
}
console.log('All design tokens used in CSS exist.')
