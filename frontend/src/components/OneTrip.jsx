import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const OneTrip = (props) => {
    const{userId, tripId} = useParams();
    const[oneTripData, setOneTripData]= useState([]);
    const{tripData, setTripData} = props;

    useEffect(() => {
        console.log(`hello ${tripData}`)
        axios.get(`http://localhost:5000/${userId}/trips/${tripId}`)
            .then(res => {
                console.log(res.data.data)
                setOneTripData(res.data.data[0])
            })
            .catch(err => console.log(err))
    }, [])

  return (
    <div>
    <div className='dashboard-component p-3 m-2'>
            <h2 className='text-center'>Trip Detail</h2>
            <table className='table table-light table-striped'>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>City</th>
                    <th>State</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{oneTripData.title}</td>
                    <td>{oneTripData.city}</td>
                    <td>{oneTripData.state}</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
  )
}

export default OneTrip