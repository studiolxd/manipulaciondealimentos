import styles from './Curtain.module.css'

interface CurtainProps {
  closed: boolean
}

// Black curtain over the whole stage, used to fade between scenes.
export function Curtain({ closed }: CurtainProps) {
  return <div className={styles.curtain} data-closed={closed || undefined} aria-hidden="true" />
}
