// import { Subject, Observable, isObservable, pipe } from '../node_modules/rxjs/dist/esm/'
// hacky import
const { Subject, Observable, isObservable, pipe } = window.rxjs
const { startWith, scan } = window.rxjs.operators

const initialState = {
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

export const SET_TRACK = 'SET_TRACK'
export const setTrack = actionCreator((payload) => ({
  type: SET_TRACK,
  payload
}))

export const SET_PAGE = 'SET_PAGE'
export const setPage = actionCreator((payload) => ({
  type: SET_PAGE,
  payload
}))

export function reducer(state, action) {
  console.log(action.type, state, action)
  switch (action.type) {
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
