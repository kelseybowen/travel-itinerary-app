import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import AddTrip from '../components/AddTrip';
import OpenAI from '../components/OpenAI';
import '../App.css'

const Dashboard = (props) => {

    // const [dashboardForm, setDashboardForm] = useState("trip");
    const { userId } = useParams();
    // const { themeDL, setThemeDL } = props;

    useEffect(() => {
        axios.get("http://localhost:5000/dashboard/" + userId)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }, []);

    return (

        <div>
            <Header />

            <div className='row justify-content-evenly'>
                <div className='col-4'>
                    <AddTrip />
                </div>

                <div className='col-4'>
                    <OpenAI />
                </div>
            </div>
        </div >
    )
}

export default Dashboard