import { html, render as litRender } from '../../../node_modules/lit-html/lit-html.js'
import { showPage } from '../../router.js'

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
    <div class="grid-x align-justify">
        <h4>ARTISTS</h4>
        <button class="button primary" @click=${back}>BACK</button>    
    </div>
    <hr>
   
    ${artists.map(({name, social}) => html`
      <p style="font-size:1.35rem">${name}     
      
      ${social && Object.entries(social).map(([name, link]) => html`
        <a href="${link}">${name}</a>
      `)}
      </p>
    `)}        

`

export function render (props) {
  litRender(myTemplate(props), document.querySelector('artists-list'))
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