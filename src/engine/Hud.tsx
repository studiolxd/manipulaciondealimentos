import { assetUrl } from './assetUrl'

// Top band, fixed from activity 2 onwards. Its buttons are still to be
// defined; scenes place their own controls over it (e.g. the statement icon).
export function Hud() {
  return <img className="hud" src={assetUrl('hudBar')} alt="" />
}
