import React from 'react';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';

const AddPlace = (props) => {

    const {userId} = useParams();
    const {tripData, setDashboardForm} = props;

    const handleSubmit = (e) => {
        setDashboardForm("trip")
    }

    return (
        <div className='p-2 m-2 center' style={{"color": "white"}}>
            <form>
                <h2 className='text-center'>Add a Place</h2>
                <div className="form-group my-2 row">
                    <div className="col">
                        <label className="form-label" htmlFor="name">Place Name</label>
                        <input className='form-control' type="text" name='name' />
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
                    <Button onClick={handleSubmit} variant="outlined">Add Place</Button>
                </div>
            </form >
        </div >
    )
}

export default AddPlace