import React from 'react';
import LoginForm from '../components/LoginForm';
import RegForm from '../components/RegForm';
import '../App.css'

const LoginReg = () => {

    return (
        <div className='d-flex justify-content-center p-2 m-2'>
            <RegForm />
            <LoginForm />
        </div>
    )
}

export default LoginReg