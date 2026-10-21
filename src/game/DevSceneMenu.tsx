import { useEffect } from 'react'
import { ui } from '../content/ui'
import { Dialog, OptionButtons, Positioned } from '../design-system'
import { sceneProgressWeight, type SceneId } from '../scenes/sceneIds'
import { useGame } from './game'

const sceneIds = Object.keys(sceneProgressWeight) as SceneId[]

interface DevSceneMenuProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Development only: Ctrl+Shift+M lists every scene and jumps to the chosen
// one. Jumping goes through goTo, so it also saves progress (e.g. with ?lms=local).
export function DevSceneMenu({ open, onOpenChange }: DevSceneMenuProps) {
  const { goTo } = useGame()

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'm') {
        event.preventDefault()
        onOpenChange(!open)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onOpenChange])

  if (!open) return null
  return (
    <Positioned top={120} center="x" width={1600} layer="dialog">
      <Dialog label={ui.devSceneMenu.label} closeLabel={ui.devSceneMenu.close} onClose={() => onOpenChange(false)}>
        <OptionButtons
          wrap
          label={ui.devSceneMenu.label}
          options={sceneIds.map((id) => ({ value: id, label: id }))}
          onSelect={(id) => {
            onOpenChange(false)
            goTo(id)
          }}
        />
      </Dialog>
    </Positioned>
  )
}
