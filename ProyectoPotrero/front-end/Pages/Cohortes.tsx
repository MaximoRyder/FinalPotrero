import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import grey from '@mui/material/colors/grey'
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
import { addCohortes, editCohortes, loadCohortes, removeCohorte, searchCohortes } from '../store/actions/cohortesActions'
import { ICohortesItem } from '../store/models'
import { IState } from '../store/reducers/index'
import baseClasses from './layout.module.scss'

const aptugotheme = createTheme({
  palette: {
    primary: grey,
  },
})

const Cohortes: FunctionComponent = (props: any) => {
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
  const cohortesData = useSelector((state: IState) => state.cohortes)
  const theme = ProyectoPotreromodulescss
  const dispatch = useDispatch()
  let searchTimeout = null
  const searchForCohortes = (event) => {
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
    dispatch(options.searchString ? searchCohortes(options) : loadCohortes(options))
  }
  React.useEffect(() => {
    performsearchFieldload({
      ...searchFieldloadoptions,
    })
  }, [searchFieldloadoptions])
  const [dialogCohortesAction, setdialogCohortesAction] = React.useState<'add' | 'edit' | 'delete' | ''>('')
  const LocalAddDialog = AddDialog

  const [tableloadoptions, settableloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 50,
    sort: { field: null, method: 'DESC' },
    totalItems: 0,
  })
  const performtableload = (options) => {
    dispatch(options.searchString ? searchCohortes(options) : loadCohortes(options))
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
                <Typography variant="h4">Cohorte list</Typography>
              </div>

              <Paper>
                <div title="Table Area" className={classes.tableResponsive}>
                  <div title="Table Toolbar" className={theme.tabletoolbar}>
                    <TextField
                      variant="outlined"
                      placeholder="Search Cohorte..."
                      margin="normal"
                      className={theme.extensibleInput}
                      type="text"
                      fullWidth
                      onChange={searchForCohortes}
                    />

                    <LocalAddDialog
                      isOpen={dialogCohortesAction !== ''}
                      onOpen={() => setdialogCohortesAction('add')}
                      onSave={() => setdialogCohortesAction('')}
                      onClose={() => setdialogCohortesAction('')}
                      action={dialogCohortesAction}
                      addOptions={{ title: 'Add Cohorte', text: 'Enter Cohorte data', button: 'Add' }}
                      editOptions={{ title: 'Edit Cohorte', text: 'Update Cohorte data', button: 'Edit' }}
                      removeOptions={{ title: 'Borrar Cohorte', text: 'Estas Seguro?', button: 'Aceptar' }}
                      saveDataHandler={(data: ICohortesItem) => {
                        if (dialogCohortesAction === 'delete') {
                          dispatch(removeCohorte(data))
                        } else {
                          dialogCohortesAction === 'add' ? dispatch(addCohortes(data)) : dispatch(editCohortes(data))
                        }
                      }}
                      color="primary"
                      data={Cohortesdata}
                      initialData={initialDataCohortes}
                      setData={setCohortesData}
                      allowMultipleSubmit={dialogCohortesAction === 'add'}
                    >
                      <TextField
                        margin="dense"
                        label="Curso"
                        type="text"
                        fullWidth
                        className={'field_Curso'}
                        variant="standard"
                        value={Cohortesdata.Curso || ''}
                        onChange={handleCohortesChange('Curso')}
                        error={cohortesData?.errField === 'Curso'}
                        helperText={cohortesData?.errField === 'Curso' && cohortesData.errMessage}
                      />

                      <FileUpload label="Img" value={Cohortesdata.Img} onChange={handleCohortesChange('Img')} variant="standard" />

                      <TextField
                        margin="dense"
                        label="FechaInicio"
                        type="text"
                        fullWidth
                        className={'field_FechaInicio'}
                        variant="standard"
                        value={Cohortesdata.FechaInicio || ''}
                        onChange={handleCohortesChange('FechaInicio')}
                        error={cohortesData?.errField === 'FechaInicio'}
                        helperText={cohortesData?.errField === 'FechaInicio' && cohortesData.errMessage}
                      />
                    </LocalAddDialog>
                  </div>

                  <div title="Body">
                    <Table
                      tableHead={['Curso', 'Img', 'FechaInicio', 'Actions']}
                      tableData={cohortesData.foundcohortes.length ? cohortesData.foundcohortes : (cohortesData.cohortes as any)}
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
                      <Field value={(fieldData: any) => fieldData.Curso} />

                      <Field value={(fieldData: any) => (fieldData.Img ? <img src={`/img/${fieldData.Img}`} /> : <div />)} />

                      <Field value={(fieldData: any) => fieldData.FechaInicio} />
                      <div className={classes.actionsArea}>
                        <IconButton
                          aria-label="edit"
                          color="primary"
                          onClickCapture={(e: any) => {
                            setCohortesData(e.element)
                            setdialogCohortesAction('edit')
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          color="primary"
                          onClickCapture={(e: any) => {
                            setCohortesData(e.element)
                            setdialogCohortesAction('delete')
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
                      totalItems={cohortesData.totalDocs}
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

export default Cohortes
