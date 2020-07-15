import { render as radio } from './components/radio/radio.js'
import { render as tip } from './components/tip/tip.js'
import { render as intro } from './components/intro-page/logo.js'
import { createStore, setPage } from './state-store.js'
import { createRouter } from './router.js'

const store = createStore()
store.subscribe(s => console.log(s))

createRouter(store)

setPage('.page-intro')

radio()
tip()
intro()