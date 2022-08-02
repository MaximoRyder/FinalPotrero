import { combineReducers } from 'redux'
import cohortesReducer, { ICohortesState, initialCohortesState } from './cohortesReducer'
import especializacionesReducer, { IEspecializacionesState, initialEspecializacionesState } from './especializacionesReducer'
import proyectosReducer, { initialProyectosState, IProyectosState } from './proyectosReducer'

export interface IState {
  proyectos: IProyectosState
  cohortes: ICohortesState
  especializaciones: IEspecializacionesState
}

export const initialState: IState = {
  proyectos: initialProyectosState,
  cohortes: initialCohortesState,
  especializaciones: initialEspecializacionesState,
}

export default combineReducers({
  proyectos: proyectosReducer,
  cohortes: cohortesReducer,
  especializaciones: especializacionesReducer,
})
