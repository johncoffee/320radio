import { html, render as litRender } from '../../../node_modules/lit-html/lit-html.js'
import { gatewayHost } from '../../settings.js'
import { classMap } from '../../../node_modules/lit-html/directives/class-map.js'

export function connect (store) {
  store.subscribe(({ fullscreen }) => {
    render({
      bgVideo: gatewayHost + '/ipfs/QmS5TUNuNJW2ckNX6BZrufktGDvQaMyBBZXSDHEpfZ3ATH',
      enabled: fullscreen,
    })
  })
}

function render ({bgVideo, enabled}) {
  litRender(html`
  <div class="cover-video ${classMap({ hide: !enabled })}">
      <video src="${bgVideo}"
             class="cover-video__video"             
             muted loop autoplay
             type="video/mp4"></video>
  </div>
  `, document.querySelector('bg-video'))
  setBgVideo(enabled)
}

function setBgVideo(enabled) {
  const vid = document.querySelector('bg-video .cover-video__video')
  vid.muted = true // firefox fix
  if (enabled && !vid.playing) {
    vid.play()
  }
  else {
    vid.pause()
  }
}