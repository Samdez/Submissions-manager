import { CssBaseline } from '@material-ui/core';
import React from 'react';
import Router from './components/Router';
import { AuthProvider } from './context/AuthContext';



function App() {
  return (
    <>
      <AuthProvider>
        <CssBaseline />
        <Router />
      </AuthProvider>
    </>
  );
}

export default App;
