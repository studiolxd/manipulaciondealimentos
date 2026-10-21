// Packages the production build (dist/) as a SCORM 1.2 zip ready to upload to
// an LMS: release/manipulador-de-alimentos-scorm12-<version>.zip
//
//   pnpm package   (builds first)
//
// Each client's xAPI settings go in xapi.config.json, at the root of the zip;
// it can be edited without rebuilding (see docs/seguimiento.md).

import { readdir, readFile, mkdir, writeFile } from 'node:fs/promises'
import { join, relative, sep } from 'node:path'
import { zipSync } from 'fflate'

const root = join(import.meta.dirname, '..')
const distDir = join(root, 'dist')
const releaseDir = join(root, 'release')
const TITLE = 'Manipulador de alimentos'
const IDENTIFIER = 'com.studiolxd.manipulador-de-alimentos'

async function listFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    entries.map((entry) => (entry.isDirectory() ? listFiles(join(dir, entry.name)) : [join(dir, entry.name)])),
  )
  return files.flat()
}

function escapeXml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function manifest(version: string, files: string[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<manifest identifier="${IDENTIFIER}" version="${escapeXml(version)}"
  xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2"
  xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.imsproject.org/xsd/imscp_rootv1p1p2 imscp_rootv1p1p2.xsd http://www.imsglobal.org/xsd/imsmd_rootv1p2p1 imsmd_rootv1p2p1.xsd http://www.adlnet.org/xsd/adlcp_rootv1p2 adlcp_rootv1p2.xsd">
  <metadata>
    <schema>ADL SCORM</schema>
    <schemaversion>1.2</schemaversion>
  </metadata>
  <organizations default="org">
    <organization identifier="org">
      <title>${escapeXml(TITLE)}</title>
      <item identifier="item" identifierref="resource" isvisible="true">
        <title>${escapeXml(TITLE)}</title>
      </item>
    </organization>
  </organizations>
  <resources>
    <resource identifier="resource" type="webcontent" adlcp:scormtype="sco" href="index.html">
${files.map((file) => `      <file href="${escapeXml(file)}"/>`).join('\n')}
    </resource>
  </resources>
</manifest>
`
}

const { version } = JSON.parse(await readFile(join(root, 'package.json'), 'utf8')) as { version: string }
const paths = (await listFiles(distDir)).sort()
const relativePaths = paths.map((path) => relative(distDir, path).split(sep).join('/'))

const entries: Record<string, Uint8Array> = {
  'imsmanifest.xml': new TextEncoder().encode(manifest(version, relativePaths)),
}
for (const [index, path] of paths.entries()) entries[relativePaths[index]] = await readFile(path)

await mkdir(releaseDir, { recursive: true })
const target = join(releaseDir, `manipulador-de-alimentos-scorm12-${version}.zip`)
await writeFile(target, zipSync(entries, { level: 9 }))
console.log(`SCORM 1.2 package: ${relative(root, target)} (${relativePaths.length} files)`)
