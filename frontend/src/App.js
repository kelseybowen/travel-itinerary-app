import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginReg from './views/LoginReg';
import Dashboard from './views/Dashboard';
import TripDashboard from './views/TripDashboard';


function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<LoginReg />} path='/' />
          <Route element={<Dashboard />} path='/dashboard/:userId' />
          <Route element={<TripDashboard />} path='/dashboard/:userId/plan/:tripId' />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
