import { ArrowDropUpRounded, KeyboardArrowDown } from '@mui/icons-material'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import ProyectoPotreromodulescss from 'dist/css/ProyectoPotrero.module.scss'
import React, { FunctionComponent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { searchCohortes } from '../store/actions/cohortesActions'
import { loadProyectos, searchProyectos } from '../store/actions/proyectosActions'
import { IState } from '../store/reducers/index'
import baseClasses from './layout.module.scss'

const Grupos: FunctionComponent = (props: any) => {
  const classes = baseClasses
  const theme = ProyectoPotreromodulescss
  const theProyectos = useSelector((state: IState) => state.proyectos).proyectos
  const proyectosData = useSelector((state: IState) => state.proyectos)
  const Cohortes = useSelector((state: IState) => state.cohortes).foundcohortes
  const cohortesData = useSelector((state: IState) => state.cohortes)
  const dispatch = useDispatch()
  const [LoadCohortesloadoptions, setLoadCohortesloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 50000,
    sort: { field: null, method: 'DESC' },
    searchField: '_id',
    totalItems: 0,
  })
  const performLoadCohortesload = (options) => {
    if (typeof options.searchString !== 'undefined') {
      dispatch(searchCohortes(options))
    }
  }
  React.useEffect(() => {
    performLoadCohortesload({
      ...LoadCohortesloadoptions,
      searchField: '_id',
      searchString: props.match.params.ID,
    })
  }, [LoadCohortesloadoptions, props.match.params.ID])
  const [LoadProyectsloadoptions, setLoadProyectsloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 50000,
    sort: { field: null, method: 'DESC' },
    totalItems: 0,
  })
  const performLoadProyectsload = (options) => {
    dispatch(options.searchString ? searchProyectos(options) : loadProyectos(options))
  }
  React.useEffect(() => {
    performLoadProyectsload({
      ...LoadProyectsloadoptions,
    })
  }, [LoadProyectsloadoptions])

  // Theme selection

  // Theme selection

  return (
    <React.Fragment>
      <div className={theme.bodyGeneral}>
        <div title="div" className={theme.GoTop}>
          <a target="_self" href="#banner">
            <ArrowDropUpRounded color="action" />
          </a>
        </div>

        <div title="div" id="banner" className={theme.banner}>
          <picture>
            <img src="/img/5b90eb_c0daf94e0d9d43898fd6b97032a685c8_mv2.webp" alt="/img/5b90eb_c0daf94e0d9d43898fd6b97032a685c8_mv2.webp" />
          </picture>

          <div title="div" className={theme.contenedorCurso}>
            <picture>
              <img src={`/img/${Cohortes[0]?.Img}`} alt={`/img/${Cohortes[0]?.Img}`} />
            </picture>

            <div title="div" className={theme.flexTexto}>
              <Typography variant="h2">{Cohortes[0]?.Curso}</Typography>

              <div title="div" className={theme.flexFecha}>
                <Typography variant="h5">Fecha de Inicio</Typography>

                {Cohortes[0]?.FechaInicio}
              </div>
            </div>
          </div>
        </div>

        <div title="Boton Volver" className={theme.botonBack}>
          <NavLink to="/">
            <Button variant="text">Volver</Button>
          </NavLink>
        </div>

        <Container maxWidth="xl">
          <div title="div" className={theme.ContenedorFlexCardsProyectos}>
            {theProyectos
              .filter((tmp) => tmp.Grupo.find((cohorte) => cohorte._id == props.match.params.ID))
              .map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <div title="div" className={theme.CardsProyectos}>
                      <picture>
                        <img src={`/img/${item.VistaPrevia}`} alt={`/img/${item.VistaPrevia}`} />
                      </picture>

                      <div title="div" className={theme.AlumnosProyecto}>
                        <Typography variant="h4">{item.nombreAlumno}</Typography>

                        {item.nombreProyecto}

                        <a target="_blank" href={item.url}>
                          <div title="div" className={theme.boton}>
                            <Typography variant="h5">Ver Online</Typography>

                            <KeyboardArrowDown />
                          </div>
                        </a>
                      </div>
                    </div>
                  </React.Fragment>
                )
              })}
          </div>
        </Container>

        <div title="Boton Volver" className={theme.botonBackAbajo}>
          <NavLink to="/">
            <Button variant="text">Volver</Button>
          </NavLink>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Grupos
