import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Hidden from '@mui/material/Hidden'
import Menu from '@mui/material/Menu'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import ProyectoPotreromodulescss from 'dist/css/ProyectoPotrero.module.scss'
import React, { FunctionComponent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import TopMenu, { TopMenuItem } from '../components/TopMenu'
import { loadCohortes, searchCohortes } from '../store/actions/cohortesActions'
import { loadEspecializaciones, searchEspecializaciones } from '../store/actions/especializacionesActions'
import { loadProyectos, searchProyectos } from '../store/actions/proyectosActions'
import { IState } from '../store/reducers/index'
import baseClasses from './layout.module.scss'

const Dashboard: FunctionComponent = (props: any) => {
  const classes = baseClasses
  const [profileMenuAnchor, setprofileMenuAnchor] = React.useState<any>(null)
  const theme = ProyectoPotreromodulescss
  const Projects = useSelector((state: IState) => state.proyectos).proyectos
  const proyectosData = useSelector((state: IState) => state.proyectos)
  const allCohortes = useSelector((state: IState) => state.cohortes).cohortes
  const cohortesData = useSelector((state: IState) => state.cohortes)
  const allEspecializaciones = useSelector((state: IState) => state.especializaciones).especializaciones
  const especializacionesData = useSelector((state: IState) => state.especializaciones)
  const dispatch = useDispatch()
  const [LoadfromEspecializacionesloadoptions, setLoadfromEspecializacionesloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 50,
    sort: { field: null, method: 'DESC' },
    totalItems: 0,
  })
  const performLoadfromEspecializacionesload = (options) => {
    dispatch(options.searchString ? searchEspecializaciones(options) : loadEspecializaciones(options))
  }
  React.useEffect(() => {
    performLoadfromEspecializacionesload({
      ...LoadfromEspecializacionesloadoptions,
    })
  }, [LoadfromEspecializacionesloadoptions])
  const [LoadCohortesloadoptions, setLoadCohortesloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 50,
    sort: { field: null, method: 'DESC' },
    totalItems: 0,
  })
  const performLoadCohortesload = (options) => {
    dispatch(options.searchString ? searchCohortes(options) : loadCohortes(options))
  }
  React.useEffect(() => {
    performLoadCohortesload({
      ...LoadCohortesloadoptions,
    })
  }, [LoadCohortesloadoptions])
  const [LoadProyectosloadoptions, setLoadProyectosloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 50,
    sort: { field: null, method: 'DESC' },
    totalItems: 0,
  })
  const performLoadProyectosload = (options) => {
    dispatch(options.searchString ? searchProyectos(options) : loadProyectos(options))
  }
  React.useEffect(() => {
    performLoadProyectosload({
      ...LoadProyectosloadoptions,
    })
  }, [LoadProyectosloadoptions])

  // Theme selection

  return (
    <React.Fragment>
      <div className={theme.bodyGeneral}>
        <div title="Navbar" className={theme.containerNavbar}>
          <AppBar elevation={0} position="relative" title="">
            <Toolbar>
              <Container className={theme.containerElementosNavbar} maxWidth="lg">
                <div title="div" className={theme.containerLogo}>
                  <NavLink to="/">
                    <picture>
                      <img src="/img/potrero digital.png" alt="/img/potrero digital.png" />
                    </picture>
                  </NavLink>
                </div>

                <Hidden mdUp>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClickCapture={(event) => {
                      setprofileMenuAnchor(event.currentTarget)
                    }}
                    startIcon={<MenuIcon />}
                  ></Button>

                  <Menu
                    anchorEl={profileMenuAnchor}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                    }}
                    open={Boolean(profileMenuAnchor)}
                    onClose={(params) => {
                      setprofileMenuAnchor(null)
                    }}
                  >
                    <TopMenu className={theme.topMenu}>
                      <a target="_blank" href="https://www.potrerodigital.org/marketing">
                        <TopMenuItem className={theme.topMenuItem} text="Especializaciones"></TopMenuItem>
                      </a>

                      <a target="_blank" href="https://www.potrerodigital.org/mendoza">
                        <TopMenuItem className={theme.topMenuItem} text="Potreros"></TopMenuItem>
                      </a>

                      <a target="_blank" href="https://www.potrerodigital.org/preguntas-frecuentes">
                        <TopMenuItem className={theme.topMenuItem} text="Preguntas Frecuentes"></TopMenuItem>
                      </a>

                      <a target="_blank" href="https://www.potrerodigital.org/donaciones">
                        <TopMenuItem className={theme.topMenuItem} text="Donaciones"></TopMenuItem>
                      </a>

                      <a target="_blank" href="https://plataforma.potrerodigital.org/panel/alumno">
                        <TopMenuItem className={theme.botonLogin} text="Login"></TopMenuItem>
                      </a>
                    </TopMenu>
                  </Menu>
                </Hidden>

                <Hidden mdDown>
                  <div title="NavDesktop" className={theme.containerNavegacion}>
                    <TopMenu className={theme.topMenu}>
                      <a target="_blank" href="https://www.potrerodigital.org/marketing">
                        <TopMenuItem className={theme.topMenuItem} text="Especializaciones"></TopMenuItem>
                      </a>

                      <a target="_blank" href="https://www.potrerodigital.org/mendoza">
                        <TopMenuItem className={theme.topMenuItem} text="Potreros"></TopMenuItem>
                      </a>

                      <a target="_blank" href="https://www.potrerodigital.org/preguntas-frecuentes">
                        <TopMenuItem className={theme.topMenuItem} text="Preguntas Frecuentes"></TopMenuItem>
                      </a>

                      <a target="_blank" href="https://www.potrerodigital.org/donaciones">
                        <TopMenuItem className={theme.topMenuItem} text="Donaciones"></TopMenuItem>
                      </a>

                      <a target="_blank" href="https://plataforma.potrerodigital.org/panel/alumno">
                        <TopMenuItem className={theme.botonLogin} text="Login"></TopMenuItem>
                      </a>
                    </TopMenu>
                  </div>
                </Hidden>
              </Container>
            </Toolbar>
          </AppBar>
        </div>

        <div title="Parte1" className={theme.parte1}>
          <div title="Parte1A" className={theme.parte1A}>
            <Typography variant="h4">
              Somos una red de centros de aprendizaje en oficios digitales que ofrece formación gratuita a quienes no podrían acceder de otra manera.
            </Typography>

            <picture>
              <img src="/img/parte1imagen1.png" alt="/img/parte1imagen1.png" />
            </picture>
          </div>

          <div title="Parte1B" className={theme.parte1B}>
            <Typography variant="h4">
              Su objetivo es inspirar a jóvenes en situación de vulnerabilidad social, para que ingresen al mercado laboral a través de la tecnología.
            </Typography>

            <picture>
              <img src="/img/parte1imagen2.png" alt="/img/parte1imagen2.png" />
            </picture>
          </div>

          <div title="Parte1C" className={theme.parte1C}>
            <Typography variant="h4">
              Impulsa una economía digital más diversa, inclusiva y competitiva en América Latina, otorgando oportunidades a todas las personas por
              igual.
            </Typography>

            <picture>
              <img src="/img/parte1imagen3.png" alt="/img/parte1imagen3.png" />
            </picture>
          </div>
        </div>

        <div title="Parte2" className={theme.parte2}>
          <div title="Textos" className={theme.textoParte2}>
            <Typography variant="h2">NUESTRAS ESPECIALIZACIONES</Typography>

            <Typography variant="h5">
              Cada uno de nuestros cursos se crea con la ayuda de nuestros socios pedagógicos. Además de las materias técnicas incluyen una formación
              en inglés digital y habilidades socioproductivas.
            </Typography>
          </div>

          <div title="Cada Especializacion" className={theme.especializacion}>
            {allEspecializaciones.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <a target="_blank" href={item.Url}>
                    <div title="Cada Card" className={theme.cardEspecializacion}>
                      <picture>
                        <img src={`/img/${item.LogoUno}`} alt={`/img/${item.LogoUno}`} width="30" height="30" />
                      </picture>

                      <Typography variant="h6">{item.Texto}</Typography>

                      <div title="Separador" className={theme.separador}></div>

                      <picture>
                        <img src={`/img/${item.LogoDos}`} alt={`/img/${item.LogoDos}`} width="73" height="34" />
                      </picture>
                    </div>
                  </a>
                </React.Fragment>
              )
            })}
          </div>
        </div>

        <Container className={theme.contenedorPaso1} maxWidth="xl">
          <Hidden mdDown>
            <div title="div" className={theme.titular}>
              <Typography variant="h2">Todos los Cursos</Typography>
            </div>
          </Hidden>
          <div title="div" className={theme.Paso1}>
            <div title="GridIzquierda" className={theme.gridIzquierda}>
              <Hidden mdUp>
                <div title="div" className={theme.titular}>
                  <Typography variant="h2">Todos los Cursos</Typography>
                </div>
              </Hidden>
              <div title="div" className={theme.flexCards}>
                {allCohortes.map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      <div title="div" className={theme.cardCohortes}>
                        <picture>
                          <img src={`/img/${item.Img}`} alt={`/img/${item.Img}`} />
                        </picture>

                        <Typography variant="h4">{item.Curso}</Typography>

                        <div title="div" className={theme.fechaInicioCards}>
                          <Typography variant="h5">Fecha de Inicio:</Typography>

                          {item.FechaInicio}
                        </div>

                        <NavLink to={`/cohorte/${item._id}`}>
                          <Button>View All</Button>
                        </NavLink>
                      </div>
                    </React.Fragment>
                  )
                })}
              </div>
            </div>

            <div title="GridDerecha" className={theme.gridDerecha}>
              <div title="Terminaste?" className={theme.terminaste}>
                <Typography variant="h4">¿Terminaste el curso y queres mostrarnos que sabes hacer?</Typography>

                <div title="div" className={theme.botonCargarProyecto}>
                  <NavLink to="/carga">
                    <Button variant="contained" color="secondary" fullWidth>
                      CARGA TU PROYECTO
                    </Button>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </Container>

        <div title="Footer" className={theme.footer1}>
          <div title="Texto1" className={theme.texto1}>
            <Typography variant="h3">
              <span>Compromiso Digital</span> es un programa de Fundación Compromiso que busca acompañar y abrir las puertas del mundo laboral a las
              personas que se formaron en Potrero Digital a partir de distintas iniciativas.
            </Typography>
          </div>

          <div title="Texto2 boton e imagen" className={theme.texto2BotonImagen}>
            <div title="Texto2" className={theme.texto2}>
              <Typography variant="h4">Búsqueda y pre-selección de personal</Typography>

              <Typography variant="subtitle1">
                Compromiso Digital trabaja en la búsqueda y preselección de estudiantes certificados para empresas que están en procesos de
                contratación, por medio de una evaluación de perfiles de acuerdo a las necesidades del empleador.
              </Typography>

              <Typography variant="subtitle1">
                Si estudiaste en Potrero Digital y querés sumarte a la bolsa de trabajo de Compromiso Digital, envianos un mail a
                compromisodigital@compromiso.org con tu CV
              </Typography>

              <Typography variant="subtitle1">
                Si querés conocer los perfiles de nuestros estudiantes certificados o necesitas contratar servicios ingresá a nuestra página web, y
                contactanos!
              </Typography>
            </div>

            <div title="Boton Imagen" className={theme.botonImagen}>
              <a target="_blank" href="https://compromisodigital.ar/">
                <Button>Ingresá</Button>
              </a>

              <picture>
                <img src="/img/imagen2 footer pd.webp" alt="/img/imagen2 footer pd.webp" width="179" height="53" />
              </picture>
            </div>
          </div>
        </div>

        <div title="Footer 2" className={theme.footer2}>
          <div title="Contenedor1" className={theme.contenedorFooter1}>
            <Typography variant="h6">Impulsamos una economía digital más diversa, inclusiva y competitiva en América Latina.</Typography>
          </div>

          <div title="Contenedor2" className={theme.contenedorFooter2}>
            <Typography variant="h6">
              <span>Potrero Digital</span> es un programa de &nbsp;
              <a target="_blank" href="https://www.compromiso.org/fundacion">
                <u>Fundación Compromiso.</u>
              </a>
            </Typography>
          </div>
        </div>

        <div title="footer 3" className={theme.footer3}>
          <div title="contenedor3" className={theme.contenedorFooter3}>
            <div title="Compromiso" className={theme.imagenCompromiso}>
              <a target="_blank" href="https://www.compromiso.org/fundacion">
                <picture>
                  <img src="/img/imagen 3 compromiso pd.webp" alt="/img/imagen 3 compromiso pd.webp" />
                </picture>
              </a>
            </div>

            <div title="Tool" className={theme.footerLinks}>
              <a target="_blank" href="https://www.facebook.com/potrerodigital/">
                <picture>
                  <img src="/img/facebook pd.webp" alt="/img/facebook pd.webp" width="31" height="31" />
                </picture>
              </a>

              <a target="_blank" href="https://www.youtube.com/channel/UCkh0OTzDBAtqKtXjHFqQinQ">
                <picture>
                  <img src="/img/youtube pd.webp" alt="/img/youtube pd.webp" width="31" height="31" />
                </picture>
              </a>

              <a target="_blank" href="https://www.instagram.com/potrerodigital/">
                <picture>
                  <img src="/img/ig pd.webp" alt="/img/ig pd.webp" width="31" height="31" />
                </picture>
              </a>

              <Typography variant="h6">Visita nuestras redes.</Typography>
            </div>
          </div>

          <Typography variant="h5">Created by Maximiliano Gesualdo in Aptugo · 2022 All rights reserved</Typography>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Dashboard
