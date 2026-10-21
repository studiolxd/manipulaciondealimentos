import styles from './TypeSpecimen.module.css'

export type TypeRole =
  | 'display'
  | 'heading'
  | 'subheading'
  | 'label'
  | 'control'
  | 'stamp'
  | 'body'
  | 'body-strong'
  | 'body-sm'

interface TypeSpecimenProps {
  role: TypeRole
  /** Caption, e.g. "Título de actividad · Roboto 104 / 700". */
  label: string
  sample: string
}

// Documentation: a sample of a role of the type scale, drawn with its tokens
// at half its size on the stage.
export function TypeSpecimen({ role, label, sample }: TypeSpecimenProps) {
  return (
    <figure className={styles.figure}>
      <figcaption className={styles.caption}>{label}</figcaption>
      <p className={styles.specimen} data-role={role}>
        {sample}
      </p>
    </figure>
  )
}

interface FontFamilySampleProps {
  family: 'display' | 'body'
}

// Documentation: the characters of a family, including Spanish ones.
export function FontFamilySample({ family }: FontFamilySampleProps) {
  return (
    <div className={styles.family} data-family={family}>
      <p className={styles.alphabet}>Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Ññ Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz</p>
      <p className={styles.alphabet}>Áá Éé Íí Óó Úú Üü ¿? ¡! 0 1 2 3 4 5 6 7 8 9 % € « » — …</p>
      <p className={styles.weights}>
        {(family === 'display' ? [300, 400, 500, 600, 700, 800, 900] : [200, 400, 600, 700]).map((weight) => (
          <span key={weight} style={{ fontWeight: weight }}>
            {weight}
          </span>
        ))}
      </p>
    </div>
  )
}
