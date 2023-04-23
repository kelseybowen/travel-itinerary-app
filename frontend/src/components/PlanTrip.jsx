import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PlanTrip = (props) => {

    const {setDashboardForm} = props;
    const {userId} = useParams()
    const [title, setTitle] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [country, setCountry] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:5000/${userId}/plan/new`, {title, city, state, country, start_date: startDate, end_date: endDate})
            .then(res => {
                console.log(res.data)
                // if (res.data['success'] === true) {
                //     window.location.href=(`/dashboard/${userId}/`)
                // }
            })
            .catch(err => console.log(err))
            setDashboardForm("place")
        }

    return (
        <div className='p-2 m-2 border'>
            <form onSubmit={handleSubmit}>
                <h2 className='text-center'>Add a Trip</h2>
                <div className="form-group my-2">
                    <label className="form-label" htmlFor="title">Title</label>
                    <input className='form-control' type="text" name='title' value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <div className="form-group row my-2">
                    <div className="col">
                        <label className="form-label" htmlFor="city">City</label>
                        <input className='form-control' type="text" name='city' value={city} onChange={e => setCity(e.target.value)}/>
                    </div>
                    <div className="col">
                        <label className="form-label" htmlFor="state">State</label>
                        <input className='form-control' type="text" name='state' value={state} onChange={e => setState(e.target.value)} />
                    </div>
                    <div className="col">
                        <label className="form-label" htmlFor="country">Country</label>
                        <input className='form-control' type="text" name='country' value={country} onChange={e => setCountry(e.target.value)} />
                    </div>
                </div>
                <div className="form-group row my-2">
                    <div className="col">
                        <label className="form-label" htmlFor="start_date">Start Date</label>
                        <input className='form-control' type='date' name='start_date' value={startDate} onChange={e => setStartDate(e.target.value)} />
                    </div>
                    <div className="col">
                        <label className="form-label" htmlFor="end_date">End Date</label>
                        <input className='form-control' type='date' name='end_date' value={endDate} onChange={e => setEndDate(e.target.value)} />
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