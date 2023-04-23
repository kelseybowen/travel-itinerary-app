import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './views/Dashboard';
import LoginReg from './views/LoginReg';


function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<LoginReg />} path='/' />
          <Route element={<Dashboard />} path='/dashboard/:userId' />
          <Route element={<Dashboard />} path='/dashboard/:userId/plan' />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
