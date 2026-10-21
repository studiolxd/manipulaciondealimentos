import { useEffect, useRef, type ReactNode } from 'react'

interface ActionButtonProps {
  onClick: () => void
  className?: string
  children: ReactNode
}

// Main call to action of a scene. It usually appears once a text ends; if the
// element that had the focus disappeared, the focus moves here so keyboard and
// screen reader users do not lose their place.
export function ActionButton({ onClick, className, children }: ActionButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!document.activeElement || document.activeElement === document.body) ref.current?.focus()
  }, [])

  return (
    <button ref={ref} type="button" className={`action-button ${className ?? ''}`} onClick={onClick}>
      {children}
    </button>
  )
}
