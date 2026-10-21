import { useEffect, useRef, type ReactNode } from 'react'
import { Surface } from '../../atoms/Surface/Surface'
import { IconButton } from '../../molecules/IconButton/IconButton'
import styles from './Dialog.module.css'

interface DialogProps {
  label: string
  closeLabel: string
  viewTransitionName?: string
  onClose: () => void
  children: ReactNode
}

// Surface + IconButton: modal panel inside the stage. It is opened without
// showModal(), which would move it to the top layer, outside the stage
// scaling; the caller makes the rest of the scene inert while it is open.
export function Dialog({ label, closeLabel, viewTransitionName, onClose, children }: DialogProps) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeRef.current?.focus()
  }, [])

  return (
    <Surface
      as="dialog"
      tone="opaque"
      padding="lg"
      className={styles.dialog}
      aria-modal="true"
      aria-label={label}
      viewTransitionName={viewTransitionName}
      onKeyDown={(event) => {
        if (event.key === 'Escape') onClose()
      }}
    >
      <div className={styles.body}>{children}</div>
      <div className={styles.close}>
        <IconButton ref={closeRef} icon="close" label={closeLabel} onClick={onClose} />
      </div>
    </Surface>
  )
}
