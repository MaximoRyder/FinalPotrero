import { IEspecializacionesItem, IpaginatedEspecializaciones } from '../models'

export enum EspecializacionesActionTypes {
  SEARCH_ESPECIALIZACIONES = 'especializaciones/search',
  SEARCHING_ESPECIALIZACIONES = 'especializaciones/searching',
  FOUND_ESPECIALIZACIONES = 'especializaciones/found',
  SEARCHING_ESPECIALIZACIONES_FAILED = 'especializaciones/searching_failed',

  LOAD_ESPECIALIZACIONES = 'especializaciones/load',
  LOADING_ESPECIALIZACIONES = 'especializaciones/loading',
  LOADED_ESPECIALIZACIONES = 'especializaciones/loaded',
  LOADING_ESPECIALIZACIONES_FAILED = 'especializaciones/loading_failed',

  ADD_ESPECIALIZACIONES = 'especializaciones/add',
  ADDING_ESPECIALIZACIONES = 'especializaciones/adding',
  ADDED_ESPECIALIZACIONES = 'especializaciones/added',
  ADDING_ESPECIALIZACIONES_FAILED = 'especializaciones/adding_failed',

  REMOVE_ESPECIALIZACION = 'especializaciones/remove',
  REMOVING_ESPECIALIZACION = 'especializaciones/removing',
  REMOVED_ESPECIALIZACION = 'especializaciones/removed',
  REMOVING_ESPECIALIZACION_FAILED = 'especializaciones/removing_failed',

  EDIT_ESPECIALIZACIONES = 'especializaciones/edit',
  EDITING_ESPECIALIZACIONES = 'especializaciones/editing',
  EDITED_ESPECIALIZACIONES = 'especializaciones/edited',
  EDITING_ESPECIALIZACIONES_FAILED = 'especializaciones/editing_failed',
}

export function searchEspecializaciones(searchOptions: TSearchOptions | string, keep?: boolean): ISearchEspecializacionesAction {
  return {
    type: EspecializacionesActionTypes.SEARCH_ESPECIALIZACIONES,
    searchOptions: typeof searchOptions === 'string' ? { searchString: searchOptions } : searchOptions,
    keep: keep,
  }
}

export function searchingEspecializaciones(): ISearchingEspecializacionesAction {
  return {
    type: EspecializacionesActionTypes.SEARCHING_ESPECIALIZACIONES,
  }
}

export function foundEspecializaciones(especializaciones: IpaginatedEspecializaciones, keep?: boolean): IFoundEspecializacionesAction {
  return {
    type: EspecializacionesActionTypes.FOUND_ESPECIALIZACIONES,
    keep: keep,
    payload: {
      especializaciones,
    },
  }
}

export function searchingEspecializacionesFailed(): ISearchingEspecializacionesFailedAction {
  return {
    type: EspecializacionesActionTypes.SEARCHING_ESPECIALIZACIONES_FAILED,
  }
}

export function loadEspecializaciones(loadOptions: TSearchOptions): ILoadEspecializacionesAction {
  return {
    type: EspecializacionesActionTypes.LOAD_ESPECIALIZACIONES,
    loadOptions: loadOptions,
  }
}

export function loadingEspecializaciones(): ILoadingEspecializacionesAction {
  return {
    type: EspecializacionesActionTypes.LOADING_ESPECIALIZACIONES,
  }
}

export function loadedEspecializaciones(especializaciones: IpaginatedEspecializaciones): ILoadedEspecializacionesAction {
  return {
    type: EspecializacionesActionTypes.LOADED_ESPECIALIZACIONES,
    payload: {
      especializaciones,
    },
  }
}

export function loadingEspecializacionesFailed(): ILoadingEspecializacionesFailedAction {
  return {
    type: EspecializacionesActionTypes.LOADING_ESPECIALIZACIONES_FAILED,
  }
}

export function addEspecializaciones(especializacion: IEspecializacionesItem): IAddEspecializacionesAction {
  return {
    type: EspecializacionesActionTypes.ADD_ESPECIALIZACIONES,
    payload: especializacion,
  }
}

export function addingEspecializaciones(): IAddingEspecializacionesAction {
  return {
    type: EspecializacionesActionTypes.ADDING_ESPECIALIZACIONES,
  }
}

export function addedEspecializaciones(especializaciones: IpaginatedEspecializaciones): IAddedEspecializacionesAction {
  return {
    type: EspecializacionesActionTypes.ADDED_ESPECIALIZACIONES,
    payload: {
      especializaciones,
    },
  }
}

export function addingEspecializacionesFailed(errData: {
  data: { message: string; field?: string }
  status: number
}): IAddingEspecializacionesFailedAction {
  return {
    type: EspecializacionesActionTypes.ADDING_ESPECIALIZACIONES_FAILED,
    message: errData.data.message,
    status: errData.status,
    field: errData.data.field,
  }
}

export function removeEspecializacion(especializacion: IEspecializacionesItem): IRemoveEspecializacionAction {
  return {
    type: EspecializacionesActionTypes.REMOVE_ESPECIALIZACION,
    payload: especializacion,
  }
}

export function removingEspecializacion(): IRemovingEspecializacionAction {
  return {
    type: EspecializacionesActionTypes.REMOVING_ESPECIALIZACION,
  }
}

export function removedEspecializacion(): IRemovedEspecializacionAction {
  return {
    type: EspecializacionesActionTypes.REMOVED_ESPECIALIZACION,
  }
}

export function removingEspecializacionFailed(): IRemovingEspecializacionFailedAction {
  return {
    type: EspecializacionesActionTypes.REMOVING_ESPECIALIZACION_FAILED,
  }
}

export function editEspecializaciones(especializacion: IEspecializacionesItem): IEditEspecializacionesAction {
  return {
    type: EspecializacionesActionTypes.EDIT_ESPECIALIZACIONES,
    payload: especializacion,
  }
}

export function editingEspecializaciones(): IEditingEspecializacionesAction {
  return {
    type: EspecializacionesActionTypes.EDITING_ESPECIALIZACIONES,
  }
}

export function editedEspecializaciones(especializaciones: IEspecializacionesItem): IEditedEspecializacionesAction {
  return {
    type: EspecializacionesActionTypes.EDITED_ESPECIALIZACIONES,
    payload: especializaciones,
  }
}

export function editingEspecializacionesFailed(): IEditingEspecializacionesFailedAction {
  return {
    type: EspecializacionesActionTypes.EDITING_ESPECIALIZACIONES_FAILED,
  }
}

type TSearchOptions = {
  searchString?: string
  searchField?: string
  page?: number
  limit?: number
  populate?: boolean
  sort?: {
    field: string
    method?: 'asc' | 'desc'
  }
  filters?: { field: string; value: string }[]
}

export interface ISearchEspecializacionesAction {
  type: EspecializacionesActionTypes.SEARCH_ESPECIALIZACIONES
  searchOptions: TSearchOptions
  keep?: boolean
}

export interface ISearchingEspecializacionesAction {
  type: EspecializacionesActionTypes.SEARCHING_ESPECIALIZACIONES
}

export interface IFoundEspecializacionesAction {
  type: EspecializacionesActionTypes.FOUND_ESPECIALIZACIONES
  keep?: boolean
  payload: {
    especializaciones: IpaginatedEspecializaciones
  }
}

export interface ISearchingEspecializacionesFailedAction {
  type: EspecializacionesActionTypes.SEARCHING_ESPECIALIZACIONES_FAILED
}

export interface ILoadEspecializacionesAction {
  type: EspecializacionesActionTypes.LOAD_ESPECIALIZACIONES
  loadOptions: TSearchOptions
}

export interface ILoadingEspecializacionesAction {
  type: EspecializacionesActionTypes.LOADING_ESPECIALIZACIONES
}

export interface ILoadedEspecializacionesAction {
  type: EspecializacionesActionTypes.LOADED_ESPECIALIZACIONES
  payload: {
    especializaciones: IpaginatedEspecializaciones
  }
}

export interface ILoadingEspecializacionesFailedAction {
  type: EspecializacionesActionTypes.LOADING_ESPECIALIZACIONES_FAILED
}

export interface IAddEspecializacionesAction {
  type: EspecializacionesActionTypes.ADD_ESPECIALIZACIONES
  payload: IEspecializacionesItem
}

export interface IAddingEspecializacionesAction {
  type: EspecializacionesActionTypes.ADDING_ESPECIALIZACIONES
}

export interface IAddedEspecializacionesAction {
  type: EspecializacionesActionTypes.ADDED_ESPECIALIZACIONES
  payload: {
    especializaciones: IpaginatedEspecializaciones
  }
}

export interface IAddingEspecializacionesFailedAction {
  type: EspecializacionesActionTypes.ADDING_ESPECIALIZACIONES_FAILED
  message: string
  status: number
  field?: string
}

export interface IRemoveEspecializacionAction {
  type: EspecializacionesActionTypes.REMOVE_ESPECIALIZACION
  payload: IEspecializacionesItem
}

export interface IRemovingEspecializacionAction {
  type: EspecializacionesActionTypes.REMOVING_ESPECIALIZACION
}

export interface IRemovedEspecializacionAction {
  type: EspecializacionesActionTypes.REMOVED_ESPECIALIZACION
}

export interface IRemovingEspecializacionFailedAction {
  type: EspecializacionesActionTypes.REMOVING_ESPECIALIZACION_FAILED
}

export interface IEditEspecializacionesAction {
  type: EspecializacionesActionTypes.EDIT_ESPECIALIZACIONES
  payload: IEspecializacionesItem
}

export interface IEditingEspecializacionesAction {
  type: EspecializacionesActionTypes.EDITING_ESPECIALIZACIONES
}

export interface IEditedEspecializacionesAction {
  type: EspecializacionesActionTypes.EDITED_ESPECIALIZACIONES
  payload: IEspecializacionesItem
}

export interface IEditingEspecializacionesFailedAction {
  type: EspecializacionesActionTypes.EDITING_ESPECIALIZACIONES_FAILED
}

export type EspecializacionesAction =
  | ISearchEspecializacionesAction
  | ISearchingEspecializacionesAction
  | IFoundEspecializacionesAction
  | ISearchingEspecializacionesFailedAction
  | ILoadEspecializacionesAction
  | ILoadingEspecializacionesAction
  | ILoadedEspecializacionesAction
  | ILoadingEspecializacionesFailedAction
  | IAddEspecializacionesAction
  | IAddingEspecializacionesAction
  | IAddedEspecializacionesAction
  | IAddingEspecializacionesFailedAction
  | IRemoveEspecializacionAction
  | IRemovingEspecializacionAction
  | IRemovedEspecializacionAction
  | IRemovingEspecializacionFailedAction
  | IEditEspecializacionesAction
  | IEditingEspecializacionesAction
  | IEditedEspecializacionesAction
  | IEditingEspecializacionesFailedAction
