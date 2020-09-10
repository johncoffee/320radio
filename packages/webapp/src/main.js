import * as bgVideo from './components/bg-video/bg-video.js'
import * as radio from './components/radio/radio.js'
import * as tip from './components/tip/tip.js'
import * as bottom from './components/radio-bottom-menu/radio-bottom-menu.js'
import { createStore, setPage } from './state-store.js'
import { createRouter } from './router.js'
import * as artists from './components/artist-page/artists.js'
import { playDefaultList } from './facade.js'

const store = createStore()
// store.subscribe(s => console.log(s))

// init components

tip.connect(store)
radio.connect(store)
artists.connect(store)
bottom.connect(store)
bgVideo.connect(store)

createRouter(store)

// default page
setPage(localStorage.lastPage || '.page-radio')

playDefaultList()