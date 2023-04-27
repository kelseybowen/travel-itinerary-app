import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import AddTrip from '../components/AddTrip';
import '../App.css'
import Maps from '../components/Maps';

const Dashboard = (props) => {

    const { userId } = useParams();
    const {tripTitle, setTripTitle, isLoggedIn, setIsLoggedIn} = props;

    useEffect(() => {
        setIsLoggedIn(true)
    }, [])

    return (

        <div>
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

            <div className='row justify-content-evenly'>
                <div className='col-6'>
                    <AddTrip tripTitle={tripTitle} setTripTitle={setTripTitle}/>
                </div>

                <div className='col-6'>
                    <Maps />
                </div>
            </div>
        </div >
    )
}

export default Dashboard