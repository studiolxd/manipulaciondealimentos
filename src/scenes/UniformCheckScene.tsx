import { useRef, useState } from 'react'
import { feedback } from '../content/feedback'
import { image } from '../content/images'
import { uniformCheck as activity, type UniformElement, type Worker } from '../content/uniformCheck'
import {
  ActivityScene,
  Button,
  FeedbackPanel,
  HotspotFigure,
  Layer,
  Positioned,
  type Feedback,
  type FigureSpot,
} from '../design-system'
import { useGame } from '../game/game'
import { xapi } from '../game/tracking'

const ACTIVITY_ID = 'uniform-check'

const key = (worker: Worker, element: UniformElement) => `${worker.id}:${element.id}`

function spots(worker: Worker, elements: UniformElement[], fixed: ReadonlySet<string>): FigureSpot[] {
  return elements.flatMap((element) =>
    element.boxes.map((box, i) => ({
      ...box,
      id: `${element.id}:${i}`,
      label: element.label,
      fixed: fixed.has(key(worker, element)),
      problem: image(element.problem),
      corrected: image(element.corrected),
    })),
  )
}

// Scenes 28 to 33 (activity 8): four workers in the changing room. The player
// presses everything that must be corrected; each element then shows its
// corrected layer. The nails are checked in a close-up of the hands, opened
// with the + over them. A worker with everything corrected turns black and
// white; with all four, "Finalizar" appears.
export function UniformCheckScene() {
  const { sceneReady, goTo } = useGame()
  const [fixed, setFixed] = useState<ReadonlySet<string>>(new Set())
  const [zoom, setZoom] = useState<Worker | null>(null)
  const [shown, setShown] = useState<Feedback | null>(null)
  const misses = useRef(0)

  const total = activity.workers.reduce((sum, w) => sum + w.elements.length + w.handElements.length, 0)
  const isDone = (worker: Worker) => [...worker.elements, ...worker.handElements].every((e) => fixed.has(key(worker, e)))
  const allDone = activity.workers.every(isDone)

  function correct(worker: Worker, elements: UniformElement[], spotId: string) {
    const element = elements.find((e) => spotId.startsWith(`${e.id}:`))
    if (!element) return
    const next = new Set(fixed).add(key(worker, element))
    setFixed(next)
    setShown(feedback('positive', element.feedback))
    if (next.size === total) xapi.activityCompleted(ACTIVITY_ID, activity.title, Math.max(total - misses.current, 0), total)
  }

  function miss() {
    misses.current += 1
    setShown(feedback('negative', activity.wrong))
  }

  return (
    <ActivityScene
      heading={activity.heading}
      background={image('lockerRoomBackground')}
      backgroundAlt={activity.backgroundAlt}
      ready={sceneReady}
      title={activity.title}
      statement={{
        speaker: 'David',
        blocks: activity.statement,
        label: activity.statementLabel,
        openLabel: activity.openStatement,
        closeLabel: activity.closeStatement,
      }}
      onPlayStart={() => xapi.activityAttempted(ACTIVITY_ID, activity.title)}
    >
      <Layer inert={zoom !== null || shown !== null}>
        {activity.workers.map((worker, i) => (
          <Positioned key={worker.id} top={150} left={120 + i * 440} width={380}>
            <HotspotFigure
              image={image(worker.image)}
              label={worker.label}
              spots={spots(worker, worker.elements, fixed)}
              zooms={[
                { id: 'left', label: activity.zoomHands(worker.label, 'left'), ...activity.zoomAt.left },
                { id: 'right', label: activity.zoomHands(worker.label, 'right'), ...activity.zoomAt.right },
              ]}
              done={isDone(worker)}
              onSpot={(id) => correct(worker, worker.elements, id)}
              onMiss={miss}
              onZoom={() => setZoom(worker)}
            />
          </Positioned>
        ))}

        {allDone && (
          <Positioned bottom={24} center="x">
            <Button claimFocus advance onClick={() => goTo('uniform-conclusion')}>
              {activity.finish}
            </Button>
          </Positioned>
        )}
      </Layer>

      {zoom && (
        <Layer backdrop="dark" inert={shown !== null}>
          <Positioned top={180} center="x" width={1200}>
            <HotspotFigure
              image={image(zoom.hands)}
              label={activity.handsLabel(zoom.label)}
              spots={spots(zoom, zoom.handElements, fixed)}
              onSpot={(id) => correct(zoom, zoom.handElements, id)}
              onMiss={miss}
            />
          </Positioned>
          <Positioned bottom={80} center="x">
            <Button claimFocus onClick={() => setZoom(null)}>
              {activity.back}
            </Button>
          </Positioned>
        </Layer>
      )}

      {shown && (
        <Layer layer="dialog" backdrop>
          <Positioned center="both" width={1300}>
            <FeedbackPanel feedback={shown} closeLabel={activity.feedbackContinue} onClose={() => setShown(null)} />
          </Positioned>
        </Layer>
      )}
    </ActivityScene>
  )
}
