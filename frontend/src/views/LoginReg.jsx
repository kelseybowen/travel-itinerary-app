import React, { useState } from 'react';
import axios from 'axios';

const LoginReg = () => {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [interests, setInterests] = useState("")
    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")


    const registrationHandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/register/user", { first_name: firstName, last_name: lastName, email: email, password: password, interests: interests })
            .then((res) => {
                if (res.data.success) {
                    window.location.href=("/dashboard/" + res.data.user)
                }
            })
            .catch(err => console.log(err))
        setPassword("")
        setConfirmPassword("")
    }

    const loginHandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/login/user", {email: loginEmail, password: loginPassword})
            .then((res) => {
                
                if (res.data['success'] === true) {
                    window.location.href=("/dashboard/" + res.data.user)
                }
            })
            .catch(err => console.log(err))
        setPassword("")
        setConfirmPassword("")
    }


return (
    <div className='d-flex'>
        <form onSubmit={registrationHandler}>
            <h2>Register</h2>
            <div className="form-group">
                <label htmlFor="first_name">First Name</label>
                <input type="text" name='first_name' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="last_name">Last Name</label>
                <input type="text" name='last_name' value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="text" name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="conf_password">Confirm Password</label>
                <input type="password" name='conf_password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="interests">Interests</label>
                <input type="text" name='interests' value={interests} onChange={(e) => setInterests(e.target.value)} />
            </div>
            <button className='btn btn-primary'>Register</button>
        </form>
        <form onSubmit={loginHandler}>
            <h5>Login</h5>
            <div className="form-group">
                <label htmlFor="loginEmail">Email</label>
                <input type="text" name='loginEmail' value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="loginPassword">Password</label>
                <input type="text" name='loginPassword' value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)}/>
            </div>
            <button className='btn btn-primary'>Login</button>
        </form>
    </div>
)
}

export default LoginReg