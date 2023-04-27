import { Navigate, Outlet } from "react-router-dom";
import React from "react";

const Protected = (props) => {

    const { isLoggedIn, children } = props;

    if (isLoggedIn == false) {
        console.log(isLoggedIn)
        return <Navigate to="/" replace />;
    }
    return children;
};
export default Protected;