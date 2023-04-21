import React from 'react'
import { Link, useParams } from 'react-router-dom'

const Header = () => {

    const {userId} = useParams();

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to={"#"}>???</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to={`/dashboard/${userId}`}>Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"#"}>Profile</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"#"}>Saved</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link"  to={"/logout"}>Logout</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header