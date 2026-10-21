// Public API of the Studio LXD design system. Game code imports UI only from
// here; the internals of this folder are private (enforced by oxlint).
//
// Levels: layout → atoms → molecules → organisms → templates. Each level is
// built only from the levels below it; only atoms render semantic HTML.

// Self-hosted Google Fonts (see tokens/primitive/typography.json).
import '@fontsource-variable/fredoka'
import '@fontsource-variable/atkinson-hyperlegible-next'
import './generated/tokens.css'
import './styles/base.css'

export { tokens, type TokenName } from './generated/tokens'
export type { ImageSource, StageLayer } from './types'
export type { IconName } from './icons.manifest'
export { useCoarsePointer, useMediaQuery, usePortrait, useReducedMotion } from './hooks/useMediaQuery'
export type { DesignSystemStrings } from './hooks/useDesignSystem'
export { withViewTransition } from './viewTransition'
export { DesignSystemProvider } from './providers/DesignSystemProvider'

// Utilities
export { VisuallyHidden } from './components/utilities/VisuallyHidden/VisuallyHidden'

// Layout
export { Layer } from './components/layout/Layer/Layer'
export { Positioned } from './components/layout/Positioned/Positioned'

// Atoms
export { Button } from './components/atoms/Button/Button'
export { Heading } from './components/atoms/Heading/Heading'
export { Icon } from './components/atoms/Icon/Icon'
export { Image } from './components/atoms/Image/Image'
export { Label } from './components/atoms/Label/Label'
export { Radio } from './components/atoms/Radio/Radio'
export { Stamp } from './components/atoms/Stamp/Stamp'
export { Surface } from './components/atoms/Surface/Surface'
export { Text } from './components/atoms/Text/Text'

// Molecules
export { ActivityTitle } from './components/molecules/ActivityTitle/ActivityTitle'
export { ChoiceCard } from './components/molecules/ChoiceCard/ChoiceCard'
export { FeedbackPanel, type Feedback } from './components/molecules/FeedbackPanel/FeedbackPanel'
export { IconButton } from './components/molecules/IconButton/IconButton'
export { IdCard } from './components/molecules/IdCard/IdCard'
export { InlineAlert } from './components/molecules/InlineAlert/InlineAlert'
export { NarrationBox } from './components/molecules/NarrationBox/NarrationBox'
export { Typewriter } from './components/molecules/Typewriter/Typewriter'

// Organisms
export { ChoiceCardGroup, type ChoiceCardOption } from './components/organisms/ChoiceCardGroup/ChoiceCardGroup'
export { Dialog } from './components/organisms/Dialog/Dialog'
export { Hud } from './components/organisms/Hud/Hud'
export { SpeechBubble } from './components/organisms/SpeechBubble/SpeechBubble'
export { SwipeCard, type SwipeCardHandle, type SwipeDirection } from './components/organisms/SwipeCard/SwipeCard'
export {
  SwipeSorter,
  type SwipeSorterHandle,
  type SwipeSorterItem,
  type SwipeSorterLabels,
} from './components/organisms/SwipeSorter/SwipeSorter'

// Templates
export { ActivityScene, type ActivityStatement } from './components/templates/ActivityScene/ActivityScene'
export { DialogueScene } from './components/templates/DialogueScene/DialogueScene'
export { RotateDeviceScreen } from './components/templates/RotateDeviceScreen/RotateDeviceScreen'
export { SceneFrame } from './components/templates/SceneFrame/SceneFrame'
export { Stage, STAGE_HEIGHT, STAGE_WIDTH } from './components/templates/Stage/Stage'
