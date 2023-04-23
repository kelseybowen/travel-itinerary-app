import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PlacesList = (props) => {

    const { tripData } = props;
    return (
        <div className='dashboard-component p-3'>
            <h2>Places</h2>
            <ul className='list-group'>
                {
                    tripData.map((trip) => {
                        return (
                            <li className='list-group-item' key={trip.id}><Link to={`/dashboard/${trip.user_id}/${trip.id}`}>{trip.name}</Link></li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default PlacesList