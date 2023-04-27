import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css'
import { useNavigate } from 'react-router-dom';

const RegForm = (props) => {

    const { isLoggedIn, setIsLoggedIn } = props;
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [interests, setInterests] = useState("")
    const [fNameError, setFNameError] = useState("")
    const [lNameError, setLNameError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [pwError, setPwError] = useState("")
    const [confPwError, setConfPwError] = useState("")
    const [interestsError, setInterestsError] = useState("")
    const [messages, setMessages] = useState([])
    const navigate = useNavigate();

    const regValidator = () => {
        let isValid = true;
        if (firstName.length < 3) {
            setFNameError("First Name must be at least 3 characters.")
            isValid = false;
        }
        if (lastName.length < 3) {
            setLNameError("Last Name must be at least 3 characters.")
            isValid = false;
        }
        // if (email ???)
        // if (pw ???)
        if (interests.length < 3) {
            setInterestsError("Interests must be at least 3 characters.")
            isValid = false;
        }
    }


    const handleRegistration = (e) => {
        e.preventDefault();
        // console.log(messages)

        // setMessages([])
        if (regValidator()) {

        
        axios.post("http://localhost:5000/register/user", { first_name: firstName, last_name: lastName, email: email, password: password, conf_password: confirmPassword, interests: interests })

            .then((res) => {
                // console.log(`MESSAGES = ${res.data['messages'][1]}`)

                let result = res.data['success']
                setIsLoggedIn(result)
                if (result) {
                    navigate("/dashboard/" + res.data['user'])
                }
                // } else {
                //     const stuff = res.data['messages']
                //     for (let m in stuff) {
                //         console.log(stuff[m])
                //         setMessages([...messages, stuff[m]])
                //     }
                //     console.log(messages)
                //     // console.log(message)
                // }

                // if (res.data.success) {
                //     setIsLoggedIn(true)
                //     window.location.href = ("/dashboard/" + res.data.user)
                // }
            })
            .catch(err => console.log(err))

        setPassword("")
        setConfirmPassword("")
    }
    }


    return (
        <div className='dashboard-component dark p-4 m-2'>
            <form onSubmit={handleRegistration}>
                <h2 className='display-4 text-center'>Register</h2>
                {/* {
                    messages.map((m, idx) => (
                            <p key={idx}>{m}</p>
                        )
                    )
                } */}
                <div className="form-group">
                    <label className='form-label' htmlFor="first_name">First Name</label>
                    <p className="text-danger">{fNameError}</p>
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
                <div className="form-group text-center mt-3">
                    <button className="btn">Register</button>
                </div>
            </form>
        </div>
    )
}

export default RegForm