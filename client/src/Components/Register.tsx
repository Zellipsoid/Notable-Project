import React, { useState } from 'react'
import axios from 'axios';
import { Card, CardContent, CardActions, Button, Typography, Box, TextField, Grid } from '@mui/material';
import UsernamePasswordForm from '../Components/UsernamePasswordForm';
import { userContext } from '../Components/UserContext';

const Register = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const login = async (username: string, password: string) => {
        console.log("attmepting register");
        let { data } = await axios.post(`http://localhost:4000/register`, {
            username,
            password
        }, { withCredentials: true })
        console.log(data);
        if (data === "success") {
            window.location.href = "/";
        }
    }

    return (
        <UsernamePasswordForm buttonText="Register" onClickFunc={login} />
    )
}

export default Register