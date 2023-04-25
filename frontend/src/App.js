import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginReg from './views/LoginReg';
import Dashboard from './views/Dashboard';
import TripDashboard from './views/TripDashboard';
import PlaceEditDash from './views/PlaceEditDash';


function App() {

  const [tripTitle, setTripTitle] = useState("");

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<LoginReg />} path='/' />
          <Route element={<Dashboard tripTitle={tripTitle} setTripTitle={setTripTitle}/>} path='/dashboard/:userId' />
          <Route element={<TripDashboard tripTitle={tripTitle} setTripTitle={setTripTitle}/>} path='/dashboard/:userId/plan/:tripId' />
          <Route element={<PlaceEditDash tripTitle={tripTitle} setTripTitle={setTripTitle}/>} path='/dashboard/:userId/plan/:tripId/:placeId' />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
