import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AddPlace = (props) => {

    const {userId, tripId, placeId} = useParams();
    const {placeData, setPlaceData, isEdit, setIsEdit, setHeading, setButtonText} = props;
    const [placeName, setPlaceName] = useState("")
    const [address, setAddress] = useState("");
    const [notes, setNotes] = useState("");
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:5000/dashboard/${userId}/plan/${tripId}/${placeId}/edit`)
        .then(res => {
            // setTripData(res.data);
            setPlaceData(res.data.data)
            // console.log(`place dataaaaaa ${placeData}`)
            // console.log(placeData)
            // placeId = placeData.id
            setIsEdit(true)
            setHeading("Edit Place")
            setButtonText("Update")
            // setPlaceName(res.data.data)
            navigate(`/dashboard/${userId}/plan/${tripId}/${placeId}`)
        })
        .catch(err => console.log(err))
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:5000/dashboard/${userId}/plan/${tripId}/${placeId}/edit/update`, {name: placeName, address, notes})
            .then(res => {
                console.log(res.data)
                setIsEdit(false)
                setHeading("Add a Place")
                navigate(`/dashboard/${userId}/plan/${tripId}`)
            })
            .catch(err => console.log(err))
            setPlaceData({})
    }

    return (
        <div className='p-3 m-2 dashboard-component'>
            <form onSubmit={handleSubmit}>
                <h2 className='text-center'>Edit Place</h2>
                <div className="form-group my-2 row">
                    <div className="col">
                        <label className="form-label" htmlFor="name">Place Name</label>
                        <input className='form-control' type="text" name='name' dafaultValue={placeData.name} value={placeData.name} onChange={e => setPlaceName( e.target.value)} />
                    </div>
                    <div className="col">
                        <label className="form-label" htmlFor="address">Address</label>
                        <input className='form-control' type="text" name='address' value={placeData.address} onChange={e => setAddress(e.target.value)} />
                    </div>
                </div>
                <div className="form-group mb-2">
                    <label className="form-label" htmlFor="notes">Notes</label>
                    <textarea className="form-control" rows={3} name="notes" value={placeData.notes} onChange={e => setNotes(e.target.value)} ></textarea>
                </div>
                <div className="d-flex justify-content-center">
                    <button className="btn">Add Place</button>
                </div>
            </form >
        </div >
    )
}

export default AddPlace