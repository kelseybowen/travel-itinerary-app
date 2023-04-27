import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../App.css';
import TripsTable from '../components/TripsTable';
import Header from '../components/Header';

const UsersTrips = (props) => {

  const { userId } = useParams();
  const {tripTitle, setTripTitle, isLoggedIn, setIsLoggedIn} = props;

  return (
    <div>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <h1>UsersTrips</h1>
        <TripsTable />
    </div>
  )
}

export default UsersTrips