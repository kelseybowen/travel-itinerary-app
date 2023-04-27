import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import AllUsers from '../components/AllUsers';
import TripsTaken from '../components/TripsTaken';
import UpcomingTrips from '../components/UpcomingTrips';
import Header from '../components/Header';

const Profile = (props) => {

  const { userId } = useParams();
  const {tripTitle, setTripTitle, isLoggedIn, setIsLoggedIn} = props;

  return (
    <div>

      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

        <h1>Profile</h1>
        <TripsTaken />
        <UpcomingTrips />
        <AllUsers />
    </div>
  )
}

export default Profile