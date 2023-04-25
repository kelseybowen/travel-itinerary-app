import React, { useState } from 'react';
import axios from 'axios';
import '../App.css'

const LoginForm = () => {

    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [pwError, setPwError] = useState("")

    const formValidator = () => {
        // let isValid = true;
        // // get user by email
        // axios.get("http://localhost:5000/login/user")
        //     .then(res => {
        //         console.log(res)
        //     })
        //     .catch(err => console.log(err))
        // // check for email in db - if not, email not found

        // // check for password match
        // return isValid
    }

    const handleLogin = (e) => {
        e.preventDefault();
        if (formValidator){

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
    }

    return (
        <div className='dashboard-component dark p-4 m-2'>
            <form onSubmit={handleLogin}>
                <h2 className='display-4 text-center'>Login</h2>
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