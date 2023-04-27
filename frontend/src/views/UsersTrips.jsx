import React from 'react'
import Notes from '../components/Notes'
import OneTrip from '../components/OneTrip'
import TripsTable from '../components/TripsTable'

const UsersTrips = () => {
  return (
    <div>
        <h1>UsersTrips</h1>
        <TripsTable />
        <OneTrip />
        <Notes />
    </div>
  )
}

export default UsersTrips