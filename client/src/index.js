import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { lightGreen400, teal900 } from 'material-ui/styles/colors'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { BrowserRouter } from 'react-router-dom'

import App from './App'

import './main.css'

injectTapEventPlugin()

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: lightGreen400,
    textColor: teal900,
    alternateTextColor: teal900,
  },
})

ReactDOM.render((
  <MuiThemeProvider muiTheme={muiTheme}>
    <BrowserRouter>
    	<App />
    </BrowserRouter>
  </MuiThemeProvider>),
document.getElementById('root'))


