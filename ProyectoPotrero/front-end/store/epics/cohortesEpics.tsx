import axios from 'axios'
import { combineEpics, Epic } from 'redux-observable'
import { from, of } from 'rxjs'
import { catchError, filter, map, mergeMap, startWith, switchMap } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import {
  addedCohortes,
  addingCohortes,
  addingCohortesFailed,
  CohortesAction,
  CohortesActionTypes,
  editedCohortes,
  editingCohortes,
  editingCohortesFailed,
  foundCohortes,
  loadedCohortes,
  loadingCohortes,
  loadingCohortesFailed,
  removedCohorte,
  removingCohorte,
  removingCohorteFailed,
  searchingCohortes,
  searchingCohortesFailed,
} from '../actions/cohortesActions'
import { IState } from '../reducers'
import { buildFormData } from './index'

const searchCohortesEpic: Epic<CohortesAction, CohortesAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(CohortesActionTypes.SEARCH_COHORTES)),
    mergeMap((action) => {
      if (typeof action.searchOptions === 'string') {
        action.searchOptions = {
          searchString: action.searchOptions,
          page: 1,
          searchField: '_id',
        }
      }
      let url = `http://127.0.0.1:4567/api/cohortes/search/`
      return from(axios.get(url, { params: action.searchOptions })).pipe(
        map((response) => foundCohortes(response.data, action.keep)),
        startWith(searchingCohortes()),
        catchError(() => of(searchingCohortesFailed()))
      )
    })
  )

const loadCohortesEpic: Epic<CohortesAction, CohortesAction, IState> = (action$, state$) => {
  let responses = []
  return action$.pipe(
    filter(isOfType(CohortesActionTypes.LOAD_COHORTES)),
    switchMap((action) => {
      let url = `http://127.0.0.1:4567/api/cohortes/`
      return from(axios.get(url, { params: action.loadOptions })).pipe(
        map((response) => loadedCohortes(response.data)),
        startWith(loadingCohortes()),
        catchError(() => of(loadingCohortesFailed()))
      )
    })
  )
}

const addCohortesEpic: Epic<CohortesAction, CohortesAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(CohortesActionTypes.ADD_COHORTES)),

    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.post(`http://127.0.0.1:4567/api/cohortes/`, data, config)).pipe(
        map((response) => addedCohortes(response.data)),
        startWith(addingCohortes()),
        catchError((err) => of(addingCohortesFailed(err.response)))
      )
    })
  )

const removeCohortesEpic: Epic<CohortesAction, CohortesAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(CohortesActionTypes.REMOVE_COHORTE)),
    mergeMap((action) =>
      from(axios.delete(`http://127.0.0.1:4567/api/cohortes/${action.payload._id}`)).pipe(
        map((response) => removedCohorte()),
        startWith(removingCohorte()),
        catchError(() => of(removingCohorteFailed()))
      )
    )
  )

const editCohortesEpic: Epic<CohortesAction, CohortesAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(CohortesActionTypes.EDIT_COHORTES)),
    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.put(`http://127.0.0.1:4567/api/cohortes/${action.payload._id}`, data, config)).pipe(
        map((response) => editedCohortes(response.data)),
        startWith(editingCohortes()),
        catchError(() => of(editingCohortesFailed()))
      )
    })
  )

export default combineEpics(searchCohortesEpic, loadCohortesEpic, addCohortesEpic, removeCohortesEpic, editCohortesEpic)
