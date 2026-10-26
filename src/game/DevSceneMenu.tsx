import { useEffect } from 'react'
import { ui } from '../content/ui'
import { Dialog, MenuList, Positioned } from '../design-system'
import { sceneProgressWeight, type SceneId } from '../scenes/sceneIds'
import { useGame } from './game'

const sceneIds = Object.keys(sceneProgressWeight) as SceneId[]

// Scenes of the "Guion" sheet each game scene covers, to find them in the menu.
const scriptScenes: Partial<Record<SceneId, string>> = {
  facade: '1',
  'dining-room': '2',
  'handler-definition': '3',
  'who-is-food-handler': '4–5',
  'who-is-food-handler-conclusion': '6',
  'cameras-intro': '7',
  'security-cameras': '8–16',
  'cameras-conclusion': '17',
  'kitchen-detectives': '18–19',
  'detectives-conclusion': '20',
  'who-is-affected': '21–22',
  'who-is-affected-conclusion': '23',
  'locker-room-intro': '24',
  'locker-room-hygiene': '25',
  'health-poster': '26',
  'locker-room-conclusion': '27',
  'uniform-check': '28–33',
  'uniform-conclusion': '34',
}

interface DevSceneMenuProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Development only: Ctrl+Shift+M lists every scene and jumps to the chosen
// one. Jumping goes through goTo, so it also saves progress (e.g. with ?lms=local).
// The URL follows the current scene (?scene=<id>, see App), so reloading the
// page comes back to it; on the title scene the parameter is removed.
export function DevSceneMenu({ open, onOpenChange }: DevSceneMenuProps) {
  const { goTo, sceneId } = useGame()

  useEffect(() => {
    const url = new URL(window.location.href)
    if (sceneId === 'welcome') url.searchParams.delete('scene')
    else url.searchParams.set('scene', sceneId)
    window.history.replaceState(window.history.state, '', url)
  }, [sceneId])

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
        <MenuList
          label={ui.devSceneMenu.label}
          items={sceneIds.map((id) => ({ value: id, label: scriptScenes[id] ? `${scriptScenes[id]} · ${id}` : id }))}
          current={sceneId}
          onSelect={(id) => {
            onOpenChange(false)
            goTo(id)
          }}
        />
      </Dialog>
    </Positioned>
  )
}
