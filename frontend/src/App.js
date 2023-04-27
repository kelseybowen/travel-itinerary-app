import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginReg from './views/LoginReg';
import Dashboard from './views/Dashboard';
import TripDashboard from './views/TripDashboard';
import PlaceEditDash from './views/PlaceEditDash';
import Protected from './Protected';
import UsersTrips from './views/UsersTrips';


function App() {

  const [tripTitle, setTripTitle] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* <Route element={<LoginReg isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} path='/' />
          <Route path='/dashboard/:userId' element={
            <Protected isLoggedIn={isLoggedIn}>
              <Dashboard tripTitle={tripTitle} setTripTitle={setTripTitle} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
            </Protected>
          }
          />
          <Route path='/dashboard/:userId/plan/:tripId' element={
            <Protected isLoggedIn={isLoggedIn}>
              <TripDashboard tripTitle={tripTitle} setTripTitle={setTripTitle} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
            </Protected>
          }
          />
          <Route path='/dashboard/:userId/plan/:tripId/:placeId' element={
            <Protected isLoggedIn={isLoggedIn}>
              <PlaceEditDash tripTitle={tripTitle} setTripTitle={setTripTitle} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
            </Protected>
          }
          /> */}
          <Route element={<Dashboard tripTitle={tripTitle} setTripTitle={setTripTitle} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} path='/dashboard/:userId' />
          <Route element={<TripDashboard tripTitle={tripTitle} setTripTitle={setTripTitle} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} path='/dashboard/:userId/plan/:tripId' />
          <Route element={<PlaceEditDash tripTitle={tripTitle} setTripTitle={setTripTitle} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} path='/dashboard/:userId/plan/:tripId/:placeId' />
          <Route element={<LoginReg />} path='/' />
          <Route element={<Dashboard tripTitle={tripTitle} setTripTitle={setTripTitle}/>} path='/dashboard/:userId' />
          <Route element={<TripDashboard tripTitle={tripTitle} setTripTitle={setTripTitle}/>} path='/dashboard/:userId/plan/:tripId' />
          <Route element={<PlaceEditDash tripTitle={tripTitle} setTripTitle={setTripTitle}/>} path='/dashboard/:userId/plan/:tripId/:placeId' />
          <Route element={<UsersTrips tripTitle={tripTitle} setTripTitle={setTripTitle}/>} path=':userId/trips' />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
