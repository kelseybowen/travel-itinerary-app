import React, { useState } from 'react';
import axios from 'axios';
import '../App.css'
import { useNavigate } from 'react-router-dom';

const LoginForm = (props) => {

    const { isLoggedIn, setIsLoggedIn } = props;
    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    const [loginError, setLoginError] = useState("")
    const navigate = useNavigate();
    const [message, setMessage] = useState("")

    const formValidator = () => {
        let isValid = true;
        if (!loginEmail || !loginPassword) {
            isValid = false
        }
        return isValid
    }

    const handleLogin = (e) => {
        e.preventDefault();
        if (!formValidator()) {
            setLoginError("Invalid Login Credentials")
        }

        const data = { email: loginEmail, password: loginPassword, login_key: 1 }
        console.log(data);
        axios.post("http://localhost:5000/login/user", data)
            .then((res) => {
                console.log(res.data['success'])
                if (res.data['success'] === 1) {
                    setIsLoggedIn(true)
                    navigate("/dashboard/" + res.data['user'])
                } else {
                    setLoginError(res.data['message'])
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='dashboard-component dark p-4 m-2'>
            <form onSubmit={handleLogin}>
                <h2 className='display-4 text-center'>Login</h2>
            <p className="text-center text-danger">{loginError}</p>
                <p className='text-center text-danger'>{message}</p>
                <div className="form-group">
                    <label className='form-label' htmlFor="loginEmail">Email</label>
                    <input key="loginEmail" className='form-control' type="text" name='loginEmail' value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label className='form-label' htmlFor="loginPassword">Password</label>
                    <input key="loginPassword" className='form-control' type="password" name='loginPassword' value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                </div>
                <div className="form-group text-center mt-3">
                    <button className="btn">Login</button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm