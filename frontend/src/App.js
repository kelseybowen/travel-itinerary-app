import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './views/Dashboard';
import LoginReg from './views/LoginReg';
import AddPlace from './components/AddPlace';
import { ThemeProvider, createTheme } from '@mui/material/styles';



function App() {

  // const theme = createTheme({
  //   palette: {
  //     black: '000E14',
  //     grey: '3D3D3D',
  //     blue: '3E6E8E',
  //     yellow: 'FDA821'
  //   }
  // });


  return (
    <div>
      {/* <ThemeProvider theme={theme}> */}
      <BrowserRouter>
        <Routes>
          <Route element={<LoginReg />} path='/' />
          <Route element={<Dashboard />} path='/dashboard/:userId' />
        </Routes>
      </BrowserRouter>
      {/* </ThemeProvider> */}
    </div>
  );
}

export default App;
