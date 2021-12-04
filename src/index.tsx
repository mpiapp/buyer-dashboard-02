import React from 'react';
import ReactDOM from 'react-dom';
import { store } from './app/store';
import { Provider } from 'react-redux';
import AppRoute from './routes';
import './assets/scss/root.scss'
import { ThemeProvider } from '@mui/material/styles';
import theme  from './theme/index'
// import Bugsnag from '@bugsnag/js'
// import {BugsnagPluginReactResult} from '@bugsnag/plugin-react'
// import BugsnagPluginReact from '@bugsnag/plugin-react'

// Bugsnag.start({
//   apiKey: '343213f49aadc853875be645dfd1f168',
//   plugins: [new BugsnagPluginReact()]
// })

// const plugin = Bugsnag.getPlugin("react") as BugsnagPluginReactResult
// const ErrorBoundary = plugin.createErrorBoundary(React)

ReactDOM.render(
  <React.StrictMode>
    {/* <ErrorBoundary> */}
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <AppRoute />
      </ThemeProvider>
    </Provider>
    {/* </ErrorBoundary> */}
  </React.StrictMode>,
  document.getElementById('root')
);

