import axios from 'axios';
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { userContext as context } from './UserContext'

const Navbar = () => {
    const userContext = useContext(context);
    const logout = async () => {
        let { data } = await axios.get("http://localhost:4000/user", {
            withCredentials: true
        })
        if (data === "success"){
            window.location.href = "/";
        }
    }
    return (
    <div className="NavContainer">
        {userContext ? (
            <>
                <Link to="/logout" onClick={logout}>Logout</Link>
                {userContext.isAdmin ? <Link to="/admin">Admin</Link> : null}
                <Link to="/profile">Profile</Link>
            </>
        ) :         
        (
        <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
        </>
        )}
        
        <Link to="/">Home</Link>
        
    
    </div>
    )
}

export default Navbar