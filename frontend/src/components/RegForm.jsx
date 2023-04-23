import React, { useState } from 'react';
import axios from 'axios';
import '../App.css'

const RegForm = () => {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [interests, setInterests] = useState("")


    const handleRegistration = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/register/user", { first_name: firstName, last_name: lastName, email: email, password: password, interests: interests })
            .then((res) => {
                if (res.data.success) {
                    window.location.href = ("/dashboard/" + res.data.user)
                }
            })
            .catch(err => console.log(err))
        setPassword("")
        setConfirmPassword("")
    }


    return (
        <div>
            <form onSubmit={handleRegistration}>
                <h2>Register</h2>
                <div className="form-group">
                    <label className='form-label' htmlFor="first_name">First Name</label>
                    <input className='form-control' type="text" name='first_name' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label className='form-label' htmlFor="last_name">Last Name</label>
                    <input className='form-control' type="text" name='last_name' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label className='form-label' htmlFor="email">Email</label>
                    <input className='form-control' type="text" name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label className='form-label' htmlFor="password">Password</label>
                    <input className='form-control' type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="form-group">
                    <label className='form-label' htmlFor="conf_password">Confirm Password</label>
                    <input className='form-control' type="password" name='conf_password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <div className="form-group">
                    <label className='form-label' htmlFor="interests">Interests</label>
                    <input className='form-control' type="text" name='interests' value={interests} onChange={(e) => setInterests(e.target.value)} />
                </div>
                <div className="form-group text-center">
                    <button className="btn btn-primary">Register</button>
                </div>
            </form>
        </div>
    )
}

export default RegForm