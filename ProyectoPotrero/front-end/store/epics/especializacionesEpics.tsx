import axios from 'axios'
import { combineEpics, Epic } from 'redux-observable'
import { from, of } from 'rxjs'
import { catchError, filter, map, mergeMap, startWith, switchMap } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import {
  addedEspecializaciones,
  addingEspecializaciones,
  addingEspecializacionesFailed,
  editedEspecializaciones,
  editingEspecializaciones,
  editingEspecializacionesFailed,
  EspecializacionesAction,
  EspecializacionesActionTypes,
  foundEspecializaciones,
  loadedEspecializaciones,
  loadingEspecializaciones,
  loadingEspecializacionesFailed,
  removedEspecializacion,
  removingEspecializacion,
  removingEspecializacionFailed,
  searchingEspecializaciones,
  searchingEspecializacionesFailed,
} from '../actions/especializacionesActions'
import { IState } from '../reducers'
import { buildFormData } from './index'

const searchEspecializacionesEpic: Epic<EspecializacionesAction, EspecializacionesAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(EspecializacionesActionTypes.SEARCH_ESPECIALIZACIONES)),
    mergeMap((action) => {
      if (typeof action.searchOptions === 'string') {
        action.searchOptions = {
          searchString: action.searchOptions,
          page: 1,
          searchField: '_id',
        }
      }
      let url = `http://127.0.0.1:4567/api/especializaciones/search/`
      return from(axios.get(url, { params: action.searchOptions })).pipe(
        map((response) => foundEspecializaciones(response.data, action.keep)),
        startWith(searchingEspecializaciones()),
        catchError(() => of(searchingEspecializacionesFailed()))
      )
    })
  )

const loadEspecializacionesEpic: Epic<EspecializacionesAction, EspecializacionesAction, IState> = (action$, state$) => {
  let responses = []
  return action$.pipe(
    filter(isOfType(EspecializacionesActionTypes.LOAD_ESPECIALIZACIONES)),
    switchMap((action) => {
      let url = `http://127.0.0.1:4567/api/especializaciones/`
      return from(axios.get(url, { params: action.loadOptions })).pipe(
        map((response) => loadedEspecializaciones(response.data)),
        startWith(loadingEspecializaciones()),
        catchError(() => of(loadingEspecializacionesFailed()))
      )
    })
  )
}

const addEspecializacionesEpic: Epic<EspecializacionesAction, EspecializacionesAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(EspecializacionesActionTypes.ADD_ESPECIALIZACIONES)),

    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.post(`http://127.0.0.1:4567/api/especializaciones/`, data, config)).pipe(
        map((response) => addedEspecializaciones(response.data)),
        startWith(addingEspecializaciones()),
        catchError((err) => of(addingEspecializacionesFailed(err.response)))
      )
    })
  )

const removeEspecializacionesEpic: Epic<EspecializacionesAction, EspecializacionesAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(EspecializacionesActionTypes.REMOVE_ESPECIALIZACION)),
    mergeMap((action) =>
      from(axios.delete(`http://127.0.0.1:4567/api/especializaciones/${action.payload._id}`)).pipe(
        map((response) => removedEspecializacion()),
        startWith(removingEspecializacion()),
        catchError(() => of(removingEspecializacionFailed()))
      )
    )
  )

const editEspecializacionesEpic: Epic<EspecializacionesAction, EspecializacionesAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(EspecializacionesActionTypes.EDIT_ESPECIALIZACIONES)),
    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.put(`http://127.0.0.1:4567/api/especializaciones/${action.payload._id}`, data, config)).pipe(
        map((response) => editedEspecializaciones(response.data)),
        startWith(editingEspecializaciones()),
        catchError(() => of(editingEspecializacionesFailed()))
      )
    })
  )

export default combineEpics(
  searchEspecializacionesEpic,
  loadEspecializacionesEpic,
  addEspecializacionesEpic,
  removeEspecializacionesEpic,
  editEspecializacionesEpic
)
