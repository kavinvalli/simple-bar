import { ZoomIcon, MicOnIcon, MicOffIcon } from '../icons.jsx'

import { getSettings } from '../../settings'

export { ZoomStyles } from '../../styles/components/data/zoom'

const Zoom = ({ output }) => {
  const settings = getSettings()
  const { widgets, zoomWidgetOptions } = settings
  const { zoomWidget } = widgets
  const { showVideo, showMic } = zoomWidgetOptions

  if (!zoomWidget || (output.mic === '' && output.video === '')) return null

  const { mic, video } = output
  const MicIcon = mic === 'off' ? MicOffIcon : MicOnIcon
  return (
    <div className="zoom">
      {showVideo && <ZoomIcon className={`zoom__icon zoom__icon--${video}`} />}
      {showMic && <MicIcon className={`zoom__icon zoom__icon--${mic}`} />}
    </div>
  )
}

export default Zoom
