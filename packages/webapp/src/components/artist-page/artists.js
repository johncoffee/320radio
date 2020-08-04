import { html, render as litRender } from '../../../node_modules/lit-html/lit-html.js'
import { showPage } from '../../router.js'
import { play } from '../radio/radio.js'

const artists = [
  {
    name: "DJ Derp",
    social: {
      Soundcloud: "http://soundcloud.com",
      Bandcamp: "http://bandcamp.com",
    },
  },
]

const myTemplate = ({ artists }) => html`
<div>
    <p>All artists</p>
    
    ${artists.map(({name, social}) => html`
      <p>${name}     
      ${Object.entries(social).map(([name, link]) => html`
        <a href="${link}">${name}</a>
      `)}
      </p>
    `)}        
</div>
`

export function render () {
  litRender(myTemplate({ artists }), document.querySelector('.artists-list'))
}

export function connect() {
  render()
}