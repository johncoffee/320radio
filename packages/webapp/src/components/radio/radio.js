import { html, render as litRender } from '../../../node_modules/lit-html/lit-html.js'
import {styleMap} from '../../../node_modules/lit-html/directives/style-map.js'
import { setTrack } from '../../state-store.js'
import { setPlayList } from '../../state-store.js'
import { skipTrack } from '../../state-store.js'

const gatewayHost = "http://127.0.0.1:8080"

const myTemplate = ({ title, artist, mp3, skip, onPause,}) => html`
<div class="">
    <h1><span class="media__title">${title}</span></h1>
    <h3><span class="media__title">by ${artist}</span></h3>
</div> 

<div class="margin-vertical-1">
  
<!--    <iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/640462086&color=0e141b"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/320colab" title="320colab" target="_blank" style="color: #cccccc; text-decoration: none;">320colab</a> · <a href="https://soundcloud.com/320colab/320-open-jam-june-15th" title="320 Open Jam June 15th" target="_blank" style="color: #cccccc; text-decoration: none;">320 Open Jam June 15th</a></div>-->
  <audio controls autoplay style="vertical-align: middle" @pause="${onPause}" src="${mp3}" preload="auto"></audio>
  <button class="button primary margin-0" style="vertical-align: middle" @click="${()=>skip(mp3)}">MEH..</button>

</div>
`

// TODO inject dispatcher
export function connect (store) {

  store.subscribe(s => {
    const skip = (skippedTrack) => {
      console.log('meh',skippedTrack)
      const nextIndex = (s.playlist.index+1 >= s.playlist.playlist.length) ? 0 : s.playlist.index+1;
      const track = s.playlist.playlist[nextIndex]
      console.log(track)
      setTrack(track)
      skipTrack(nextIndex)
      // move to reducer
    }
    const onPause = evt => {
      if (evt.target.duration - evt.target.currentTime < 1) {
        skip()
      }
    }

    // TODO
    // const coverImg = styleMap({
    //   backgroundImage: (s.track.coverImage) ? `url(${s.track.coverImage})` : 'none'
    // })

    render({
      // coverImg,
      onPause,
      skip,
      ...s.playlist,
      ...s.track,
      mp3: gatewayHost + s.track.mp3, // fix url
    })
  })
}

// super high level functions

export const defaultPl = [
  {
    artist: 'Turing',
    title: 'Stutter',
    mp3: '//127.0.0.1:8080/ipfs/QmPTjFUhaufnctdxSv8oThzvFrnNookD57q99GpkW5Db6g/Turing - Stutter-839941489.mp3',
  },
  {
    artist: 'Deus Verres',
    title: 'Check',
    mp3: '//127.0.0.1:8080/ipfs/QmPTjFUhaufnctdxSv8oThzvFrnNookD57q99GpkW5Db6g/Deus Verres - Check-812676751.mp3',
    coverImage: '//127.0.0.1:8080/ipfs/QmPTjFUhaufnctdxSv8oThzvFrnNookD57q99GpkW5Db6g/the-new-york-public-library-YTfgJ8LJaB0-unsplash.jpg',
    meta: {
      coverCSS: {
        backgroundPosition: 'center',
      }
    }
}]

export async function playDefaultList () {
  try {
    const res = await fetch("src/data/playlist.json")
    const json = JSON.parse(await res.text()) // parse text because we dont know if the mime type would be set correct
    setPlayList(json)
    setTrack(json[0])
    return
  }
  catch (e) {

  }

  setPlayList(defaultPl)
  setTrack(defaultPl[0])
}

export function render (track) {
  litRender(myTemplate(track), document.querySelector('.radio-component'))
}

export function play () {
  console.log("nay ")
}