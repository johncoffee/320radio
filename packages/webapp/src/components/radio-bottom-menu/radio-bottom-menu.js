import { html, render as litRender } from '../../../node_modules/lit-html/lit-html.js'
import { showPage } from '../../router.js'

function artists() {
  showPage('.page-artists')
}

const myTemplate = () => html`
<div>
    <button class="button primary small" @click=${artists}>ARTISTS</button>
</div>
`

export function render (props) {
  litRender(myTemplate(props), document.querySelector('radio-bottom-menu'))
}

export function connect(store) {
  render({})
}