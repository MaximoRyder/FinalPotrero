export interface IProyectosItem {
  _id?: String
  createdAt: Date

  nombreAlumno: string

  VistaPrevia: string

  url: string
  Grupo: ICohortesItem

  nombreProyecto: string
  Destacado: Boolean
  Evaluado: Boolean

  urlLinkedin: string
}

export interface IpaginatedProyectos {
  docs: IProyectosItem[]
  totalDocs: number
  offset: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}
export interface ICohortesItem {
  _id?: String
  createdAt: Date

  Curso: string

  Img: string

  FechaInicio: string
  // Cohortes - Proyectos - Grupo - Cohortes - Curso
  Proyectos: IProyectosItem[]
}

export interface IpaginatedCohortes {
  docs: ICohortesItem[]
  totalDocs: number
  offset: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}
export interface IEspecializacionesItem {
  _id?: String
  createdAt: Date

  LogoUno: string

  Texto: string

  LogoDos: string

  Url: string
}

export interface IpaginatedEspecializaciones {
  docs: IEspecializacionesItem[]
  totalDocs: number
  offset: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}

export enum ApiStatus {
  NOTLOADED = 'notloaded',
  LOADING = 'loading',
  LOADED = 'loaded',
  FAILED = 'failed',
}
