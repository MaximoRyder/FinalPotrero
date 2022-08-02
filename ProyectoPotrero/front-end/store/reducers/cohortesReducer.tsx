import produce from 'immer'
import { CohortesAction, CohortesActionTypes } from '../actions/cohortesActions'
import { ApiStatus, ICohortesItem } from '../models'

export const initialCohortesState: ICohortesState = {
  loadingStatus: ApiStatus.NOTLOADED,
  addingStatus: ApiStatus.NOTLOADED,
  searchingStatus: ApiStatus.NOTLOADED,
  searchString: '',
  cohortes: [],
  foundcohortes: [],
  totalDocs: 0,
  errMessage: '',
  errStatus: null,
  errField: null,
}

export default function cohortesReducer(state: ICohortesState = initialCohortesState, action: CohortesAction) {
  return produce(state, (draft) => {
    switch (action.type) {
      case CohortesActionTypes.SEARCH_COHORTES:
        draft.searchString = action.searchOptions.searchString
        break
      case CohortesActionTypes.SEARCHING_COHORTES:
        draft.searchingStatus = ApiStatus.LOADING
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.NOTLOADED
        break

      case CohortesActionTypes.SEARCHING_COHORTES_FAILED:
        draft.searchingStatus = ApiStatus.FAILED
        break

      case CohortesActionTypes.FOUND_COHORTES:
        draft.searchingStatus = ApiStatus.LOADED
        action.keep ? draft.foundcohortes.push(...action.payload.cohortes.docs) : (draft.foundcohortes = action.payload.cohortes.docs)
        draft.totalDocs = action.payload.cohortes.totalDocs
        break

      case CohortesActionTypes.LOAD_COHORTES:
      case CohortesActionTypes.LOADING_COHORTES:
        draft.loadingStatus = ApiStatus.LOADING
        draft.addingStatus = ApiStatus.NOTLOADED
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.foundcohortes = []
        break

      case CohortesActionTypes.LOADING_COHORTES_FAILED:
        draft.loadingStatus = ApiStatus.FAILED
        break

      case CohortesActionTypes.LOADED_COHORTES:
        draft.loadingStatus = ApiStatus.LOADED
        draft.cohortes = action.payload.cohortes.docs
        draft.totalDocs = action.payload.cohortes.totalDocs
        break

      case CohortesActionTypes.ADD_COHORTES:
      case CohortesActionTypes.ADDING_COHORTES:
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.errMessage = ''
        draft.errStatus = null
        draft.errField = null
        break

      case CohortesActionTypes.ADDING_COHORTES_FAILED:
        draft.addingStatus = ApiStatus.FAILED
        draft.errMessage = action.message
        draft.errStatus = action.status
        draft.errField = action.field
        break

      case CohortesActionTypes.ADDED_COHORTES:
        draft.addingStatus = ApiStatus.LOADED
        draft.errStatus = 200
        draft.cohortes.push(action.payload.cohortes.docs[0])
        if (draft.searchString) draft.foundcohortes.push(action.payload.cohortes.docs[0])
        break

      case CohortesActionTypes.REMOVE_COHORTE:
        draft.cohortes.splice(
          draft.cohortes.findIndex((cohorte) => cohorte._id === action.payload._id),
          1
        )
        break

      case CohortesActionTypes.EDIT_COHORTES:
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.cohortes[draft.cohortes.findIndex((cohorte) => cohorte._id === action.payload._id)] = action.payload
        break

      case CohortesActionTypes.EDITED_COHORTES:
        draft.addingStatus = ApiStatus.LOADED
        draft.cohortes[draft.cohortes.findIndex((cohorte) => cohorte._id === action.payload._id)] = action.payload
        draft.foundcohortes[draft.foundcohortes.findIndex((cohorte) => cohorte._id === action.payload._id)] = action.payload
        break
    }
  })
}

export interface ICohortesState {
  loadingStatus: ApiStatus
  addingStatus: ApiStatus
  searchingStatus: ApiStatus
  searchString: string
  cohortes: ICohortesItem[]
  foundcohortes: ICohortesItem[]
  totalDocs: number
  errMessage?: string
  errStatus?: number
  errField?: string
}
