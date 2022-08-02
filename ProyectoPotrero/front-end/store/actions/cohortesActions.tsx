import { ICohortesItem, IpaginatedCohortes } from '../models'

export enum CohortesActionTypes {
  SEARCH_COHORTES = 'cohortes/search',
  SEARCHING_COHORTES = 'cohortes/searching',
  FOUND_COHORTES = 'cohortes/found',
  SEARCHING_COHORTES_FAILED = 'cohortes/searching_failed',

  LOAD_COHORTES = 'cohortes/load',
  LOADING_COHORTES = 'cohortes/loading',
  LOADED_COHORTES = 'cohortes/loaded',
  LOADING_COHORTES_FAILED = 'cohortes/loading_failed',

  ADD_COHORTES = 'cohortes/add',
  ADDING_COHORTES = 'cohortes/adding',
  ADDED_COHORTES = 'cohortes/added',
  ADDING_COHORTES_FAILED = 'cohortes/adding_failed',

  REMOVE_COHORTE = 'cohortes/remove',
  REMOVING_COHORTE = 'cohortes/removing',
  REMOVED_COHORTE = 'cohortes/removed',
  REMOVING_COHORTE_FAILED = 'cohortes/removing_failed',

  EDIT_COHORTES = 'cohortes/edit',
  EDITING_COHORTES = 'cohortes/editing',
  EDITED_COHORTES = 'cohortes/edited',
  EDITING_COHORTES_FAILED = 'cohortes/editing_failed',
}

export function searchCohortes(searchOptions: TSearchOptions | string, keep?: boolean): ISearchCohortesAction {
  return {
    type: CohortesActionTypes.SEARCH_COHORTES,
    searchOptions: typeof searchOptions === 'string' ? { searchString: searchOptions } : searchOptions,
    keep: keep,
  }
}

export function searchingCohortes(): ISearchingCohortesAction {
  return {
    type: CohortesActionTypes.SEARCHING_COHORTES,
  }
}

export function foundCohortes(cohortes: IpaginatedCohortes, keep?: boolean): IFoundCohortesAction {
  return {
    type: CohortesActionTypes.FOUND_COHORTES,
    keep: keep,
    payload: {
      cohortes,
    },
  }
}

export function searchingCohortesFailed(): ISearchingCohortesFailedAction {
  return {
    type: CohortesActionTypes.SEARCHING_COHORTES_FAILED,
  }
}

export function loadCohortes(loadOptions: TSearchOptions): ILoadCohortesAction {
  return {
    type: CohortesActionTypes.LOAD_COHORTES,
    loadOptions: loadOptions,
  }
}

export function loadingCohortes(): ILoadingCohortesAction {
  return {
    type: CohortesActionTypes.LOADING_COHORTES,
  }
}

export function loadedCohortes(cohortes: IpaginatedCohortes): ILoadedCohortesAction {
  return {
    type: CohortesActionTypes.LOADED_COHORTES,
    payload: {
      cohortes,
    },
  }
}

export function loadingCohortesFailed(): ILoadingCohortesFailedAction {
  return {
    type: CohortesActionTypes.LOADING_COHORTES_FAILED,
  }
}

export function addCohortes(cohorte: ICohortesItem): IAddCohortesAction {
  return {
    type: CohortesActionTypes.ADD_COHORTES,
    payload: cohorte,
  }
}

export function addingCohortes(): IAddingCohortesAction {
  return {
    type: CohortesActionTypes.ADDING_COHORTES,
  }
}

export function addedCohortes(cohortes: IpaginatedCohortes): IAddedCohortesAction {
  return {
    type: CohortesActionTypes.ADDED_COHORTES,
    payload: {
      cohortes,
    },
  }
}

export function addingCohortesFailed(errData: { data: { message: string; field?: string }; status: number }): IAddingCohortesFailedAction {
  return {
    type: CohortesActionTypes.ADDING_COHORTES_FAILED,
    message: errData.data.message,
    status: errData.status,
    field: errData.data.field,
  }
}

export function removeCohorte(cohorte: ICohortesItem): IRemoveCohorteAction {
  return {
    type: CohortesActionTypes.REMOVE_COHORTE,
    payload: cohorte,
  }
}

export function removingCohorte(): IRemovingCohorteAction {
  return {
    type: CohortesActionTypes.REMOVING_COHORTE,
  }
}

export function removedCohorte(): IRemovedCohorteAction {
  return {
    type: CohortesActionTypes.REMOVED_COHORTE,
  }
}

export function removingCohorteFailed(): IRemovingCohorteFailedAction {
  return {
    type: CohortesActionTypes.REMOVING_COHORTE_FAILED,
  }
}

export function editCohortes(cohorte: ICohortesItem): IEditCohortesAction {
  return {
    type: CohortesActionTypes.EDIT_COHORTES,
    payload: cohorte,
  }
}

export function editingCohortes(): IEditingCohortesAction {
  return {
    type: CohortesActionTypes.EDITING_COHORTES,
  }
}

export function editedCohortes(cohortes: ICohortesItem): IEditedCohortesAction {
  return {
    type: CohortesActionTypes.EDITED_COHORTES,
    payload: cohortes,
  }
}

export function editingCohortesFailed(): IEditingCohortesFailedAction {
  return {
    type: CohortesActionTypes.EDITING_COHORTES_FAILED,
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

export interface ISearchCohortesAction {
  type: CohortesActionTypes.SEARCH_COHORTES
  searchOptions: TSearchOptions
  keep?: boolean
}

export interface ISearchingCohortesAction {
  type: CohortesActionTypes.SEARCHING_COHORTES
}

export interface IFoundCohortesAction {
  type: CohortesActionTypes.FOUND_COHORTES
  keep?: boolean
  payload: {
    cohortes: IpaginatedCohortes
  }
}

export interface ISearchingCohortesFailedAction {
  type: CohortesActionTypes.SEARCHING_COHORTES_FAILED
}

export interface ILoadCohortesAction {
  type: CohortesActionTypes.LOAD_COHORTES
  loadOptions: TSearchOptions
}

export interface ILoadingCohortesAction {
  type: CohortesActionTypes.LOADING_COHORTES
}

export interface ILoadedCohortesAction {
  type: CohortesActionTypes.LOADED_COHORTES
  payload: {
    cohortes: IpaginatedCohortes
  }
}

export interface ILoadingCohortesFailedAction {
  type: CohortesActionTypes.LOADING_COHORTES_FAILED
}

export interface IAddCohortesAction {
  type: CohortesActionTypes.ADD_COHORTES
  payload: ICohortesItem
}

export interface IAddingCohortesAction {
  type: CohortesActionTypes.ADDING_COHORTES
}

export interface IAddedCohortesAction {
  type: CohortesActionTypes.ADDED_COHORTES
  payload: {
    cohortes: IpaginatedCohortes
  }
}

export interface IAddingCohortesFailedAction {
  type: CohortesActionTypes.ADDING_COHORTES_FAILED
  message: string
  status: number
  field?: string
}

export interface IRemoveCohorteAction {
  type: CohortesActionTypes.REMOVE_COHORTE
  payload: ICohortesItem
}

export interface IRemovingCohorteAction {
  type: CohortesActionTypes.REMOVING_COHORTE
}

export interface IRemovedCohorteAction {
  type: CohortesActionTypes.REMOVED_COHORTE
}

export interface IRemovingCohorteFailedAction {
  type: CohortesActionTypes.REMOVING_COHORTE_FAILED
}

export interface IEditCohortesAction {
  type: CohortesActionTypes.EDIT_COHORTES
  payload: ICohortesItem
}

export interface IEditingCohortesAction {
  type: CohortesActionTypes.EDITING_COHORTES
}

export interface IEditedCohortesAction {
  type: CohortesActionTypes.EDITED_COHORTES
  payload: ICohortesItem
}

export interface IEditingCohortesFailedAction {
  type: CohortesActionTypes.EDITING_COHORTES_FAILED
}

export type CohortesAction =
  | ISearchCohortesAction
  | ISearchingCohortesAction
  | IFoundCohortesAction
  | ISearchingCohortesFailedAction
  | ILoadCohortesAction
  | ILoadingCohortesAction
  | ILoadedCohortesAction
  | ILoadingCohortesFailedAction
  | IAddCohortesAction
  | IAddingCohortesAction
  | IAddedCohortesAction
  | IAddingCohortesFailedAction
  | IRemoveCohorteAction
  | IRemovingCohorteAction
  | IRemovedCohorteAction
  | IRemovingCohorteFailedAction
  | IEditCohortesAction
  | IEditingCohortesAction
  | IEditedCohortesAction
  | IEditingCohortesFailedAction
