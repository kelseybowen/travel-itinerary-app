import React from 'react';
import LoginForm from '../components/LoginForm';
import RegForm from '../components/RegForm';
import '../App.css'

const LoginReg = (props) => {

    const {isLoggedIn, setIsLoggedIn} = props;

    return (
        <div>
            <div className='d-flex justify-content-center p-2 m-2'>
                <h1 className="display-1">Travel Planner</h1>
            </div>
            <div className='d-flex justify-content-center p-2 m-2'>
                <RegForm isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
                <LoginForm isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
            </div>
        </div>
    )
}

export default LoginReg