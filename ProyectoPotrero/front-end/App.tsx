import React from 'react'
import { Route, Switch } from 'react-router-dom'

const Cohortes = React.lazy(() => import('./Pages/Cohortes'))
const Proyectos = React.lazy(() => import('./Pages/Proyectos'))
const Especializaciones = React.lazy(() => import('./Pages/Especializaciones'))
const Admin = React.lazy(() => import('./Pages/Admin'))
const Grupos = React.lazy(() => import('./Pages/Grupos'))
const Cohorte = React.lazy(() => import('./Pages/Cohorte'))
const CargaProyecto = React.lazy(() => import('./Pages/cargaproyecto'))
const Dashboard = React.lazy(() => import('./Pages/dashboard'))

const App: React.FunctionComponent = (props: any) => {
  const routes = [
    {
      path: '/Cohortes',
      name: 'Cohortes',
      component: Cohortes,
    },
    {
      path: '/Proyectos',
      name: 'Proyectos',
      component: Proyectos,
    },
    {
      path: '/Especializaciones',
      name: 'Especializaciones',
      component: Especializaciones,
    },
    {
      path: '/Admin',
      name: 'Admin',
      component: Admin,
    },
    {
      path: '/cohorte/:ID',
      name: 'Grupos',
      component: Grupos,
    },
    {
      path: '/cohorte',
      name: 'Cohorte',
      component: Cohorte,
    },
    {
      path: '/carga',
      name: 'CargaProyecto',
      component: CargaProyecto,
    },
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
    },
  ]

  const switchRoutes = (
    <Switch>
      {routes.map((prop, key) => {
        return <Route exact path={prop.path} component={prop.component} key={key} />
      })}
    </Switch>
  )

  return (
    <React.Fragment>
      <React.Suspense fallback={<span>Loading</span>}>
        <React.Fragment>{switchRoutes}</React.Fragment>
      </React.Suspense>
    </React.Fragment>
  )
}

export default App
