import React from 'react';
import LoginForm from '../components/LoginForm';
import RegForm from '../components/RegForm';
import '../App.css'

const LoginReg = () => {

    return (
        <div>
            <div className='d-flex justify-content-center p-2 m-2'>
                <h1 className="display-1">Travel Planner</h1>
            </div>
            <div className='d-flex justify-content-center p-2 m-2'>
                <RegForm />
                <LoginForm />
            </div>
        </div>
    )
}

export default LoginReg