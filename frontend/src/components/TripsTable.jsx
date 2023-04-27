import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const TripsTable = (props) => {


    const {userId, tripId} = useParams();
    const {tripData, setTripData} = props;
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:5000/${userId}/trips`)
            .then(res => {
                console.log(res.data.data)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <div class="table-responsive-sm">
            <h2 className='text-center'>Your Trips</h2>
                <table class="table tablesize tablehead">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                    tripData.map((trip) => {
                        return (
                            <tr key={trip.id}>
                                <td><Link to={"#"}>{trip.name}</Link></td>
                                <td>{trip.address}</td>
                                <td>{trip.notes}</td>
                            </tr>
                        )
                    })
                    }
                </tbody>
                </table>
            </div>
        </div>
  )
}

export default TripsTable