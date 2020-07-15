import { setPage } from './state-store.js'

export function showPage (selector) {
  setPage(selector)
}

function _showPage (selector) {
  console.log('route '+selector)
  Array.from(document.querySelectorAll('.page'))
    .forEach(el =>
      (el === document.querySelector(selector)) ? el.classList.remove('hide') : el.classList.add('hide'))
}

let lastPage

export function createRouter(state) {
  state.subscribe(({page}) => {
    lastPage = page
    _showPage(page)
  })
}