import { html, render as litRender } from '../../../node_modules/lit-html/lit-html.js'
import { showPage } from '../../router.js'
import { play } from '../radio/radio.js'

function clicked() {
  showPage('.page-radio')
  play()
}

const myTemplate = () => html`
<div class="logo" style="cursor:pointer" @click=${clicked}></div>
`

export function render () {
  litRender(myTemplate(), document.querySelector('.start-logo'))
}

export function connect() {
  render()
}