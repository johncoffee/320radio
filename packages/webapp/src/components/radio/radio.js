import { html, render as litRender } from '../../../node_modules/lit-html/lit-html.js'

const myTemplate = ({title, artist}) => html`
<div class="">
    <h1><span class="media__title">${title}</span></h1>
    <h3><span class="media__title">by ${artist}</span></h3>
</div> 

<div class="margin-vertical-1">
  
<!--    <iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/640462086&color=0e141b"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/320colab" title="320colab" target="_blank" style="color: #cccccc; text-decoration: none;">320colab</a> · <a href="https://soundcloud.com/320colab/320-open-jam-june-15th" title="320 Open Jam June 15th" target="_blank" style="color: #cccccc; text-decoration: none;">320 Open Jam June 15th</a></div>-->
  <audio controls>
      <source type="audio/mp3"
       src="https://files.freemusicarchive.org/storage-freemusicarchive-org/music/WFMU/Broke_For_Free/Directionless_EP/Broke_For_Free_-_01_-_Night_Owl.mp3">
  </audio>

</div>
`;

export function play() {
  document.querySelector('audio').play()
}

export function render () {
  litRender(myTemplate({
    artist: 'Night Owl',
    title:"Broke For Free",
    // artist: '320',
    // title: "open jam june 15th",
  }), document.querySelector('.radio-component'))
}