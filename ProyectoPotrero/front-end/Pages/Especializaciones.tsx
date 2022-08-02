import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import green from '@mui/material/colors/green'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import ProyectoPotreromodulescss from 'dist/css/ProyectoPotrero.module.scss'
import React, { FunctionComponent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddDialog from '../components/Dialog/Dialog'
import FileUpload from '../components/FileUpload/FileUpload'
import Pagination from '../components/Pagination'
import Field from '../components/Table/Field'
import Table from '../components/Table/Table'
import {
  addEspecializaciones,
  editEspecializaciones,
  loadEspecializaciones,
  removeEspecializacion,
  searchEspecializaciones,
} from '../store/actions/especializacionesActions'
import { IEspecializacionesItem } from '../store/models'
import { IState } from '../store/reducers/index'
import baseClasses from './layout.module.scss'

const aptugotheme = createTheme({
  palette: {
    primary: green,
  },
})

const Especializaciones: FunctionComponent = (props: any) => {
  const classes = baseClasses
  const initialDataEspecializaciones = {
    LogoUno: '',
    Texto: '',
    LogoDos: '',
    Url: '',
  }
  const [Especializacionesdata, setEspecializacionesData] = React.useState<any>(initialDataEspecializaciones)
  const handleEspecializacionesChange = (name: string) => (event: any) => {
    const value = event?.target ? (event.target.files ? event.target.files[0] : event.currentTarget?.value || event.target.value) : event
    setEspecializacionesData({
      ...Especializacionesdata,
      [name]: value,
    })
  }
  const especializacionesData = useSelector((state: IState) => state.especializaciones)
  const theme = ProyectoPotreromodulescss
  const dispatch = useDispatch()
  let searchTimeout = null
  const searchForEspecializaciones = (event) => {
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
    dispatch(options.searchString ? searchEspecializaciones(options) : loadEspecializaciones(options))
  }
  React.useEffect(() => {
    performsearchFieldload({
      ...searchFieldloadoptions,
    })
  }, [searchFieldloadoptions])
  const [dialogEspecializacionesAction, setdialogEspecializacionesAction] = React.useState<'add' | 'edit' | 'delete' | ''>('')
  const LocalAddDialog = AddDialog

  const [tableloadoptions, settableloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 50,
    sort: { field: null, method: 'DESC' },
    totalItems: 0,
  })
  const performtableload = (options) => {
    dispatch(options.searchString ? searchEspecializaciones(options) : loadEspecializaciones(options))
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
        <div className={theme.pages}>
          <div title="div" className={theme.mainarea}>
            <Container maxWidth="lg">
              <div title="Head" className={theme.tableHeading}>
                <Typography variant="h4">Especializacion list</Typography>
              </div>

              <Paper>
                <div title="Table Area" className={classes.tableResponsive}>
                  <div title="Table Toolbar" className={theme.tabletoolbar}>
                    <TextField
                      variant="outlined"
                      placeholder="Search Especializacion..."
                      margin="normal"
                      className={theme.extensibleInput}
                      type="text"
                      fullWidth
                      onChange={searchForEspecializaciones}
                    />

                    <LocalAddDialog
                      isOpen={dialogEspecializacionesAction !== ''}
                      onOpen={() => setdialogEspecializacionesAction('add')}
                      onSave={() => setdialogEspecializacionesAction('')}
                      onClose={() => setdialogEspecializacionesAction('')}
                      action={dialogEspecializacionesAction}
                      addOptions={{ title: 'Add Especializacion', text: 'Enter Especializacion data', button: 'Add' }}
                      editOptions={{ title: 'Edit Especializacion', text: 'Update Especializacion data', button: 'Edit' }}
                      removeOptions={{ title: 'Borrar', text: 'Estás seguro?', button: 'Confirmar' }}
                      saveDataHandler={(data: IEspecializacionesItem) => {
                        if (dialogEspecializacionesAction === 'delete') {
                          dispatch(removeEspecializacion(data))
                        } else {
                          dialogEspecializacionesAction === 'add' ? dispatch(addEspecializaciones(data)) : dispatch(editEspecializaciones(data))
                        }
                      }}
                      color="primary"
                      data={Especializacionesdata}
                      initialData={initialDataEspecializaciones}
                      setData={setEspecializacionesData}
                      allowMultipleSubmit={dialogEspecializacionesAction === 'add'}
                    >
                      <FileUpload
                        label="LogoUno"
                        value={Especializacionesdata.LogoUno}
                        onChange={handleEspecializacionesChange('LogoUno')}
                        variant="standard"
                      />

                      <TextField
                        margin="dense"
                        label="Texto"
                        type="text"
                        fullWidth
                        className={'field_Texto'}
                        variant="standard"
                        value={Especializacionesdata.Texto || ''}
                        onChange={handleEspecializacionesChange('Texto')}
                        error={especializacionesData?.errField === 'Texto'}
                        helperText={especializacionesData?.errField === 'Texto' && especializacionesData.errMessage}
                      />

                      <FileUpload
                        label="LogoDos"
                        value={Especializacionesdata.LogoDos}
                        onChange={handleEspecializacionesChange('LogoDos')}
                        variant="standard"
                      />

                      <TextField
                        margin="dense"
                        label="Url"
                        type="text"
                        fullWidth
                        className={'field_Url'}
                        variant="standard"
                        value={Especializacionesdata.Url || ''}
                        onChange={handleEspecializacionesChange('Url')}
                        error={especializacionesData?.errField === 'Url'}
                        helperText={especializacionesData?.errField === 'Url' && especializacionesData.errMessage}
                      />
                    </LocalAddDialog>
                  </div>

                  <div title="Body">
                    <Table
                      tableHead={['LogoUno', 'Texto', 'LogoDos', 'Url', 'Actions']}
                      tableData={
                        especializacionesData.foundespecializaciones.length
                          ? especializacionesData.foundespecializaciones
                          : (especializacionesData.especializaciones as any)
                      }
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
                      <Field value={(fieldData: any) => (fieldData.LogoUno ? <img src={`/img/${fieldData.LogoUno}`} /> : <div />)} />

                      <Field value={(fieldData: any) => fieldData.Texto} />

                      <Field value={(fieldData: any) => (fieldData.LogoDos ? <img src={`/img/${fieldData.LogoDos}`} /> : <div />)} />

                      <Field value={(fieldData: any) => fieldData.Url} />
                      <div className={classes.actionsArea}>
                        <IconButton
                          aria-label="edit"
                          color="primary"
                          onClickCapture={(e: any) => {
                            setEspecializacionesData(e.element)
                            setdialogEspecializacionesAction('edit')
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          color="primary"
                          onClickCapture={(e: any) => {
                            setEspecializacionesData(e.element)
                            setdialogEspecializacionesAction('delete')
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
                      totalItems={especializacionesData.totalDocs}
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

export default Especializaciones
