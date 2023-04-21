import React from 'react';
import axios from 'axios';

const PlanTrip = () => {

    return (
        <div className='col-6 p-2 m-2 border center'>
            <form>
                <h2 className='text-center'>Add a Trip</h2>
                <div className="form-group my-2">
                    <label className="form-label" htmlFor="title">Title</label>
                    <input className='form-control' type="text" name='title' />
                </div>
                <div className="form-group row my-2">
                    <div className="col">
                        <label className="form-label" htmlFor="city">City</label>
                        <input className='form-control' type="text" name='city' />
                    </div>
                    <div className="col">
                        <label className="form-label" htmlFor="state">State</label>
                        <input className='form-control' type="text" name='state' />
                    </div>
                    <div className="col">
                        <label className="form-label" htmlFor="country">Country</label>
                        <input className='form-control' type="text" name='country' />
                    </div>
                </div>
                <div className="form-group row my-2">
                    <div className="col">
                        <label className="form-label" htmlFor="start_date">Start Date</label>
                        <input className='form-control' type='date' name='start_date' />
                    </div>
                    <div className="col">
                        <label className="form-label" htmlFor="end_date">End Date</label>
                        <input className='form-control' type='date' name='end_date' />
                    </div>
                </div>
                <div className='d-flex justify-content-center'>
                    <button className="btn btn-primary">Add Trip</button>
                </div>
            </form>
        </div>
    )
}

export default PlanTrip