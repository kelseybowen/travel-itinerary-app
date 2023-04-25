import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import AddPlace from '../components/AddPlace'
import EditPlace from '../components/EditPlace'
import PlacesList from '../components/PlacesList'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import '../App.css'
import Maps from '../components/Maps'


const TripDashboard = (props) => {

    const { userId, tripId } = useParams();
    const { tripTitle, setTripTitle } = props;
    const [tripData, setTripData] = useState([]);
    const [placeData, setPlaceData] = useState({});
    const [isEdit, setIsEdit] = useState(false)
    const [heading, setHeading] = useState("Add A Place")
    const [buttonText, setButtonText] = useState("Add Place")


    useEffect(() => {
        axios.get(`http://localhost:5000/dashboard/${userId}/plan/${tripId}`)
            .then(res => {
                setTripTitle(res.data.tripTitle.title)
                setTripData(res.data.data)
            })
            .catch(err => console.log(err))
    }, [tripId])

    return (
        <div>
            <Header />
            <div>
                <h1 className='text-center my-3'>{tripTitle}</h1>
            </div>

            <div className="row m-2">
                <div className="col-6">
                    {isEdit ? (
                        <EditPlace placeData={placeData} setPlaceData={setPlaceData} isEdit={isEdit} setIsEdit={setIsEdit} heading={heading} setHeading={setHeading}/>
                    ) : (
                        <AddPlace isEdit={isEdit} setIsEdit={setIsEdit} placeData={placeData} setPlaceData={setPlaceData} heading={heading} setHeading={setHeading}/>
                    )
                    }
                </div>
                <div className='col-4'>
                    <Maps />
                </div>
            </div>
            <div className="row m-2">
                <div className='col-6'>
                    <PlacesList tripData={tripData} setTripData={setTripData} placeData={placeData} setPlaceData={setPlaceData} isEdit={isEdit} setIsEdit={setIsEdit} heading={heading} setHeading={setHeading}/>
                </div>
            </div>
        </div>
    )
}

export default TripDashboard