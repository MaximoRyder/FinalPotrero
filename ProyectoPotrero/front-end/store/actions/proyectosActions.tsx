import { IpaginatedProyectos, IProyectosItem } from '../models'

export enum ProyectosActionTypes {
  SEARCH_PROYECTOS = 'proyectos/search',
  SEARCHING_PROYECTOS = 'proyectos/searching',
  FOUND_PROYECTOS = 'proyectos/found',
  SEARCHING_PROYECTOS_FAILED = 'proyectos/searching_failed',

  LOAD_PROYECTOS = 'proyectos/load',
  LOADING_PROYECTOS = 'proyectos/loading',
  LOADED_PROYECTOS = 'proyectos/loaded',
  LOADING_PROYECTOS_FAILED = 'proyectos/loading_failed',

  ADD_PROYECTOS = 'proyectos/add',
  ADDING_PROYECTOS = 'proyectos/adding',
  ADDED_PROYECTOS = 'proyectos/added',
  ADDING_PROYECTOS_FAILED = 'proyectos/adding_failed',

  REMOVE_PROYECTO = 'proyectos/remove',
  REMOVING_PROYECTO = 'proyectos/removing',
  REMOVED_PROYECTO = 'proyectos/removed',
  REMOVING_PROYECTO_FAILED = 'proyectos/removing_failed',

  EDIT_PROYECTOS = 'proyectos/edit',
  EDITING_PROYECTOS = 'proyectos/editing',
  EDITED_PROYECTOS = 'proyectos/edited',
  EDITING_PROYECTOS_FAILED = 'proyectos/editing_failed',
}

export function searchProyectos(searchOptions: TSearchOptions | string, keep?: boolean): ISearchProyectosAction {
  return {
    type: ProyectosActionTypes.SEARCH_PROYECTOS,
    searchOptions: typeof searchOptions === 'string' ? { searchString: searchOptions } : searchOptions,
    keep: keep,
  }
}

export function searchingProyectos(): ISearchingProyectosAction {
  return {
    type: ProyectosActionTypes.SEARCHING_PROYECTOS,
  }
}

export function foundProyectos(proyectos: IpaginatedProyectos, keep?: boolean): IFoundProyectosAction {
  return {
    type: ProyectosActionTypes.FOUND_PROYECTOS,
    keep: keep,
    payload: {
      proyectos,
    },
  }
}

export function searchingProyectosFailed(): ISearchingProyectosFailedAction {
  return {
    type: ProyectosActionTypes.SEARCHING_PROYECTOS_FAILED,
  }
}

export function loadProyectos(loadOptions: TSearchOptions): ILoadProyectosAction {
  return {
    type: ProyectosActionTypes.LOAD_PROYECTOS,
    loadOptions: loadOptions,
  }
}

export function loadingProyectos(): ILoadingProyectosAction {
  return {
    type: ProyectosActionTypes.LOADING_PROYECTOS,
  }
}

export function loadedProyectos(proyectos: IpaginatedProyectos): ILoadedProyectosAction {
  return {
    type: ProyectosActionTypes.LOADED_PROYECTOS,
    payload: {
      proyectos,
    },
  }
}

export function loadingProyectosFailed(): ILoadingProyectosFailedAction {
  return {
    type: ProyectosActionTypes.LOADING_PROYECTOS_FAILED,
  }
}

export function addProyectos(proyecto: IProyectosItem): IAddProyectosAction {
  return {
    type: ProyectosActionTypes.ADD_PROYECTOS,
    payload: proyecto,
  }
}

export function addingProyectos(): IAddingProyectosAction {
  return {
    type: ProyectosActionTypes.ADDING_PROYECTOS,
  }
}

export function addedProyectos(proyectos: IpaginatedProyectos): IAddedProyectosAction {
  return {
    type: ProyectosActionTypes.ADDED_PROYECTOS,
    payload: {
      proyectos,
    },
  }
}

export function addingProyectosFailed(errData: { data: { message: string; field?: string }; status: number }): IAddingProyectosFailedAction {
  return {
    type: ProyectosActionTypes.ADDING_PROYECTOS_FAILED,
    message: errData.data.message,
    status: errData.status,
    field: errData.data.field,
  }
}

export function removeProyecto(proyecto: IProyectosItem): IRemoveProyectoAction {
  return {
    type: ProyectosActionTypes.REMOVE_PROYECTO,
    payload: proyecto,
  }
}

export function removingProyecto(): IRemovingProyectoAction {
  return {
    type: ProyectosActionTypes.REMOVING_PROYECTO,
  }
}

export function removedProyecto(): IRemovedProyectoAction {
  return {
    type: ProyectosActionTypes.REMOVED_PROYECTO,
  }
}

export function removingProyectoFailed(): IRemovingProyectoFailedAction {
  return {
    type: ProyectosActionTypes.REMOVING_PROYECTO_FAILED,
  }
}

export function editProyectos(proyecto: IProyectosItem): IEditProyectosAction {
  return {
    type: ProyectosActionTypes.EDIT_PROYECTOS,
    payload: proyecto,
  }
}

export function editingProyectos(): IEditingProyectosAction {
  return {
    type: ProyectosActionTypes.EDITING_PROYECTOS,
  }
}

export function editedProyectos(proyectos: IProyectosItem): IEditedProyectosAction {
  return {
    type: ProyectosActionTypes.EDITED_PROYECTOS,
    payload: proyectos,
  }
}

export function editingProyectosFailed(): IEditingProyectosFailedAction {
  return {
    type: ProyectosActionTypes.EDITING_PROYECTOS_FAILED,
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

export interface ISearchProyectosAction {
  type: ProyectosActionTypes.SEARCH_PROYECTOS
  searchOptions: TSearchOptions
  keep?: boolean
}

export interface ISearchingProyectosAction {
  type: ProyectosActionTypes.SEARCHING_PROYECTOS
}

export interface IFoundProyectosAction {
  type: ProyectosActionTypes.FOUND_PROYECTOS
  keep?: boolean
  payload: {
    proyectos: IpaginatedProyectos
  }
}

export interface ISearchingProyectosFailedAction {
  type: ProyectosActionTypes.SEARCHING_PROYECTOS_FAILED
}

export interface ILoadProyectosAction {
  type: ProyectosActionTypes.LOAD_PROYECTOS
  loadOptions: TSearchOptions
}

export interface ILoadingProyectosAction {
  type: ProyectosActionTypes.LOADING_PROYECTOS
}

export interface ILoadedProyectosAction {
  type: ProyectosActionTypes.LOADED_PROYECTOS
  payload: {
    proyectos: IpaginatedProyectos
  }
}

export interface ILoadingProyectosFailedAction {
  type: ProyectosActionTypes.LOADING_PROYECTOS_FAILED
}

export interface IAddProyectosAction {
  type: ProyectosActionTypes.ADD_PROYECTOS
  payload: IProyectosItem
}

export interface IAddingProyectosAction {
  type: ProyectosActionTypes.ADDING_PROYECTOS
}

export interface IAddedProyectosAction {
  type: ProyectosActionTypes.ADDED_PROYECTOS
  payload: {
    proyectos: IpaginatedProyectos
  }
}

export interface IAddingProyectosFailedAction {
  type: ProyectosActionTypes.ADDING_PROYECTOS_FAILED
  message: string
  status: number
  field?: string
}

export interface IRemoveProyectoAction {
  type: ProyectosActionTypes.REMOVE_PROYECTO
  payload: IProyectosItem
}

export interface IRemovingProyectoAction {
  type: ProyectosActionTypes.REMOVING_PROYECTO
}

export interface IRemovedProyectoAction {
  type: ProyectosActionTypes.REMOVED_PROYECTO
}

export interface IRemovingProyectoFailedAction {
  type: ProyectosActionTypes.REMOVING_PROYECTO_FAILED
}

export interface IEditProyectosAction {
  type: ProyectosActionTypes.EDIT_PROYECTOS
  payload: IProyectosItem
}

export interface IEditingProyectosAction {
  type: ProyectosActionTypes.EDITING_PROYECTOS
}

export interface IEditedProyectosAction {
  type: ProyectosActionTypes.EDITED_PROYECTOS
  payload: IProyectosItem
}

export interface IEditingProyectosFailedAction {
  type: ProyectosActionTypes.EDITING_PROYECTOS_FAILED
}

export type ProyectosAction =
  | ISearchProyectosAction
  | ISearchingProyectosAction
  | IFoundProyectosAction
  | ISearchingProyectosFailedAction
  | ILoadProyectosAction
  | ILoadingProyectosAction
  | ILoadedProyectosAction
  | ILoadingProyectosFailedAction
  | IAddProyectosAction
  | IAddingProyectosAction
  | IAddedProyectosAction
  | IAddingProyectosFailedAction
  | IRemoveProyectoAction
  | IRemovingProyectoAction
  | IRemovedProyectoAction
  | IRemovingProyectoFailedAction
  | IEditProyectosAction
  | IEditingProyectosAction
  | IEditedProyectosAction
  | IEditingProyectosFailedAction
