import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PlacesList = (props) => {

    const {userId, tripId} = useParams();
    const {tripData, setTripData, placeData, setPlaceData} = props;
    const navigate = useNavigate();

    useEffect(() => {
        console.log(`hello ${tripData}`)
        axios.get(`http://localhost:5000/dashboard/${userId}/plan/${tripId}`)
            .then(res => {
                console.log(res.data.data)
                setTripData(res.data.data)
            })
            .catch(err => console.log(err))
    }, [])

    const handleDelete = (placeId) => {
        axios.get(`http://localhost:5000/dashboard/${userId}/plan/${tripId}/${placeId}/delete`)
        .then(res => {
            removeFromDom(placeId);
        })
        .catch(err => console.log(err))
    }

    const handleEdit = (placeId) => {
        window.location.href = (`/dashboard/${userId}/plan/${tripId}/${placeId}`)
        // navigate(`/dashboard/${userId}/plan/${tripId}/${placeId}`)
    }

    const removeFromDom = placeId => {
        setTripData(tripData.filter(place => place.id !== placeId))
    }

    return (
        <div className='dashboard-component p-3 m-2'>
            <h2 className='text-center'>Places</h2>
            <table className='table table-light table-striped'>
                <thead>
                    <tr>
                        <th>Place Name</th>
                        <th>Address</th>
                        <th>Notes</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {
                    tripData.map((place) => {
                        return (
                            <tr key={place.id}>
                                <td><Link to={"#"}>{place.name}</Link></td>
                                <td>{place.address}</td>
                                <td>{place.notes}</td>
                                <td>
                                    <button className="btn btn-primary" onClick={() => handleEdit(place.id)} style={{"color": "white", "textDecoration": "none"}}>Edit</button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(place.id)} style={{"color": "white", "textDecoration": "none"}}>Delete</button>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </div>
    )
}

export default PlacesList