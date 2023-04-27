import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../App.css';
import Notes from '../components/Notes';
import OneTrip from '../components/OneTrip';
import TripsTable from '../components/TripsTable';
import Header from '../components/Header';
import PlacesList from '../components/PlacesList'

const UsersTrips = (props) => {

  const { userId } = useParams();
  const {tripTitle, setTripTitle, isLoggedIn, setIsLoggedIn, tripData, setTripData} = props;
  const [placeData, setPlaceData] = useState({});

  return (
      <div>
        <h1>UsersTrips</h1>
        <TripsTable />
        <OneTrip tripData={tripData} setTripData={setTripData}/>
        <PlacesList tripData={tripData} setTripData={setTripData} placeData={placeData} setPlaceData={setPlaceData}/>
    </div>
  )
}

export default UsersTrips