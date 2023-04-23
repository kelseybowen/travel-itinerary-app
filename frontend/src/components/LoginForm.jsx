import React, { useState } from 'react';
import axios from 'axios';
import '../App.css'

const LoginForm = () => {

    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")

    const handleLogin = (e) => {
        e.preventDefault();
        const data = { email: loginEmail, password: loginPassword }
        console.log(data);
        axios.post("http://localhost:5000/login/user", data)
            .then((res) => {
                if (res.data['success'] === true) {
                    window.location.href = ("/dashboard/" + res.data.user)
                }
            })
            .catch(err => console.log(err))
            setLoginPassword("")
    }

    return (
        <div>
            <form onSubmit={handleLogin}>
                <h2>Login</h2>
                <div className="form-group">
                    <label className='form-label' htmlFor="loginEmail">Email</label>
                    <input key="loginEmail" className='form-control' type="text" name='loginEmail' value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label className='form-label' htmlFor="loginPassword">Password</label>
                    <input key="loginPassword" className='form-control' type="password" name='loginPassword' value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                </div>
                <div className="form-group text-center">
                    <button className="btn btn-primary">Login</button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm