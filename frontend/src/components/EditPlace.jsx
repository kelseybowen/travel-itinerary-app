import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

const EditPlace = (props) => {

    const {userId, tripId, placeId} = useParams();
    const { placeName, setPlaceName, address, setAddress, notes, setNotes } = props;

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:5000/dashboard/${userId}/plan/${tripId}/${placeId}/update`, {name: placeName, address, notes})
            .then(res => {
                window.location.href = (`/dashboard/${userId}/plan/${tripId}`)
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='p-3 m-2 dashboard-component'>
            <form onSubmit={handleSubmit}>
                <h2 className='text-center'>Edit Place</h2>
                <div className="form-group my-2 row">
                    <div className="col">
                        <label className="form-label" htmlFor="placeName">Place Name</label>
                        <input className='form-control' type="text" name='placeName' defaultValue={placeName} onChange={e => setPlaceName( e.target.value)} />
                    </div>
                    <div className="col">
                        <label className="form-label" htmlFor="address">Address</label>
                        <input className='form-control' type="text" name='address' defaultValue={address} onChange={e => setAddress(e.target.value)} />
                    </div>
                </div>
                <div className="form-group mb-2">
                    <label className="form-label" htmlFor="notes">Notes</label>
                    <textarea className="form-control" rows={3} name="notes" defaultValue={notes} onChange={e => setNotes(e.target.value)} ></textarea>
                </div>
                <div className="d-flex justify-content-center">
                    <button className="btn">Update</button>
                </div>
            </form >
        </div >
    )
}

export default EditPlace