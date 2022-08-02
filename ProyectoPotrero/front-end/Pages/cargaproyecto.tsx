import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import TextField from '@mui/material/TextField'
import axios from 'axios'
import ProyectoPotreromodulescss from 'dist/css/ProyectoPotrero.module.scss'
import React, { FunctionComponent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Autocomplete from '../components/Autocomplete'
import FileUpload from '../components/FileUpload/FileUpload'
import { loadCohortes, searchCohortes } from '../store/actions/cohortesActions'
import { addProyectos, editProyectos, loadProyectos, searchProyectos } from '../store/actions/proyectosActions'
import { IState } from '../store/reducers/index'
import baseClasses from './layout.module.scss'

const CargaProyecto: FunctionComponent = (props: any) => {
  const classes = baseClasses
  const initialDataCohortes = {
    Curso: '',
    Img: '',
    FechaInicio: '',
  }
  const [Cohortesdata, setCohortesData] = React.useState<any>(initialDataCohortes)
  const handleCohortesChange = (name: string) => (event: any) => {
    const value = event?.target ? (event.target.files ? event.target.files[0] : event.currentTarget?.value || event.target.value) : event
    setCohortesData({
      ...Cohortesdata,
      [name]: value,
    })
  }
  const initialDataProyectos = {
    nombreAlumno: '',
    VistaPrevia: '',
    url: '',
    Grupo: [],
    nombreProyecto: '',
    Destacado: false,
    Evaluado: false,
    urlLinkedin: '',
  }
  const [Proyectosdata, setProyectosData] = React.useState<any>(initialDataProyectos)
  const handleProyectosChange = (name: string) => (event: any) => {
    const value = event?.target ? (event.target.files ? event.target.files[0] : event.currentTarget?.value || event.target.value) : event
    setProyectosData({
      ...Proyectosdata,
      [name]: value,
    })
  }
  const theme = ProyectoPotreromodulescss
  const Cohortes = useSelector((state: IState) => state.cohortes).cohortes
  const cohortesData = useSelector((state: IState) => state.cohortes)
  const Proyectos = useSelector((state: IState) => state.proyectos).proyectos
  const proyectosData = useSelector((state: IState) => state.proyectos)
  const dispatch = useDispatch()
  const [loadProyectosloadoptions, setloadProyectosloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 50,
    sort: { field: null, method: 'DESC' },
    totalItems: 0,
  })
  const performloadProyectosload = (options) => {
    dispatch(options.searchString ? searchProyectos(options) : loadProyectos(options))
  }
  React.useEffect(() => {
    performloadProyectosload({
      ...loadProyectosloadoptions,
    })
  }, [loadProyectosloadoptions])
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
  const [openSnackbar, setopenSnackbar] = React.useState(false)

  const cohortesAutocompleteData = useSelector((state: IState) => state.cohortes)
  const [GrupoOptions, setGrupoOptions] = React.useState<{ label: String; value: String }[]>([])
  const typeInSearchGrupoCohortes = (typedIn) => {
    const searchOptions = { searchString: typedIn, searchField: 'Curso', page: 1, limit: 10 }
    axios.get('http://127.0.0.1:4567/api/cohortes/search/', { params: searchOptions }).then((result) => {
      setGrupoOptions(
        result.data.docs.map((cohorte) => {
          return { label: cohorte.Curso, value: cohorte._id }
        })
      )
    })
  }
  const [GrupoValue, setGrupoValue] = React.useState(null)
  React.useEffect(() => {
    if (!Proyectosdata.Grupo) return undefined
    const asArray = Array.isArray(Proyectosdata.Grupo) ? Proyectosdata.Grupo : [Proyectosdata.Grupo]
    setGrupoValue(asArray.map((item) => ({ label: item.Curso, value: item._id })))
  }, [Proyectosdata.Grupo])

  // Theme selection

  const espera = () => {
    {
      props.history.push('/')
    }
  }

  const suscribe = () => {
    let data = { ...Proyectosdata }
    setProyectosData({ ...initialDataProyectos })

    if (data._id) {
      dispatch(editProyectos(data as any))
    } else {
      dispatch(addProyectos(data as any))
    }
  }

  return (
    <React.Fragment>
      <div className={theme.bodyGeneral}>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={2000}
          onClose={() => {
            setopenSnackbar(false)
          }}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert variant="filled" severity="success">
            <AlertTitle>Proyecto Enviado!</AlertTitle>
          </Alert>
        </Snackbar>
        <div title="div" className={theme.formulario}>
          <div title="div" className={theme.parte1}>
            <div title="div" className={theme.NombreCohorte}>
              Nombres de Autores
              <TextField
                margin="normal"
                label="Ingresa tu nombre completo"
                type="text"
                fullWidth
                className={'field_nombreAlumno'}
                variant="filled"
                value={Proyectosdata.nombreAlumno || ''}
                onChange={handleProyectosChange('nombreAlumno')}
                error={proyectosData?.errField === 'nombreAlumno'}
                helperText={proyectosData?.errField === 'nombreAlumno' && proyectosData.errMessage}
              />
              Cohorte
              <Autocomplete
                chips
                value={GrupoValue}
                onType={typeInSearchGrupoCohortes}
                onChange={(newValue) =>
                  handleProyectosChange('Grupo')(
                    newValue?.length ? newValue.map((item) => ({ _id: item.value !== 'new' ? item.value : null, Curso: item.label })) : []
                  )
                }
                loading={cohortesAutocompleteData.loadingStatus === 'loading'}
                placeholder="Selecciona tu curso"
                options={GrupoOptions}
                label="Grupo"
                fullWidth
                variant="filled"
                margin="normal"
              />
            </div>

            <div title="div" className={theme.foto}>
              <FileUpload label="Img" value={Cohortesdata.Img} onChange={handleCohortesChange('Img')} variant="filled" />
            </div>
          </div>

          <div title="div" className={theme.parte2}>
            URL del Proyecto
            <TextField
              placeholder="https://tuProyecto.aptugo.app/"
              margin="normal"
              label="URL del Proyecto"
              type="text"
              fullWidth
              variant="filled"
              value={Proyectosdata.url}
              onChange={handleProyectosChange('url')}
            />
            Nombre del Proyecto
            <TextField
              margin="normal"
              label="Ingresa nombre de Proyecto"
              type="text"
              fullWidth
              className={'field_nombreProyecto'}
              variant="filled"
              value={Proyectosdata.nombreProyecto || ''}
              onChange={handleProyectosChange('nombreProyecto')}
              error={proyectosData?.errField === 'nombreProyecto'}
              helperText={proyectosData?.errField === 'nombreProyecto' && proyectosData.errMessage}
            />
            URL de LinkedIn
            <TextField
              placeholder="https://www.linkedin.com/in/tuUsuario/"
              margin="normal"
              label="Ingresa el url de tu LinkedIn"
              type="text"
              fullWidth
              variant="filled"
              value={Proyectosdata.urlLinkedin}
              onChange={handleProyectosChange('urlLinkedin')}
            />
            <Button
              variant="contained"
              onClickCapture={(e) => {
                suscribe()
                setopenSnackbar(true)
                setTimeout(espera, 3000)
              }}
              fullWidth
            >
              CARGA TU PROYECTO
            </Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default CargaProyecto
