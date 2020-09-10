import { html, render as litRender } from '../../../node_modules/lit-html/lit-html.js'

export function connect (store) {
  setBgVideo(true)
  store.subscribe(({ fullscreen }) => setBgVideo(fullscreen))
}

function render () {
}

function setBgVideo(enabled) {
  const con = document.querySelector('.cover-video')
  const vid = con.querySelector('.cover-video__video')
  if (enabled) {
    con.classList.remove('hide')
    vid.play()
  }
  else {
    con.classList.add('hide')
    vid.pause()
  }
}