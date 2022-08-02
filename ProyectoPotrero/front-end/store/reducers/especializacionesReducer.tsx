import produce from 'immer'
import { EspecializacionesAction, EspecializacionesActionTypes } from '../actions/especializacionesActions'
import { ApiStatus, IEspecializacionesItem } from '../models'

export const initialEspecializacionesState: IEspecializacionesState = {
  loadingStatus: ApiStatus.NOTLOADED,
  addingStatus: ApiStatus.NOTLOADED,
  searchingStatus: ApiStatus.NOTLOADED,
  searchString: '',
  especializaciones: [],
  foundespecializaciones: [],
  totalDocs: 0,
  errMessage: '',
  errStatus: null,
  errField: null,
}

export default function especializacionesReducer(state: IEspecializacionesState = initialEspecializacionesState, action: EspecializacionesAction) {
  return produce(state, (draft) => {
    switch (action.type) {
      case EspecializacionesActionTypes.SEARCH_ESPECIALIZACIONES:
        draft.searchString = action.searchOptions.searchString
        break
      case EspecializacionesActionTypes.SEARCHING_ESPECIALIZACIONES:
        draft.searchingStatus = ApiStatus.LOADING
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.NOTLOADED
        break

      case EspecializacionesActionTypes.SEARCHING_ESPECIALIZACIONES_FAILED:
        draft.searchingStatus = ApiStatus.FAILED
        break

      case EspecializacionesActionTypes.FOUND_ESPECIALIZACIONES:
        draft.searchingStatus = ApiStatus.LOADED
        action.keep
          ? draft.foundespecializaciones.push(...action.payload.especializaciones.docs)
          : (draft.foundespecializaciones = action.payload.especializaciones.docs)
        draft.totalDocs = action.payload.especializaciones.totalDocs
        break

      case EspecializacionesActionTypes.LOAD_ESPECIALIZACIONES:
      case EspecializacionesActionTypes.LOADING_ESPECIALIZACIONES:
        draft.loadingStatus = ApiStatus.LOADING
        draft.addingStatus = ApiStatus.NOTLOADED
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.foundespecializaciones = []
        break

      case EspecializacionesActionTypes.LOADING_ESPECIALIZACIONES_FAILED:
        draft.loadingStatus = ApiStatus.FAILED
        break

      case EspecializacionesActionTypes.LOADED_ESPECIALIZACIONES:
        draft.loadingStatus = ApiStatus.LOADED
        draft.especializaciones = action.payload.especializaciones.docs
        draft.totalDocs = action.payload.especializaciones.totalDocs
        break

      case EspecializacionesActionTypes.ADD_ESPECIALIZACIONES:
      case EspecializacionesActionTypes.ADDING_ESPECIALIZACIONES:
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.errMessage = ''
        draft.errStatus = null
        draft.errField = null
        break

      case EspecializacionesActionTypes.ADDING_ESPECIALIZACIONES_FAILED:
        draft.addingStatus = ApiStatus.FAILED
        draft.errMessage = action.message
        draft.errStatus = action.status
        draft.errField = action.field
        break

      case EspecializacionesActionTypes.ADDED_ESPECIALIZACIONES:
        draft.addingStatus = ApiStatus.LOADED
        draft.errStatus = 200
        draft.especializaciones.push(action.payload.especializaciones.docs[0])
        if (draft.searchString) draft.foundespecializaciones.push(action.payload.especializaciones.docs[0])
        break

      case EspecializacionesActionTypes.REMOVE_ESPECIALIZACION:
        draft.especializaciones.splice(
          draft.especializaciones.findIndex((especializacion) => especializacion._id === action.payload._id),
          1
        )
        break

      case EspecializacionesActionTypes.EDIT_ESPECIALIZACIONES:
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.especializaciones[draft.especializaciones.findIndex((especializacion) => especializacion._id === action.payload._id)] = action.payload
        break

      case EspecializacionesActionTypes.EDITED_ESPECIALIZACIONES:
        draft.addingStatus = ApiStatus.LOADED
        draft.especializaciones[draft.especializaciones.findIndex((especializacion) => especializacion._id === action.payload._id)] = action.payload
        draft.foundespecializaciones[draft.foundespecializaciones.findIndex((especializacion) => especializacion._id === action.payload._id)] =
          action.payload
        break
    }
  })
}

export interface IEspecializacionesState {
  loadingStatus: ApiStatus
  addingStatus: ApiStatus
  searchingStatus: ApiStatus
  searchString: string
  especializaciones: IEspecializacionesItem[]
  foundespecializaciones: IEspecializacionesItem[]
  totalDocs: number
  errMessage?: string
  errStatus?: number
  errField?: string
}
