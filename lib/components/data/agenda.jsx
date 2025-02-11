import * as Uebersicht from 'uebersicht'
import * as DataWidget from './data-widget.jsx'
import * as DataWidgetLoader from './data-widget-loader.jsx'
import * as Icons from '../icons.jsx'
import useWidgetRefresh from '../../hooks/use-widget-refresh'
import * as Utils from '../../utils'
import * as Settings from '../../settings'

export { agendaStyles as styles } from '../../styles/components/data/agenda'

const refreshFrequency = 60000

const settings = Settings.get()

export const Widget = () => {
  const { widgets, batteryWidgetOptions } = settings
  const { agendaWidget } = widgets

  const [state, setState] = Uebersicht.React.useState()
  const [loading, setLoading] = Uebersicht.React.useState(agendaWidget)

  const getEvent = async () => {
    const [event] = await Promise.all([
      Uebersicht.run(`/opt/homebrew/bin/i3-agenda -c $HOME/Code/for-i3-agenda.json -ttl 60 -i kavinvalli@gmail.com`)
    ])
    console.log(event)
    setState({
      event: event
    })
    setLoading(false)
  }

  useWidgetRefresh(agendaWidget, getEvent, refreshFrequency)

  if (loading) return <DataWidgetLoader.Widget className="agenda" />
  if (!state) return null

  const { event } = state

  return (
    <DataWidget.Widget classes="date-display" style={{ backgroundColor: 'var(--orange)' }} disableSlider={true}>
      {event}
    </DataWidget.Widget>
  )
}
