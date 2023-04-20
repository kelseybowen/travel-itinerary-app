import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Header from '../components/Header';
import { useParams } from 'react-router-dom';

const Dashboard = () => {

    const [tripData, setTripData] = useState([]);
    const {userId} = useParams();

    useEffect(() => {
        axios.get("http://localhost:5000/dashboard/" + userId)
            .then(res => {
                setTripData(res.data)
            })
            .catch(err => console.log(err))
    }, []);

    return (
        <div>
            {
                tripData.map((trip, idx) => {
                    return (
                        <div key={idx}>
                            <p>{trip.title}</p>
                            <p>{trip.city}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Dashboard