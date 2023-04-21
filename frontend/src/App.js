import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './views/Dashboard';
import LoginReg from './views/LoginReg';
import AddPlace from './components/AddPlace';


function App() {

  const [theme, setTheme] = useState("light");

  return (
    <div className={`App ${theme}`}>
      <BrowserRouter>
        <Routes>
          <Route element={<LoginReg />} path='/' />
          <Route element={<Dashboard />} path='/dashboard/:userId' />
          <Route element={<AddPlace />} path='/dashboard/:userId/:tripId' />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
