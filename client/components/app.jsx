import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Event from './Event.jsx';

const App = () => (
  <MuiThemeProvider>
    <Event />
  </MuiThemeProvider>
);
export default App;
