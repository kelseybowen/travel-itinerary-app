import React, { useState, useEffect } from 'react'
import { Link, redirect, useParams } from 'react-router-dom'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import '../darkMode.css'


const Header = (props) => {

    const { userId } = useParams();
    const [loggedInUser, setLoggedInUser] = useState(userId);
    const [themeDL, setThemeDL] = useState(
        localStorage.getItem('themeDL') || 'light'
    );
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);


    // -------------- THEME

    const toggleTheme = () => {
        if (themeDL === 'light') {
            setThemeDL('dark');
        } else {
            setThemeDL('light');
        }
    };

    const theme = createTheme({
        palette: {
            primary: {
                main: '#474747'
        }
    }});


    // ---------- NAVBAR METHODS

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
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>Saved</MenuItem>
                        <MenuItem onClick={logout}>Logout</MenuItem>
                    </Menu>
                </IconButton>
                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                    {label}
                </Typography>
            </Toolbar>
        );
    }

    // -------------- MENU DROPDOWN METHODS

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        setLoggedInUser("")
        return window.location.href = ("/")
    }

    // -----------------

    useEffect(() => {
        localStorage.setItem('themeDL', themeDL);
        document.body.className = themeDL;
    }, [themeDL]);

    return (
        <div>
            {/* ----------- NAV BAR ------------- */}
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
                {/* <ThemeProvider> */}
                    <Box>
                        <AppBar position="static" sx={{bgcolor: theme.palette.primary.main}}>
                            <Grid container justifyContent={"space-between"} alignItems={"center"}>
                                {appBarLabel('Travel')}
                                <FormGroup>
                                    <FormControlLabel control={<Switch color='default' />} name="darkModeSwitch" id="darkModeSwitch" onClick={toggleTheme} />
                                </FormGroup>
                            </Grid>
                        </AppBar>
                    </Box>
                {/* </ThemeProvider> */}
            </Stack>
        </div >
    )
}

export default Header