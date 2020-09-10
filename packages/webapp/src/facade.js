import { setTrack } from './state-store.js'
import { defaultPlaylist } from './settings.js'
import { setPlayList } from './state-store.js'

export async function playDefaultList () {
  setTrack({title: "Loading...", artist: 'IPFS'})
  try {
    const res = await fetch(defaultPlaylist)
    const json = JSON.parse(await res.text()) // parse text because we dont know if the mime type would be set correct
    if (!json[0]) {
      return console.warn('playlist was empty!')
    }
    setPlayList(json)
    setTrack(json[0])
  }
  catch (e) {
    console.warn('failed getting playlist')
    console.warn(e)
  }
}

export async function toggleFullScreenBrowser (enable) {
  if (!document.fullscreenElement || enable === true) {
    try {
      await document.querySelector('html').requestFullscreen()
    }
    catch {
      return false
    }
    return true
  }

  await document.exitFullscreen()
  return false
}
