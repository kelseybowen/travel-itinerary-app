import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import '../darkMode.css'
import PlanTrip from '../components/PlanTrip';
import AddPlace from '../components/AddPlace';
import PlacesList from '../components/PlacesList';
import OpenAI from '../components/OpenAI';

const Dashboard = (props) => {

    const [tripData, setTripData] = useState([]);
    const [dashboardForm, setDashboardForm] = useState("trip");
    const { userId } = useParams();
    // const theme = useTheme();
    const { themeDL, setThemeDL } = props;

    const theme = createTheme({
        palette: {
            primary: {
                main: '#FDA821', // yellow
                secondary: '#474747', // grey
                dark: "#141414" // black

        }
    }});


    useEffect(() => {
        axios.get("http://localhost:5000/dashboard/" + userId)
            .then(res => {
                setTripData(res.data)
            })
            .catch(err => console.log(err))
    }, []);

    const Item = styled(Paper)(() => ({
        backgroundColor: themeDL === 'dark' ? theme.palette : '#fff',
        color: themeDL === 'dark' ? '#fff' : '#000',
    }));

    return (

        <div>
            <Header themeDL={themeDL} setThemeDL={setThemeDL} />
                <Grid container spacing={2}>
                    <Grid item xs={4} md={6}>

                        <Item className='m-4' sx={{bgcolor: theme.palette.primary.secondary}}>
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
                        </Item>
                    </Grid>
                    <Grid item xs={4} md={6}>
                        <Item className='m-4' sx={{bgcolor: theme.palette.primary.secondary}}>
                            <div>
                                <OpenAI />
                            </div>
                        </Item>
                    </Grid>
                    {
                        dashboardForm === "place" &&
                        <Grid item xs={6} md={4}>
                            <Item className='mx-4' sx={{bgcolor: theme.palette.primary.secondary}}>
                                <div>
                                    <PlacesList tripData={tripData} />
                                </div>
                            </Item>
                        </Grid>
                    }
                    {/* <Grid item xs={6} md={8}>
                    <Item>xs=6 md=8</Item>
                </Grid> */}
                </Grid>
        </div >
    )
}

export default Dashboard