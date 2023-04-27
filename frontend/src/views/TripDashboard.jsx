import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import AddPlace from '../components/AddPlace'
import PlacesList from '../components/PlacesList'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import '../App.css'
import Maps from '../components/Maps'


const TripDashboard = (props) => {

    const { userId, tripId } = useParams();
    const { tripTitle, setTripTitle, isLoggedIn, setIsLoggedIn } = props;
    const [tripData, setTripData] = useState([]);
    const [placeData, setPlaceData] = useState({});
    const [isEdit, setIsEdit] = useState(false)


    useEffect(() => {
        axios.get(`http://localhost:5000/dashboard/${userId}/plan/${tripId}`)
            .then(res => {
                setTripTitle(res.data.tripTitle.title)
                setTripData(res.data.data)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <Header />
            <div>
                <h1 className='text-center my-3'>{tripTitle}</h1>
            </div>

            <div className="row m-2">
                <div className="col-6">

                    <AddPlace isEdit={isEdit} setIsEdit={setIsEdit} placeData={placeData} setPlaceData={setPlaceData} />

                </div>
                <div className='col-4'>
                    <Maps />
                </div>
            </div>
            <div className="row m-2">
                <div className='col-6'>
                    <PlacesList tripData={tripData} setTripData={setTripData} placeData={placeData} setPlaceData={setPlaceData} isEdit={isEdit} setIsEdit={setIsEdit} />
                </div>
            </div>
        </div>
    )
}

export default TripDashboard