import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import ProyectoPotreromodulescss from 'dist/css/ProyectoPotrero.module.scss'
import React, { FunctionComponent } from 'react'
import { NavLink } from 'react-router-dom'
import baseClasses from './layout.module.scss'

const Admin: FunctionComponent = (props: any) => {
  const classes = baseClasses
  const theme = ProyectoPotreromodulescss

  // Theme selection

  return (
    <React.Fragment>
      <div className={classes.mainPanel}>
        <div title="NavBar Admin">
          <Container>
            <AppBar elevation={0} position="relative" title="">
              <Toolbar>
                <NavLink exact to="/Especializaciones" key="GefcrNEX">
                  <ListItem button className={classes.itemLink}>
                    <ListItemText>Especializaciones</ListItemText>
                  </ListItem>
                </NavLink>

                <NavLink exact to="/Proyectos" key="CX1pS8pK">
                  <ListItem button className={classes.itemLink}>
                    <ListItemText>Proyectos</ListItemText>
                  </ListItem>
                </NavLink>

                <NavLink exact to="/Cohortes" key="Gqeq1FRS">
                  <ListItem button className={classes.itemLink}>
                    <ListItemText>Cohortes</ListItemText>
                  </ListItem>
                </NavLink>
              </Toolbar>
            </AppBar>
          </Container>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Admin
