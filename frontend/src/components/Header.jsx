import React, { useState, useEffect } from 'react'
import { Link, redirect, useParams } from 'react-router-dom'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import axios from 'axios';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import '../App.css'


const Header = (props) => {

    const { userId } = useParams();
    const {isLoggedIn, setIsLoggedIn} = props;
    const [themeDL, setThemeDL] = useState(
        localStorage.getItem('themeDL') || 'light'
    );
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    // ---------------------------------- THEME

    const headerTheme = createTheme({
        palette: {
            mode: 'dark',
        }
    })


    // ---------------------------------- DARK MODE
    useEffect(() => {
        localStorage.setItem('themeDL', themeDL);
        document.body.className = themeDL;
    }, [themeDL]);

    const toggleTheme = () => {
        if (themeDL === 'light') {
            setThemeDL('dark');
        } else {
            setThemeDL('light');
        }
    };

    // ----------------------------------- NAVBAR

    function appBarLabel(label) {
        return (
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                    <MenuIcon onClick={handleClick} />
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={dashboard}>Dashboard</MenuItem>
                        <MenuItem onClick={profile}>Profile</MenuItem>
                        <MenuItem onClick={trips}>My Trips</MenuItem>
                        <MenuItem onClick={logout}>Logout</MenuItem>
                    </Menu>
                </IconButton>
                <Typography variant="h4" noWrap component="div" sx={{ flexGrow: 1 }}>
                    {label}
                </Typography>
            </Toolbar>
        );
    }

    // ----------------------------------- MENU DROPDOWN METHODS

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const dashboard = () => {
        return window.location.href = (`/dashboard/${userId}`)
    }

    const profile = () => {
        return window.location.href = (`/${userId}/profile`)
    }

    const trips = () => {
        return window.location.href = (`/${userId}/trips`)
    }

    const logout = () => {
        axios.get("http://localhost:5000/logout")
        setIsLoggedIn(false)
        // return window.location.href = ("/")
    }


    return (
        <div>
            {/* ----------- NAV BAR ------------- */}
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
                <ThemeProvider theme={headerTheme}>
                    <Box>
                        <AppBar position="static">
                            <Grid container justifyContent={"space-between"} alignItems={"center"}>
                                {appBarLabel('Travel Planner')}
                                <FormGroup>
                                    <FormControlLabel control={<Switch color='default' />} name="darkModeSwitch" id="darkModeSwitch" onClick={toggleTheme} />
                                </FormGroup>
                            </Grid>
                        </AppBar>
                    </Box>
                </ThemeProvider>
            </Stack>
        </div >
    )
}

export default Header