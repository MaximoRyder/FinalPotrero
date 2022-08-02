import produce from 'immer'
import { ProyectosAction, ProyectosActionTypes } from '../actions/proyectosActions'
import { ApiStatus, IProyectosItem } from '../models'

export const initialProyectosState: IProyectosState = {
  loadingStatus: ApiStatus.NOTLOADED,
  addingStatus: ApiStatus.NOTLOADED,
  searchingStatus: ApiStatus.NOTLOADED,
  searchString: '',
  proyectos: [],
  foundproyectos: [],
  totalDocs: 0,
  errMessage: '',
  errStatus: null,
  errField: null,
}

export default function proyectosReducer(state: IProyectosState = initialProyectosState, action: ProyectosAction) {
  return produce(state, (draft) => {
    switch (action.type) {
      case ProyectosActionTypes.SEARCH_PROYECTOS:
        draft.searchString = action.searchOptions.searchString
        break
      case ProyectosActionTypes.SEARCHING_PROYECTOS:
        draft.searchingStatus = ApiStatus.LOADING
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.NOTLOADED
        break

      case ProyectosActionTypes.SEARCHING_PROYECTOS_FAILED:
        draft.searchingStatus = ApiStatus.FAILED
        break

      case ProyectosActionTypes.FOUND_PROYECTOS:
        draft.searchingStatus = ApiStatus.LOADED
        action.keep ? draft.foundproyectos.push(...action.payload.proyectos.docs) : (draft.foundproyectos = action.payload.proyectos.docs)
        draft.totalDocs = action.payload.proyectos.totalDocs
        break

      case ProyectosActionTypes.LOAD_PROYECTOS:
      case ProyectosActionTypes.LOADING_PROYECTOS:
        draft.loadingStatus = ApiStatus.LOADING
        draft.addingStatus = ApiStatus.NOTLOADED
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.foundproyectos = []
        break

      case ProyectosActionTypes.LOADING_PROYECTOS_FAILED:
        draft.loadingStatus = ApiStatus.FAILED
        break

      case ProyectosActionTypes.LOADED_PROYECTOS:
        draft.loadingStatus = ApiStatus.LOADED
        draft.proyectos = action.payload.proyectos.docs
        draft.totalDocs = action.payload.proyectos.totalDocs
        break

      case ProyectosActionTypes.ADD_PROYECTOS:
      case ProyectosActionTypes.ADDING_PROYECTOS:
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.errMessage = ''
        draft.errStatus = null
        draft.errField = null
        break

      case ProyectosActionTypes.ADDING_PROYECTOS_FAILED:
        draft.addingStatus = ApiStatus.FAILED
        draft.errMessage = action.message
        draft.errStatus = action.status
        draft.errField = action.field
        break

      case ProyectosActionTypes.ADDED_PROYECTOS:
        draft.addingStatus = ApiStatus.LOADED
        draft.errStatus = 200
        draft.proyectos.push(action.payload.proyectos.docs[0])
        if (draft.searchString) draft.foundproyectos.push(action.payload.proyectos.docs[0])
        break

      case ProyectosActionTypes.REMOVE_PROYECTO:
        draft.proyectos.splice(
          draft.proyectos.findIndex((proyecto) => proyecto._id === action.payload._id),
          1
        )
        break

      case ProyectosActionTypes.EDIT_PROYECTOS:
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.proyectos[draft.proyectos.findIndex((proyecto) => proyecto._id === action.payload._id)] = action.payload
        break

      case ProyectosActionTypes.EDITED_PROYECTOS:
        draft.addingStatus = ApiStatus.LOADED
        draft.proyectos[draft.proyectos.findIndex((proyecto) => proyecto._id === action.payload._id)] = action.payload
        draft.foundproyectos[draft.foundproyectos.findIndex((proyecto) => proyecto._id === action.payload._id)] = action.payload
        break
    }
  })
}

export interface IProyectosState {
  loadingStatus: ApiStatus
  addingStatus: ApiStatus
  searchingStatus: ApiStatus
  searchString: string
  proyectos: IProyectosItem[]
  foundproyectos: IProyectosItem[]
  totalDocs: number
  errMessage?: string
  errStatus?: number
  errField?: string
}
