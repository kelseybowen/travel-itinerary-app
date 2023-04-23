import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import AddPlace from '../components/AddPlace'
import PlacesList from '../components/PlacesList'
import { useParams } from 'react-router-dom'
import OpenAI from '../components/OpenAI'
import axios from 'axios'
import '../App.css'


const TripDashboard = () => {

    const {userId, tripId} = useParams();
    const [tripData, setTripData] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/dashboard/${userId}/plan/${tripId}`)
            .then(res => {
                console.log(res)
                setTripData(res.data)

            })
            .catch(err => console.log(err))
    }, [])


    return (
        <div>
            <Header />

            <div className="row justify-content-evenly">
                <div className="col-4">
                    <AddPlace />
                </div>
                <div className='col-4'>
                    <OpenAI />
                </div>
            </div>
            <div className="row">
                <div className='col-3 m-5'>
                    <PlacesList tripData={tripData} setTripData={setTripData}/>
                </div>
            </div>
        </div>
    )
}

export default TripDashboard