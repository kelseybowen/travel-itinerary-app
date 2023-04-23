import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import PlanTrip from '../components/PlanTrip';
import AddPlace from '../components/AddPlace';
import PlacesList from '../components/PlacesList';
import OpenAI from '../components/OpenAI';
import '../App.css'

const Dashboard = (props) => {

    const [tripData, setTripData] = useState([]);
    const [dashboardForm, setDashboardForm] = useState("trip");
    const { userId } = useParams();
    const { themeDL, setThemeDL } = props;

    useEffect(() => {
        axios.get("http://localhost:5000/dashboard/" + userId)
            .then(res => {
                setTripData(res.data)
            })
            .catch(err => console.log(err))
    }, []);

    return (

        <div>
            <Header />

            <div className='row justify-content-evenly'>
                <div className='col-4'>
                    {
                        dashboardForm === "trip" &&
                        <div>
                            <PlanTrip dashboardForm={dashboardForm} setDashboardForm={setDashboardForm} />
                        </div>
                    }
                    {
                        dashboardForm === "place" &&
                        <div>
                            <AddPlace tripData={tripData} dashboardForm={dashboardForm} setDashboardForm={setDashboardForm} />
                        </div>
                    }
                </div>

                <div className='col-4'>
                    <OpenAI />
                </div>

            </div>
            <div className='row'>
                {
                    dashboardForm === "place" &&
                    <div className='col-3 m-5'>
                        <PlacesList tripData={tripData} />
                    </div>
                }
            </div>
        </div >
    )
}

export default Dashboard