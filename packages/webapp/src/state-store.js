// import { Subject, Observable, isObservable, pipe } from '../node_modules/rxjs/dist/esm/'
// hacky import
import { toggleFullScreenBrowser } from './facade.js'
import { gatewayHost } from './settings.js'

const { Subject, fromEvent, merge } = window.rxjs
const { startWith, scan, debounceTime, map } = window.rxjs.operators

const initialState = {
  canFullScreen: false,
  fullscreen: false,
  playlist: {
    playlist: [],
    index: 0,
  },
  track: {},
  page: '',
}

// private!
const action$ = new Subject()

export function createStore (initState = initialState) {
  const next = action$
    // .flatMap((action) => isObservable(action) ? action : Observable.from([action]))
    .pipe(startWith(initState))
    .pipe(scan(reducer))

  return next
}

export function actionCreator2 (func) {
  if (!func) {
    func = payload => ({payload})
  }
  const action = (...args) => {
    const actionObj = func.call(null, ...args)
    console.assert(actionObj.type === undefined, `must not have field .type set`)
    actionObj.type = func
    // push it to the stream
    action$.next(actionObj)
    return actionObj
  }

  return [action, func]
}

export const [setCanFullScreen, SET_CAN_FULLSCREEN] = actionCreator2()

export const [setPlayList, SET_PLAYLIST] = actionCreator2((payload, index = 0) => ({
  playlist: Array.isArray(payload) ? payload.sort(() => Math.random() > 0.5 ? -1 : 1) : [],
  index,
}))

export const [setTrack, SET_TRACK] = actionCreator2((track) => {
  const el = document.querySelector('.bgimg')
  el.style.backgroundImage = (track.coverImage) ? `url("${gatewayHost}${track.coverImage}")` : 'none'

  if (typeof track.coverImageStyle === 'object') {
    Object.entries(track.coverImageStyle).forEach(([k,v]) => {
      el.style[k] = v
    })
  }

  document.title = `${track.artist} - ${track.title} (at 320 radio)`

  return {
    track
  }
})

export const [skipTrack, SKIP_TRACK] = actionCreator2()

export const [setPage, SET_PAGE] = actionCreator2()

export function reducer(state, action) {
  switch (action.type) {
    case SKIP_TRACK:
      state.playlist.index = action.payload
      return {
        ...state,
      }
    case SET_PLAYLIST:
      return {
        ...state,
        playlist: {
          playlist: action.playlist,
          index: action.index,
        }
      }
    case SET_PAGE:
      return {
        ...state,
        page: action.payload,
      }
    case SET_TRACK:
      return {
        ...state,
        track: action.track
      }
    case SET_FULLSCREEN:
      console.log(action.type, state, action)
      return {
      ...state,
      fullscreen: action.payload
    }

    case SET_CAN_FULLSCREEN:
      return {
        ...state,
        canFullScreen: action.payload,
      }
    default:
      return state
  }
}

// new actions add here
export const [toggleFullScreen, TOGGLE_FULLSCREEN] = actionCreator2(() => {
    toggleFullScreenBrowser()
      .then(res => setFullScreen(res))
    return {}
  }
)

export const [setFullScreen, SET_FULLSCREEN] = actionCreator2()

merge(
    fromEvent(document, 'fullscreenerror'),
    fromEvent(document, 'fullscreenchange'),
  )
  .pipe(map( () => !!document.fullscreenElement) )
  .subscribe(setFullScreen)

fromEvent(window, 'resize')
  .pipe(
    map(evt => evt.target),
    startWith(window),
    debounceTime(100),
    map(window => window.outerHeight >= 768 && window.outerHeight < window.outerWidth),
  )
  .subscribe(setCanFullScreen)