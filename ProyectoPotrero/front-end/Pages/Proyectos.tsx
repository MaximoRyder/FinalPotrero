import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import Checkbox from '@mui/material/Checkbox'
import grey from '@mui/material/colors/grey'
import Container from '@mui/material/Container'
import FormControlLabel from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import ProyectoPotreromodulescss from 'dist/css/ProyectoPotrero.module.scss'
import React, { FunctionComponent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Autocomplete from '../components/Autocomplete'
import AddDialog from '../components/Dialog/Dialog'
import FileUpload from '../components/FileUpload/FileUpload'
import Pagination from '../components/Pagination'
import Field from '../components/Table/Field'
import Table from '../components/Table/Table'
import { addProyectos, editProyectos, loadProyectos, removeProyecto, searchProyectos } from '../store/actions/proyectosActions'
import { IProyectosItem } from '../store/models'
import { IState } from '../store/reducers/index'
import baseClasses from './layout.module.scss'

export { RadioButtonUncheckedIcon }

const aptugotheme = createTheme({
  palette: {
    primary: grey,
  },
})

const Proyectos: FunctionComponent = (props: any) => {
  const classes = baseClasses
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
  const proyectosData = useSelector((state: IState) => state.proyectos)
  const theme = ProyectoPotreromodulescss
  const dispatch = useDispatch()
  let searchTimeout = null
  const searchForProyectos = (event) => {
    if (searchTimeout) clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
      settableloadoptions({ ...tableloadoptions, searchString: event.target.value })
    }, 500)
  }
  const [searchFieldloadoptions, setsearchFieldloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 25,
    sort: { field: null, method: 'DESC' },
    totalItems: 0,
  })
  const performsearchFieldload = (options) => {
    dispatch(options.searchString ? searchProyectos(options) : loadProyectos(options))
  }
  React.useEffect(() => {
    performsearchFieldload({
      ...searchFieldloadoptions,
    })
  }, [searchFieldloadoptions])
  const [dialogProyectosAction, setdialogProyectosAction] = React.useState<'add' | 'edit' | 'delete' | ''>('')
  const LocalAddDialog = AddDialog

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
  const [tableloadoptions, settableloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 50,
    sort: { field: null, method: 'DESC' },
    totalItems: 0,
  })
  const performtableload = (options) => {
    dispatch(options.searchString ? searchProyectos(options) : loadProyectos(options))
  }
  React.useEffect(() => {
    performtableload({
      ...tableloadoptions,
    })
  }, [tableloadoptions])

  // Theme selection

  return (
    <React.Fragment>
      <ThemeProvider theme={aptugotheme}>
        <div className={theme.bodyGeneral}>
          <div title="div" className={theme.mainarea}>
            <Container maxWidth="lg">
              <div title="Head" className={theme.tableHeading}>
                <Typography variant="h4">Proyecto list</Typography>
              </div>

              <Paper>
                <div title="Table Area" className={classes.tableResponsive}>
                  <div title="Table Toolbar" className={theme.tabletoolbar}>
                    <TextField
                      variant="outlined"
                      placeholder="Search Proyecto..."
                      margin="normal"
                      className={theme.extensibleInput}
                      type="text"
                      fullWidth
                      onChange={searchForProyectos}
                    />

                    <LocalAddDialog
                      isOpen={dialogProyectosAction !== ''}
                      onOpen={() => setdialogProyectosAction('add')}
                      onSave={() => setdialogProyectosAction('')}
                      onClose={() => setdialogProyectosAction('')}
                      action={dialogProyectosAction}
                      addOptions={{ title: 'Add Proyecto', text: 'Enter Proyecto data', button: 'Add' }}
                      editOptions={{ title: 'Edit Proyecto', text: 'Update Proyecto data', button: 'Edit' }}
                      removeOptions={{ title: 'Borrar Proyecto', text: 'Estas seguro?', button: 'Borrar' }}
                      saveDataHandler={(data: IProyectosItem) => {
                        if (dialogProyectosAction === 'delete') {
                          dispatch(removeProyecto(data))
                        } else {
                          dialogProyectosAction === 'add' ? dispatch(addProyectos(data)) : dispatch(editProyectos(data))
                        }
                      }}
                      color="primary"
                      data={Proyectosdata}
                      initialData={initialDataProyectos}
                      setData={setProyectosData}
                      allowMultipleSubmit={dialogProyectosAction === 'add'}
                    >
                      <TextField
                        margin="dense"
                        label="Ingresa tu nombre completo"
                        type="text"
                        fullWidth
                        className={'field_nombreAlumno'}
                        variant="standard"
                        value={Proyectosdata.nombreAlumno || ''}
                        onChange={handleProyectosChange('nombreAlumno')}
                        error={proyectosData?.errField === 'nombreAlumno'}
                        helperText={proyectosData?.errField === 'nombreAlumno' && proyectosData.errMessage}
                      />

                      <FileUpload
                        label="VistaPrevia"
                        value={Proyectosdata.VistaPrevia}
                        onChange={handleProyectosChange('VistaPrevia')}
                        variant="standard"
                      />

                      <TextField
                        placeholder="https://tuProyecto.aptugo.app/"
                        margin="dense"
                        label="URL del Proyecto"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={Proyectosdata.url}
                        onChange={handleProyectosChange('url')}
                      />

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
                        variant="standard"
                        margin="dense"
                      />

                      <TextField
                        margin="dense"
                        label="Ingresa nombre de Proyecto"
                        type="text"
                        fullWidth
                        className={'field_nombreProyecto'}
                        variant="standard"
                        value={Proyectosdata.nombreProyecto || ''}
                        onChange={handleProyectosChange('nombreProyecto')}
                        error={proyectosData?.errField === 'nombreProyecto'}
                        helperText={proyectosData?.errField === 'nombreProyecto' && proyectosData.errMessage}
                      />

                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={Proyectosdata.Destacado}
                            color="primary"
                            onChange={(e) => handleProyectosChange('Destacado')(e.currentTarget.checked)}
                          />
                        }
                        label="Destacado"
                      />

                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={Proyectosdata.Evaluado}
                            color="primary"
                            onChange={(e) => handleProyectosChange('Evaluado')(e.currentTarget.checked)}
                          />
                        }
                        label="Evaluado"
                      />

                      <TextField
                        placeholder="https://www.linkedin.com/in/tuUsuario/"
                        margin="dense"
                        label="Ingresa el url de tu LinkedIn"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={Proyectosdata.urlLinkedin}
                        onChange={handleProyectosChange('urlLinkedin')}
                      />
                    </LocalAddDialog>
                  </div>

                  <div title="Body">
                    <Table
                      tableHead={[
                        'Nombre Alumno',
                        'Vista Previa',
                        'URL',
                        'Curso nro',
                        'Nombre Proyecto',
                        'Destacado',
                        'Evaluado',
                        'URL de LinkedIn',
                        'Actions',
                      ]}
                      tableData={proyectosData.foundproyectos.length ? proyectosData.foundproyectos : (proyectosData.proyectos as any)}
                      orderBy={tableloadoptions.sort.field}
                      order={tableloadoptions.sort.method}
                      onRequestSort={(event, property) => {
                        settableloadoptions({
                          ...tableloadoptions,
                          sort: {
                            field: property,
                            method: tableloadoptions.sort.field === property ? (tableloadoptions.sort.method === 'asc' ? 'desc' : 'asc') : 'ASC',
                          },
                        })
                      }}
                    >
                      <Field value={(fieldData: any) => fieldData.nombreAlumno} />

                      <Field value={(fieldData: any) => (fieldData.VistaPrevia ? <img src={`/img/${fieldData.VistaPrevia}`} /> : <div />)} />

                      <Field value={(fieldData: any) => `<a href="${fieldData.url}">${fieldData.url}</a>`} />

                      <Field
                        value={(fieldData: any) =>
                          fieldData.Grupo?.map((item) => (
                            <span key={`autocomplete_${item._id}`} className={classes.tableChip}>
                              {item.Curso}
                            </span>
                          ))
                        }
                      />

                      <Field value={(fieldData: any) => fieldData.nombreProyecto} />

                      <Field value={(fieldData: any) => (fieldData.Destacado ? <RadioButtonCheckedIcon /> : <RadioButtonUncheckedIcon />)} />

                      <Field value={(fieldData: any) => (fieldData.Evaluado ? <RadioButtonCheckedIcon /> : <RadioButtonUncheckedIcon />)} />

                      <Field value={(fieldData: any) => `<a href="${fieldData.urlLinkedin}">${fieldData.urlLinkedin}</a>`} />
                      <div className={classes.actionsArea}>
                        <IconButton
                          aria-label="edit"
                          color="primary"
                          onClickCapture={(e: any) => {
                            setProyectosData(e.element)
                            setdialogProyectosAction('edit')
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          color="primary"
                          onClickCapture={(e: any) => {
                            setProyectosData(e.element)
                            setdialogProyectosAction('delete')
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </div>
                    </Table>

                    <Pagination
                      itemsPerPage={tableloadoptions.limit}
                      currentPage={tableloadoptions.page}
                      setPage={(page) => {
                        settableloadoptions({ ...tableloadoptions, page: page })
                      }}
                      totalItems={proyectosData.totalDocs}
                    />
                  </div>
                </div>
              </Paper>
            </Container>
          </div>
        </div>
      </ThemeProvider>
    </React.Fragment>
  )
}

export default Proyectos
