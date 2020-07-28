// import { Subject, Observable, isObservable, pipe } from '../node_modules/rxjs/dist/esm/'
// hacky import
const { Subject, Observable, isObservable, pipe } = window.rxjs
const { startWith, scan } = window.rxjs.operators

const initialState = {
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

  document.title = `${track.artist} - ${track.title}`

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

export const SET_PAGE = 'SET_PAGE'
export const setPage = actionCreator((payload) => ({
  type: SET_PAGE,
  payload
}))

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
    default:
      return state
  }
}
