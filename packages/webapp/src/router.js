import { setPage } from './state-store.js'
const { filter } = window.rxjs.operators

export function showPage (selector) {
  setPage(selector)
}

function _showPage (selector) {
  Array.from(document.querySelectorAll('.page'))
    .forEach(el => el.classList.add('hide'))
  document.querySelector(selector).classList.remove('hide')
}


export function createRouter(state) {
  state.pipe(filter(s => !!s.page)).subscribe(({page}) => {
    _showPage(page)
    localStorage.lastPage = page
  })
}