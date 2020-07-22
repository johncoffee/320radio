import { html, render as litRender } from '../../../node_modules/lit-html/lit-html.js'
import { setTrack } from '../../state-store.js'

const myTemplate = ({ title, artist, mp3 }) => html`
<div class="">
    <h1><span class="media__title">${title}</span></h1>
    <h3><span class="media__title">by ${artist}</span></h3>
</div> 

<div class="margin-vertical-1">
  
<!--    <iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/640462086&color=0e141b"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/320colab" title="320colab" target="_blank" style="color: #cccccc; text-decoration: none;">320colab</a> · <a href="https://soundcloud.com/320colab/320-open-jam-june-15th" title="320 Open Jam June 15th" target="_blank" style="color: #cccccc; text-decoration: none;">320 Open Jam June 15th</a></div>-->
  <audio controls style="vertical-align: middle" @pause="${onPause}" @timeupdate="${ontimeupdate}">
      <source type="audio/mp3" src="${mp3}">
  </audio>
  <button class="button primary margin-0" style="vertical-align: middle" >NEXT</button>

</div>
`

function onPause (evt) {
  // console.log(evt)
  if (evt.target.duration-evt.target.currentTime < 1) {
    console.log('next!')
  }
}

function ontimeupdate (evt) {
  // console.log(evt)
}

export function connect (store) {
  store.subscribe(s => {
    render(s.track)

    document.querySelector('.bgimg').style.backgroundImage = (s.track.coverImage) ?
      `url(${s.track.coverImage})` : 'none'

    // default track
    if (!s.track.mp3) {
      play()
    }
  })
}

// super high level functions

export function play () {
  setTrack({
    artist: 'Turing',
    title: 'Stutter',
    mp3: '//127.0.0.1:8080/ipfs/QmPTjFUhaufnctdxSv8oThzvFrnNookD57q99GpkW5Db6g/Turing - Stutter-839941489.mp3',
    coverImage: "//127.0.0.1:8080/ipfs/QmPTjFUhaufnctdxSv8oThzvFrnNookD57q99GpkW5Db6g/rafael-romero-8yaG5_PUz9s-unsplash.jpg",
    // artist: '320',
    // title: "open jam june 15th",
  })
}

export function render (track) {
  litRender(myTemplate(track), document.querySelector('.radio-component'))
}