import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dashboard from './Dashboard.jsx';
import Login from './Login.jsx';
import Landing from './Landing.jsx';

const App = () => (
  <MuiThemeProvider>
    <Dashboard />
  </MuiThemeProvider>
);
export default App;
