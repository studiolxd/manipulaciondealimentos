import { tokenDocs } from '../generated/tokens.docs'
import styles from './TokenTable.module.css'

type Layer = 'primitive' | 'semantic' | 'component'
type Family = 'color' | 'typography' | 'spacing' | 'shape' | 'motion' | 'layer'
type TokenDoc = (typeof tokenDocs)[number]

interface TokenTableProps {
  layer: Layer
  family: Family
}

// Visual sample of a token, when its kind can be drawn.
function Preview({ token }: { token: TokenDoc }) {
  const value = `var(${token.name})`
  if (token.type === 'color') return <span className={styles.swatch} style={{ background: value }} />
  if (token.type === 'shadow') return <span className={styles.box} style={{ boxShadow: value }} />
  if (token.type === 'fontFamily') return <span style={{ fontFamily: value }}>Aa Ññ</span>
  if (token.type === 'fontWeight') return <span style={{ fontWeight: value }}>Aa Ññ</span>
  if (token.type !== 'dimension') return null
  if (token.path.includes('radius')) return <span className={styles.box} style={{ borderRadius: value }} />
  if (token.path.includes('border-width')) return <span className={styles.box} style={{ borderWidth: value }} />
  if (token.family === 'typography') return <span className={styles.text} style={{ fontSize: value }}>Aa</span>
  if (token.family === 'spacing') return <span className={styles.bar} style={{ width: value }} />
  return null
}

// Documentation table generated from the token files.
export function TokenTable({ layer, family }: TokenTableProps) {
  const rows = tokenDocs.filter((token) => token.layer === layer && token.family === family)
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th scope="col">Token</th>
          <th scope="col">Muestra</th>
          <th scope="col">Valor</th>
          {layer !== 'primitive' && <th scope="col">Referencia</th>}
        </tr>
      </thead>
      <tbody>
        {rows.map((token) => (
          <tr key={token.name}>
            <td>
              <code>{token.name}</code>
              {token.description && <p className={styles.description}>{token.description}</p>}
            </td>
            <td className={styles.preview} aria-hidden="true">
              <Preview token={token} />
            </td>
            <td>
              <code>{token.value}</code>
            </td>
            {layer !== 'primitive' && (
              <td>
                <code>{token.reference}</code>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
