import axios from 'axios';
import React, {useState} from 'react';
import { useParams } from 'react-router-dom';

const AddPlace = () => {

    const {userId, tripId} = useParams();
    const [placeName, setPlaceName] = useState("")
    const [address, setAddress] = useState("")
    const [notes, setNotes] = useState("")


    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:5000/dashboard/${userId}/plan/${tripId}/new`, {name: placeName, address, notes})
            .then(res => {
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='p-3 m-2 dashboard-component'>
            <form onSubmit={handleSubmit}>
                <h2 className='text-center'>Add a Place</h2>
                <div className="form-group my-2 row">
                    <div className="col">
                        <label className="form-label" htmlFor="placeName">Place Name</label>
                        <input className='form-control' type="text" name='placeName' />
                    </div>
                    <div className="col">
                        <label className="form-label" htmlFor="address">Address</label>
                        <input className='form-control' type="text" name='address' />
                    </div>
                </div>
                <div className="form-group mb-2">
                    <label className="form-label" htmlFor="notes">Notes</label>
                    <textarea className="form-control" rows={3} name="notes"></textarea>
                </div>
                <div className="d-flex justify-content-center">
                    <button className="btn">Add Place</button>
                </div>
            </form >
        </div >
    )
}

export default AddPlace