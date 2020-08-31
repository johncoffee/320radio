// import { Subject, Observable, isObservable, pipe } from '../node_modules/rxjs/dist/esm/'
// hacky import
import { toggleFullScreenBrowser } from './facade.js'

const { Subject, Observable, isObservable, pipe } = window.rxjs
const { startWith, scan } = window.rxjs.operators

const initialState = {
  canFullScreen: window.innerHeight >= 768 && window.innerHeight < window.innerWidth, // TODO observe
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

export const actionCreator = (func) => (...args) => {
  const action = func.call(null, ...args)
  action$.next(action)
  if (isObservable(action.payload)) {
    action$.next(action.payload)
  }
  return action
}
export function actionCreator2 (func) {
  if (!func) {
    func = payload => ({payload})
  }
  const action = (...args) => {
    const actionObj = func.call(null, ...args)
    actionObj.type = func
    // push it to the stream
    action$.next(actionObj)
    return actionObj
  }

  return [action, func]
}

export const SET_PLAYLIST = 'SET_PLAYLIST'
export const setPlayList = actionCreator((payload) => ({
  type: SET_PLAYLIST,
  payload: Array.isArray(payload) ? payload.sort(() => Math.random() > 0.5 ? -1 : 1) : [],
}))

export const SET_TRACK = 'SET_TRACK'
export const setTrack = actionCreator((track) => {

  document.querySelector('.bgimg').style.backgroundImage = (track.coverImage) ? `url(${track.coverImage})` : ''
  if (track.meta && track.meta.coverCSS) {
    Object.entries(track.meta.coverCSS).forEach(([k,v]) => {
      document.querySelector('.bgimg').style[k] = v
    })
  }

  document.title = `${track.artist} - ${track.title} (at 320 radio)`

  return {
    type: SET_TRACK,
    payload: track
  }
})

export const SKIP_TRACK = 'SKIP_TRACK'
export const skipTrack = actionCreator((payload) => ({
  type: SKIP_TRACK,
  payload,
}))

export const [setPage, SET_PAGE] = actionCreator2()

export function reducer(state, action) {
  // console.log(action.type, state, action)
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
          playlist: action.payload,
          index: 0,
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
        track: action.payload
      }
    case SET_FULLSCREEN:
      return {
      ...state,
      fullscreen: action.payload
    }
    case TOGGLE_FULLSCREEN:
    default:
      return state
  }
}

// new actions add here
export const TOGGLE_FULLSCREEN = 'TOGGLE_FULLSCREEN'
export const toggleFullScreen = actionCreator(() => {
    toggleFullScreenBrowser()
      .then(res => setFullScreen(res))

    return {
      type: TOGGLE_FULLSCREEN,
    }
  }
)
export const SET_FULLSCREEN = 'SET_FULLSCREEN'
export const setFullScreen = actionCreator((enabled) => {
    return {
      type: SET_FULLSCREEN,
      payload: !!enabled
    }
  }
)

document.addEventListener('fullscreenerror', () => setFullScreen(!!document.fullscreenElement))
document.addEventListener('fullscreenchange', () => setFullScreen(!!document.fullscreenElement))
