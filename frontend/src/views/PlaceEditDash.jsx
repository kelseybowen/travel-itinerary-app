import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Header from '../components/Header'
import EditPlace from '../components/EditPlace';
import { useParams } from 'react-router-dom';
import Maps from '../components/Maps';

const PlaceEditDash = (props) => {

    const { userId, tripId, placeId } = useParams();
    const [placeName, setPlaceName] = useState("")
    const [address, setAddress] = useState("");
    const [notes, setNotes] = useState("");


    useEffect(() => {
        axios.get(`http://localhost:5000/dashboard/${userId}/plan/${tripId}/${placeId}/edit`)
            .then(res => {
                setPlaceName(res.data.data.name)
                setAddress(res.data.data.address)
                setNotes(res.data.data.notes)
            })
            .catch(err => console.log(err))
    }, [])

    const { tripTitle } = props;
    return (
        <div>
            <Header />
            <div>
                <h1 className='text-center my-3'>{tripTitle}</h1>
            </div>
            <div className='row m-2'>
                <div className="col-6">
                    <EditPlace placeName={placeName} setPlaceName={setPlaceName} address={address} setAddress={setAddress} notes={notes} setNotes={setNotes} />
                </div>
                <div className="col-6">
                    <Maps />
                </div>
            </div>




        </div>
    )
}

export default PlaceEditDash