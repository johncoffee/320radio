import { html, render as litRender } from '../../../node_modules/lit-html/lit-html.js'
import { showPage } from '../../router.js'
import { play } from '../radio/radio.js'
import { setTrack } from '../../state-store.js'
import { skipTrack } from '../../state-store.js'
import { gatewayHost } from '../../settings.js'

const artists = [
  {
    name: "DJ Derp",
    social: {
      Soundcloud: "http://soundcloud.com",
      Bandcamp: "http://bandcamp.com",
    },
  },
]

function back() {
  showPage('.page-radio')
}

const myTemplate = ({ artists }) => html`
<div>
    <p><button class="button clear" @click=${back}>BACK</button></p>
    ${artists.map(({name, social}) => html`
      <p style="font-size:1.35rem">${name}     
      
      ${social && Object.entries(social).map(([name, link]) => html`
        <a href="${link}">${name}</a>
      `)}
      </p>
    `)}        
</div>
`

export function render (props) {
  litRender(myTemplate(props), document.querySelector('.artists-list'))
}

export function connect(store) {
  render({ artists })

  store.subscribe(s => {

    let artists = new Map()

    s.playlist.playlist.forEach(item => {
      artists.set(item.artist, item)
    })

    artists = [...artists.values()].map(item => ({
      name: item.artist,
    }))

    render({
      artists,
    })
  })
}