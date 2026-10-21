import { tokenDocs } from '../generated/tokens.docs'
import styles from './TokenTable.module.css'

type Layer = 'primitive' | 'semantic' | 'component'
type Family = 'color' | 'typography' | 'spacing' | 'shape' | 'motion' | 'layer'

interface TokenTableProps {
  layer: Layer
  family: Family
}

// Documentation table generated from the token files.
export function TokenTable({ layer, family }: TokenTableProps) {
  const rows = tokenDocs.filter((token) => token.layer === layer && token.family === family)
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th scope="col">Token</th>
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
            <td>
              {token.type === 'color' && (
                <span className={styles.swatch} style={{ background: `var(${token.name})` }} aria-hidden="true" />
              )}
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
