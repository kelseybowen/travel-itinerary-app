import React from 'react'
import AllUsers from '../components/AllUsers'
import TripsTaken from '../components/TripsTaken'
import UpcomingTrips from '../components/UpcomingTrips'

const Profile = () => {
  return (
    <div>
        <h1>Profile</h1>
        <TripsTaken />
        <UpcomingTrips />
        <AllUsers />
    </div>
  )
}

export default Profile