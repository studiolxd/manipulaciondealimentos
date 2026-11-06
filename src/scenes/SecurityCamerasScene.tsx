import { shuffle } from '@studiolxd/tramoya'
import { useEffect, useRef, useState } from 'react'
import { feedback } from '../content/feedback'
import { image, video } from '../content/images'
import { securityCameras as activity, type CameraVideo } from '../content/securityCameras'
import type { AssetId } from '../content/assets'
import type { VideoId } from '../content/videos'
import {
  ActivityScene,
  FeedbackPanel,
  Layer,
  MediaGallery,
  OptionButtons,
  Positioned,
  QuestionPanel,
  TabletFrame,
  Video,
  type Feedback,
  type VideoHandle,
} from '../design-system'
import { useGame } from '../game/game'
import { xapi } from '../game/tracking'

const ACTIVITY_ID = 'security-cameras'
// After the last recording, the gallery stays on screen this long before moving on.
const GALLERY_HOLD_MS = 2000

type View =
  | { kind: 'gallery' }
  | {
      kind: 'video'
      index: number
      step: 'watching' | 'watched' | 'question'
      question: number
      /** Order of the answers of each question, shuffled when the video opens. */
      orders: number[][]
    }

interface Shown {
  feedback: Feedback
  correct: boolean
}

function openVideo(item: CameraVideo, index: number): View {
  const orders = item.questions.map((q) => {
    const indices = q.answers.map((_, i) => i)
    return q.shuffle ? shuffle(indices) : indices
  })
  return { kind: 'video', index, step: 'watching', question: 0, orders }
}

// Scenes 8 to 16 (activity 3): a gallery of security camera recordings on the
// reception tablet. Each recording plays, then its questions are asked over
// the frozen frame; a wrong answer is tried again until it is right. Back in
// the gallery the recording turns black and white. When all are done, the
// game moves on.
export function SecurityCamerasScene() {
  const { sceneReady, goTo, text } = useGame()
  const [done, setDone] = useState<string[]>([])
  const [view, setView] = useState<View>({ kind: 'gallery' })
  const [shown, setShown] = useState<Shown | null>(null)
  // Wrong answers reset the question so it is answered again.
  const [attempt, setAttempt] = useState(0)
  const firstTryRight = useRef(0)
  const triedQuestions = useRef(new Set<string>())
  const videoRef = useRef<VideoHandle>(null)
  const totalQuestions = activity.videos.reduce((sum, item) => sum + item.questions.length, 0)

  const allDone = done.length === activity.videos.length
  useEffect(() => {
    if (!allDone || view.kind !== 'gallery') return
    xapi.activityCompleted(ACTIVITY_ID, activity.title, firstTryRight.current, totalQuestions)
    const timer = setTimeout(() => goTo('cameras-conclusion'), GALLERY_HOLD_MS)
    return () => clearTimeout(timer)
  }, [allDone, view.kind, goTo, totalQuestions])

  const current = view.kind === 'video' ? activity.videos[view.index] : null
  const question = view.kind === 'video' && current ? current.questions[view.question] : null

  function answer(choice: number) {
    if (view.kind !== 'video' || !current || !question) return
    const answerIndex = view.orders[view.question][choice]
    const correct = answerIndex === 0
    const questionId = `${current.id}-q${view.question + 1}`
    if (!triedQuestions.current.has(questionId)) {
      triedQuestions.current.add(questionId)
      if (correct) firstTryRight.current += 1
    }
    xapi.answered({
      activityId: ACTIVITY_ID,
      activityName: activity.title,
      questionId,
      question: `${current.description} ${question.question}`,
      response: correct,
      correctResponse: true,
    })
    const texts = activity.feedback[question.kind]
    setShown({ feedback: feedback(correct ? 'positive' : 'negative', correct ? texts.correct : texts.incorrect), correct })
  }

  function closeFeedback() {
    if (view.kind !== 'video' || !current || !shown) return
    setShown(null)
    if (!shown.correct) {
      setAttempt((n) => n + 1)
      return
    }
    if (view.question + 1 < current.questions.length) {
      setView({ ...view, question: view.question + 1 })
      return
    }
    setDone((list) => [...list, current.id])
    setView({ kind: 'gallery' })
  }

  const lastQuestion = view.kind === 'video' && current ? view.question + 1 === current.questions.length : false
  const closeLabel = !shown?.correct ? activity.tryAgain : lastQuestion ? activity.backToCameras : activity.nextQuestion

  return (
    <ActivityScene
      heading={activity.heading}
      background={image('counterTopBackground')}
      backgroundAlt={activity.backgroundAlt}
      ready={sceneReady}
      title={activity.title}
      statement={{
        speaker: 'David',
        blocks: activity.statement.map(text),
        label: activity.statementLabel,
        openLabel: activity.openStatement,
        closeLabel: activity.closeStatement,
      }}
      onPlayStart={() => xapi.activityAttempted(ACTIVITY_ID, activity.title)}
    >
      <Positioned top={150} left={160} width={1600} height={880}>
        <TabletFrame>
          {view.kind === 'gallery' && (
            <MediaGallery
              label={activity.galleryLabel}
              doneLabel={activity.cameraDone}
              items={activity.videos.map((item, index) => ({
                id: item.id,
                label: activity.camera(index + 1),
                thumbnail: image(`cameraThumbnail${index + 1}` as AssetId),
                done: done.includes(item.id),
              }))}
              onOpen={(id) => {
                const index = activity.videos.findIndex((item) => item.id === id)
                setView(openVideo(activity.videos[index], index))
              }}
            />
          )}

          {view.kind === 'video' && current && (
            <>
              <Video
                ref={videoRef}
                key={current.id}
                source={video(`camera${view.index + 1}` as VideoId)}
                label={`${activity.camera(view.index + 1)}. ${current.description}`}
                dimmed={view.step === 'question'}
                onEnded={() => setView((v) => (v.kind === 'video' && v.step === 'watching' ? { ...v, step: 'watched' } : v))}
              />
              {view.step === 'watched' && (
                <Positioned bottom={48} center="x">
                  <OptionButtons
                    label={activity.camera(view.index + 1)}
                    options={[
                      { value: 'replay', label: activity.replay },
                      { value: 'questions', label: activity.toQuestions },
                    ]}
                    onSelect={(choice) => {
                      if (choice === 'replay') {
                        setView({ ...view, step: 'watching' })
                        videoRef.current?.replay()
                      } else setView({ ...view, step: 'question' })
                    }}
                  />
                </Positioned>
              )}
              {view.step === 'question' && question && (
                <Positioned top={32} center="x" width={1400} height={736}>
                  <QuestionPanel
                    key={`${view.question}-${attempt}`}
                    name={`${current.id}-q${view.question + 1}`}
                    question={question.question}
                    answers={view.orders[view.question].map((i) => question.answers[i])}
                    checkLabel={activity.check}
                    onAnswer={answer}
                  />
                </Positioned>
              )}
            </>
          )}
        </TabletFrame>
      </Positioned>

      {shown && (
        <Layer layer="dialog" backdrop>
          <Positioned center="both" width={1300}>
            <FeedbackPanel feedback={shown.feedback} closeLabel={closeLabel} onClose={closeFeedback} />
          </Positioned>
        </Layer>
      )}

    </ActivityScene>
  )
}
