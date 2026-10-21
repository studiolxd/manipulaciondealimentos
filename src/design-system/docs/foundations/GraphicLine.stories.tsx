import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Button } from '../../components/atoms/Button/Button'
import { Label } from '../../components/atoms/Label/Label'
import { Positioned } from '../../components/layout/Positioned/Positioned'
import { ActivityTitle } from '../../components/molecules/ActivityTitle/ActivityTitle'
import { ChoiceCard } from '../../components/molecules/ChoiceCard/ChoiceCard'
import { FeedbackPanel } from '../../components/molecules/FeedbackPanel/FeedbackPanel'
import { IconButton } from '../../components/molecules/IconButton/IconButton'
import { IdCard } from '../../components/molecules/IdCard/IdCard'
import { InlineAlert } from '../../components/molecules/InlineAlert/InlineAlert'
import { NarrationBox } from '../../components/molecules/NarrationBox/NarrationBox'
import { Typewriter } from '../../components/molecules/Typewriter/Typewriter'
import { Hud } from '../../components/organisms/Hud/Hud'
import { SpeechBubble } from '../../components/organisms/SpeechBubble/SpeechBubble'
import { SwipeSorter } from '../../components/organisms/SwipeSorter/SwipeSorter'
import { SceneFrame } from '../../components/templates/SceneFrame/SceneFrame'
import { fixtures } from '../fixtures'

// The interface over test backgrounds generated with Magnific.

const meta = {
  title: 'Fundamentos/Línea gráfica',
  parameters: { stage: true },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Narration: Story = {
  name: 'Narración sobre la fachada',
  render: () => (
    <SceneFrame heading="Fachada" background={fixtures.testFacade} backgroundAlt="">
      <Positioned center="both" width={1200}>
        <NarrationBox>
          <Typewriter
            complete
            text="Hoy será tu primer día en hostelería. Debes entrar y buscar a David, el encargado. Él te ayudará y te enseñará todo lo que necesitas. ¡Buena suerte!"
          />
        </NarrationBox>
      </Positioned>
      <Positioned bottom={96} center="x">
        <Button onClick={fn()}>Entrar al restaurante</Button>
      </Positioned>
    </SceneFrame>
  ),
}

export const Dialogue: Story = {
  name: 'Diálogo en el salón',
  render: () => (
    <SceneFrame heading="Salón" background={fixtures.testDiningRoom} backgroundAlt="">
      <Positioned top={180} left={760} width={1000}>
        <SpeechBubble
          speaker="David"
          tail="left"
          blocks={[
            '¡Hola! Soy David, el encargado. Tú debes ser el nuevo fichaje... ¡te estábamos esperando! Te damos la bienvenida al equipo.',
          ]}
        />
      </Positioned>
      <Positioned bottom={64} center="x">
        <Button onClick={fn()}>¡Vamos!</Button>
      </Positioned>
      <Hud />
    </SceneFrame>
  ),
}

export const Activity: Story = {
  name: 'Actividad en el salón',
  render: () => (
    <SceneFrame heading="Actividad" background={fixtures.testDiningRoom} backgroundAlt="">
      <SwipeSorter
        item={{
          id: 'oscar',
          label: 'Óscar Fernández',
          description: 'Cocinero del restaurante El Caserío.',
          content: (
            <IdCard
              name="Óscar Fernández"
              job="Cocinero"
              company="Restaurante El Caserío"
              description="Me encargo de preparar los platos de la carta para que los clientes queden satisfechos."
              portrait={fixtures.idPortrait}
            />
          ),
        }}
        feedback={{
          tone: 'negative',
          title: '¡Incorrecto!',
          message: 'Sergio no es manipulador de alimentos porque sus funciones no intervienen en ninguna tarea relacionada con los alimentos.',
        }}
        labels={{
          roleDescription: 'Carnet',
          keyboardHint: 'Pulsa la flecha derecha para SÍ o la flecha izquierda para NO.',
          yes: 'SÍ',
          no: 'NO',
          yesButton: 'SÍ, es manipulador de alimentos',
          noButton: 'NO, no es manipulador de alimentos',
          continue: 'Continuar',
        }}
        onAnswer={fn()}
      />
      <Hud
        start={<IconButton icon="statement" label="Ver el enunciado" onClick={fn()} />}
        end={<Label tone="inverse">Tarjeta 3 de 11</Label>}
      />
    </SceneFrame>
  ),
}

export const Title: Story = {
  name: 'Título de actividad',
  render: () => (
    <SceneFrame heading="Actividad" background={fixtures.testDiningRoom} backgroundAlt="">
      <Positioned center="both">
        {/* Kept on screen: the animation is restarted on every render of the story. */}
        <ActivityTitle title="¿Quién es manipulador de alimentos?" onFinished={fn()} />
      </Positioned>
      <Hud />
    </SceneFrame>
  ),
}

export const Elements: Story = {
  name: 'Elementos sobre fondo cálido',
  render: () => (
    <SceneFrame heading="Elementos" visibleHeadingTop={40} background={fixtures.testDiningRoom} backgroundAlt="">
      <Positioned top={200} left={120}>
        <Button onClick={fn()}>Botón principal</Button>
      </Positioned>
      <Positioned top={200} left={760}>
        <Button variant="choice-negative" aria-label="NO" onClick={fn()}>
          NO
        </Button>
      </Positioned>
      <Positioned top={200} left={1120}>
        <Button variant="choice-positive" aria-label="SÍ" onClick={fn()}>
          SÍ
        </Button>
      </Positioned>
      <Positioned top={200} left={1500}>
        <IconButton icon="statement" label="Ver el enunciado" onClick={fn()} />
      </Positioned>
      <Positioned top={380} left={120}>
        <ChoiceCard name="demo" value="a" label="Femenino" checked onChange={fn()} />
      </Positioned>
      <Positioned top={380} left={600}>
        <ChoiceCard name="demo" value="b" label="Neutro" checked={false} onChange={fn()} />
      </Positioned>
      <Positioned top={420} left={1100} width={700}>
        <InlineAlert message="Elige una opción para continuar." />
      </Positioned>
      <Positioned top={640} left={120} width={1680}>
        <FeedbackPanel
          feedback={{ tone: 'positive', title: '¡Correcto!', message: 'Óscar es manipulador de alimentos porque, como cocinero, está en contacto directo con los alimentos.' }}
          closeLabel="Continuar"
          onClose={fn()}
        />
      </Positioned>
      <Positioned top={840} left={120} width={1680}>
        <NarrationBox>
          <Typewriter complete text="Panel del narrador: oscuro, para distinguirlo de lo que dicen los personajes." />
        </NarrationBox>
      </Positioned>
    </SceneFrame>
  ),
}
