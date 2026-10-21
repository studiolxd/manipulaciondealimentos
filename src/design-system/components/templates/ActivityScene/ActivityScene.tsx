import { useRef, useState, type ReactNode } from 'react'
import type { ImageSource } from '../../../types'
import { withViewTransition } from '../../../viewTransition'
import { Text } from '../../atoms/Text/Text'
import { Layer } from '../../layout/Layer/Layer'
import { Positioned } from '../../layout/Positioned/Positioned'
import { ActivityTitle } from '../../molecules/ActivityTitle/ActivityTitle'
import { IconButton } from '../../molecules/IconButton/IconButton'
import { Dialog } from '../../organisms/Dialog/Dialog'
import { Hud } from '../../organisms/Hud/Hud'
import { SpeechBubble } from '../../organisms/SpeechBubble/SpeechBubble'
import { SceneFrame } from '../SceneFrame/SceneFrame'

export interface ActivityStatement {
  speaker: string
  /** Shown block by block at the start; all together when reopened. */
  blocks: string[]
  /** Accessible name of the reopened statement. */
  label: string
  openLabel: string
  closeLabel: string
}

interface ActivitySceneProps {
  heading: string
  background: ImageSource
  backgroundAlt: string
  /** The scene has finished fading in: the heading takes the focus and the title appears. */
  ready: boolean
  title: string
  statement: ActivityStatement
  /** Extra HUD content on the right, e.g. a progress Label. */
  hudEnd?: ReactNode
  /** Called once the statement has shrunk and the activity is on screen (e.g. to focus it). */
  onPlayStart?: () => void
  /** The activity itself, shown after the statement. */
  children: ReactNode
}

type Phase = 'title' | 'statement' | 'play'

const STATEMENT_TRANSITION = 'activity-statement'

// SceneFrame + ActivityTitle + statement + HUD. The title fades out, the
// statement is read in a SpeechBubble that then shrinks into a HUD IconButton,
// and that button reopens it as a Dialog while the activity waits behind.
export function ActivityScene({
  heading,
  background,
  backgroundAlt,
  ready,
  title,
  statement,
  hudEnd,
  onPlayStart,
  children,
}: ActivitySceneProps) {
  const [phase, setPhase] = useState<Phase>('title')
  const [statementOpen, setStatementOpen] = useState(false)
  const statementButtonRef = useRef<HTMLButtonElement>(null)

  function startPlay() {
    withViewTransition(() => setPhase('play'), onPlayStart)
  }

  function closeStatement() {
    withViewTransition(
      () => setStatementOpen(false),
      () => statementButtonRef.current?.focus(),
    )
  }

  return (
    <SceneFrame heading={heading} background={background} backgroundAlt={backgroundAlt} focusHeading={ready}>
      {phase === 'play' && <Layer inert={statementOpen}>{children}</Layer>}

      <Layer layer="over-hud" inert={statementOpen}>
        <Hud
          start={
            phase === 'play' && (
              <IconButton
                ref={statementButtonRef}
                icon="statement"
                label={statement.openLabel}
                opensDialog
                // While open, the icon has become the dialog.
                concealed={statementOpen}
                viewTransitionName={STATEMENT_TRANSITION}
                onClick={() => withViewTransition(() => setStatementOpen(true))}
              />
            )
          }
          end={phase === 'play' && hudEnd}
        />
      </Layer>

      {ready && phase === 'title' && (
        <Positioned center="both" layer="over-hud">
          <ActivityTitle title={title} onFinished={() => setPhase('statement')} />
        </Positioned>
      )}

      {phase === 'statement' && (
        <Positioned top={160} left={210} width={1500} layer="over-hud">
          <SpeechBubble
            speaker={statement.speaker}
            blocks={statement.blocks}
            tail="bottom"
            viewTransitionName={STATEMENT_TRANSITION}
            onDismiss={startPlay}
          />
        </Positioned>
      )}

      {statementOpen && (
        <Positioned top={160} left={210} width={1500} layer="dialog">
          <Dialog
            label={statement.label}
            closeLabel={statement.closeLabel}
            viewTransitionName={STATEMENT_TRANSITION}
            onClose={closeStatement}
          >
            {statement.blocks.map((block) => (
              <Text key={block}>{block}</Text>
            ))}
          </Dialog>
        </Positioned>
      )}
    </SceneFrame>
  )
}
