import axios from 'axios'
import { combineEpics, Epic } from 'redux-observable'
import { from, of } from 'rxjs'
import { catchError, filter, map, mergeMap, startWith, switchMap } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import {
  addedProyectos,
  addingProyectos,
  addingProyectosFailed,
  editedProyectos,
  editingProyectos,
  editingProyectosFailed,
  foundProyectos,
  loadedProyectos,
  loadingProyectos,
  loadingProyectosFailed,
  ProyectosAction,
  ProyectosActionTypes,
  removedProyecto,
  removingProyecto,
  removingProyectoFailed,
  searchingProyectos,
  searchingProyectosFailed,
} from '../actions/proyectosActions'
import { IState } from '../reducers'
import { buildFormData } from './index'

const searchProyectosEpic: Epic<ProyectosAction, ProyectosAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(ProyectosActionTypes.SEARCH_PROYECTOS)),
    mergeMap((action) => {
      if (typeof action.searchOptions === 'string') {
        action.searchOptions = {
          searchString: action.searchOptions,
          page: 1,
          searchField: '_id',
        }
      }
      let url = `http://127.0.0.1:4567/api/proyectos/search/`
      return from(axios.get(url, { params: action.searchOptions })).pipe(
        map((response) => foundProyectos(response.data, action.keep)),
        startWith(searchingProyectos()),
        catchError(() => of(searchingProyectosFailed()))
      )
    })
  )

const loadProyectosEpic: Epic<ProyectosAction, ProyectosAction, IState> = (action$, state$) => {
  let responses = []
  return action$.pipe(
    filter(isOfType(ProyectosActionTypes.LOAD_PROYECTOS)),
    switchMap((action) => {
      let url = `http://127.0.0.1:4567/api/proyectos/`
      return from(axios.get(url, { params: action.loadOptions })).pipe(
        map((response) => loadedProyectos(response.data)),
        startWith(loadingProyectos()),
        catchError(() => of(loadingProyectosFailed()))
      )
    })
  )
}

const addProyectosEpic: Epic<ProyectosAction, ProyectosAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(ProyectosActionTypes.ADD_PROYECTOS)),

    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.post(`http://127.0.0.1:4567/api/proyectos/`, data, config)).pipe(
        map((response) => addedProyectos(response.data)),
        startWith(addingProyectos()),
        catchError((err) => of(addingProyectosFailed(err.response)))
      )
    })
  )

const removeProyectosEpic: Epic<ProyectosAction, ProyectosAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(ProyectosActionTypes.REMOVE_PROYECTO)),
    mergeMap((action) =>
      from(axios.delete(`http://127.0.0.1:4567/api/proyectos/${action.payload._id}`)).pipe(
        map((response) => removedProyecto()),
        startWith(removingProyecto()),
        catchError(() => of(removingProyectoFailed()))
      )
    )
  )

const editProyectosEpic: Epic<ProyectosAction, ProyectosAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(ProyectosActionTypes.EDIT_PROYECTOS)),
    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.put(`http://127.0.0.1:4567/api/proyectos/${action.payload._id}`, data, config)).pipe(
        map((response) => editedProyectos(response.data)),
        startWith(editingProyectos()),
        catchError(() => of(editingProyectosFailed()))
      )
    })
  )

export default combineEpics(searchProyectosEpic, loadProyectosEpic, addProyectosEpic, removeProyectosEpic, editProyectosEpic)
