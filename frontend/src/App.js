import React, {useState} from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './views/Dashboard';
import LoginReg from './views/LoginReg';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<LoginReg/>} path='/'/>
          <Route element={<Dashboard/>} path='/dashboard/:userId'/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
