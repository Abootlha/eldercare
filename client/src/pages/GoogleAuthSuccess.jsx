import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const GoogleAuthSuccess = ({ setIsAuth }) => {
const navigate = useNavigate();

useEffect(() => {

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {

    localStorage.setItem("authToken", token);
    setIsAuth(true);

    toast.success("Google authentication successful!");

    navigate("/dashboard");
    } else {
    toast.error("Authentication failed. Please try again.");
    navigate("/login");
    }
}, [navigate, setIsAuth]);

    return (
        <div>
        <h1>Google Authentication Successful!</h1>
        </div>
    );
    };

export default GoogleAuthSuccess;
