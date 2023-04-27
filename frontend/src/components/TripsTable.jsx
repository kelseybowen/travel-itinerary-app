import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import OneTrip from './OneTrip';
import Header from '../components/Header'

const TripsTable = (props) => {
    const{userId} = useParams();
    const[tripListData, setTripListData] = useState([]);

    useEffect(() => {
    axios.get(`http://localhost:5000/${userId}/trips`)
        .then(res => {
            console.log(res.data.trips)
            setTripListData(res.data.trips)
        })
        .catch(err => console.log(err))
}, [])

    return (
        <div>
            <Header />
            <div className='dashboard-component p-3 m-2'>
            <h2 className='text-center'>My Trips</h2>
            <table className='table table-light table-striped'>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                    tripListData.map((trip) => {
                        return (
                            <tr key={trip.id}>
                                <td><Link to={`/${userId}/trips/${trip.id}`}>{trip.title}</Link></td>
                                <td>{trip.start_date}</td>
                                <td>{trip.end_date}</td>
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