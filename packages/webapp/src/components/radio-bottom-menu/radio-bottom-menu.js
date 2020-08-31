import { html, render as litRender } from '../../../node_modules/lit-html/lit-html.js'
import { classMap } from '../../../node_modules/lit-html/directives/class-map.js'
import { showPage } from '../../router.js'
import { toggleFullScreen } from '../../state-store.js'

// import { first } from '../../../node_modules/rxjs/operators'

function artists () {
  showPage('.page-artists')
}

const myTemplate = ({ canFullScreen }) => {
  return html`
    <div>
        <button class="button primary small" @click=${artists}>ARTISTS</button>
        <button class="button primary small ${classMap({ hide: !canFullScreen })}" @click="${toggleFullScreen}">FULL SCREEN</button>
    </div>
  `
}

export function render (props) {
  litRender(myTemplate(props), document.querySelector('radio-bottom-menu'))
}

export function connect (store) {
  store.subscribe(s => {
    const { canFullScreen } = s
    render({ canFullScreen })
  })
}