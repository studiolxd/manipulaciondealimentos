import { useEffect, useRef } from 'react'
import { ui } from '../content/ui'
import { assetUrl } from './assetUrl'
import { useMediaQuery } from './useMediaQuery'

// Shown on top of the game while the screen is taller than it is wide.
export function RotateDeviceOverlay() {
  const touch = useMediaQuery('(pointer: coarse)')
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  return (
    <div className="rotate-overlay" role="dialog" aria-modal="true" aria-labelledby="rotate-title" aria-describedby="rotate-message">
      <img className="rotate-overlay__icon" src={assetUrl('rotateDeviceIcon')} alt="" />
      <h2 id="rotate-title" className="rotate-overlay__title" ref={headingRef} tabIndex={-1}>
        {ui.rotateDevice.title}
      </h2>
      <p id="rotate-message" className="rotate-overlay__message">
        {touch ? ui.rotateDevice.touchMessage : ui.rotateDevice.desktopMessage}
      </p>
    </div>
  )
}
