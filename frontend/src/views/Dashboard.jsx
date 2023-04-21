import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import { useParams } from 'react-router-dom';
import PlanTrip from '../components/PlanTrip';
import AddPlace from '../components/AddPlace';
import PlacesList from '../components/PlacesList';

const Dashboard = () => {

    const [tripData, setTripData] = useState([]);
    // const [dashboardState, setDashboardState] = useState("addTrip");
    const { userId } = useParams();

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
            <div className="container">
                <PlanTrip/>
                <PlacesList tripData={tripData} />
            </div>
        </div>
    )
}

export default Dashboard