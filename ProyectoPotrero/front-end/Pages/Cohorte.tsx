import ProyectoPotreromodulescss from 'dist/css/ProyectoPotrero.module.scss'
import React, { FunctionComponent } from 'react'
import baseClasses from './layout.module.scss'

const Cohorte: FunctionComponent = (props: any) => {
  const classes = baseClasses
  const theme = ProyectoPotreromodulescss

  // Theme selection

  // Theme selection

  return (
    <React.Fragment>
      <div className={classes.mainPanel}></div>
    </React.Fragment>
  )
}

export default Cohorte
