import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const PlacesList = (props) => {

    const {userId, tripId} = useParams();
    const {tripData, setTripData} = props;

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
                                <td><Link to={`/dashboard/${userId}/${tripId}`}>{place.name}</Link></td>
                                <td>{place.address}</td>
                                <td>{place.notes}</td>
                                <td>
                                    <button className="btn btn-primary"><Link to={`/${userId}/trips/${tripId}/${place.id}/edit`} style={{"color": "white", "textDecoration": "none"}}>Edit</Link></button>
                                    <button className="btn btn-danger"><Link to={`/${userId}/trips/${tripId}/${place.id}/delete`} style={{"color": "white", "textDecoration": "none"}}>Delete</Link></button>
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