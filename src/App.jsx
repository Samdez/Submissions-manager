import { CssBaseline } from '@material-ui/core';
import React from 'react';
import Router from './components/Router';
import { TracksProvider } from './context/TracksContext';


function App() {
  return (
    <>
      <TracksProvider>
        <CssBaseline />
        <Router />
      </TracksProvider>
    </>
  );
}

export default App;
