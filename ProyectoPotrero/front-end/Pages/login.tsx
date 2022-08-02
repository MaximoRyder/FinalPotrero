import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import green from '@mui/material/colors/green'
import Container from '@mui/material/Container'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import ProyectoPotreromodulescss from 'dist/css/ProyectoPotrero.module.scss'
import React, { FunctionComponent } from 'react'
import { useGoogleLogin } from 'react-google-login'
import { NavLink } from 'react-router-dom'
import AuthService from '../services/auth.service'
import baseClasses from './layout.module.scss'

const aptugotheme = createTheme({
  palette: {
    primary: green,
  },
})

const LoginPage: FunctionComponent = (props: any) => {
  const classes = baseClasses
  const theme = ProyectoPotreromodulescss
  const [loginError, setloginError] = React.useState<any>(null)
  const [loginData, setloginData] = React.useState<any>({
    Email: '',
    Password: '',
    RememberMe: false,
  })

  // Theme selection

  const onGoogleSuccess = (res) => {
    console.log('Login Success: Current User: ', res.profileObj)
  }

  const onGoogleFailure = (res) => {
    console.log('Login Failed: res: ', res)
    if (res.error === 'popup_closed_by_user') {
      setloginError('You must complete the login process in order to login.')
    }
  }

  const { signIn: googleSignIn } = useGoogleLogin({
    onSuccess: onGoogleSuccess,
    onFailure: onGoogleFailure,
    clientId: '185605994716-97itv5an2ligdaq8b4r3l4r8h95rlip6.apps.googleusercontent.com',
    isSignedIn: false,
    accessType: 'offline',
  })

  const handleLogin = () => {
    AuthService.login(loginData.Email, loginData.Password).then(
      (res) => {
        console.log(res)
        props.history.push('/admin')
      },
      (error) => {
        setloginError(error.response.data.message)
      }
    )
  }

  return (
    <React.Fragment>
      <ThemeProvider theme={aptugotheme}>
        <div className={theme.bodyGeneral}>
          <Container className={theme.loginPage} maxWidth={false}>
            <Grid container alignItems="stretch">
              <Grid item md={9}>
                <div title="Register Area" className={theme.right}>
                  Don't have an account?
                  <a className={theme.greenText} href="/Register">
                    Register!
                  </a>
                </div>

                <div title="Login Box" className={theme.loginBox}>
                  <div title="Heading">
                    <Typography variant="h3">Sign in to Potrero Digital</Typography>

                    <Typography variant="body1">Enter your details below.</Typography>
                  </div>

                  {loginError && (
                    <React.Fragment>
                      <Alert variant="standard" severity="error">
                        {loginError}
                      </Alert>
                    </React.Fragment>
                  )}

                  <TextField
                    variant="outlined"
                    placeholder="Email Address"
                    margin="normal"
                    label="Email"
                    type="text"
                    fullWidth
                    value={loginData.Email}
                    onChange={(e) => {
                      setloginData({ ...loginData, Email: e.target.value })
                    }}
                  />

                  <TextField
                    variant="outlined"
                    margin="normal"
                    label="Password"
                    type="password"
                    fullWidth
                    value={loginData.Password}
                    onChange={(e) => {
                      setloginData({ ...loginData, Password: e.target.value })
                    }}
                  />

                  <div title="div" className={theme.flexLine}>
                    <FormControl margin="dense">
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={loginData.RememberMe}
                            onClickCapture={() => {
                              setloginData({ ...loginData, RememberMe: !loginData.RememberMe })
                            }}
                          />
                        }
                        label="Remember me"
                      />
                    </FormControl>

                    <NavLink to="/forgot">
                      <span className={theme.greenText}>Forgot password?</span>
                    </NavLink>
                  </div>

                  <Button variant="contained" color="primary" onClickCapture={handleLogin} fullWidth>
                    Login
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Container>
        </div>
      </ThemeProvider>
    </React.Fragment>
  )
}

export default LoginPage
