import * as radio from './components/radio/radio.js'
import * as tip from './components/tip/tip.js'
import * as intro from './components/intro-page/logo.js'
import { createStore, setPage } from './state-store.js'
import { createRouter } from './router.js'
import { play } from './components/radio/radio.js'

const store = createStore()
// store.subscribe(s => console.log(s))

// init components

// intro.connect(store)
tip.connect(store)
radio.connect(store)

createRouter(store)

// default page
setPage(localStorage.lastPage || '.page-radio')
