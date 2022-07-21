import React, { useState } from 'react'
import axios from 'axios';
import { Card, CardContent, CardActions, Button, Typography, Box, TextField, Grid } from '@mui/material';

const Login = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const login = async () => {
        console.log("attmepting login");
        let { data } = await axios.post(`http://localhost:4000/login`, {
            username,
            password
        }, { withCredentials: true })
        console.log(data);
        if (data === "success") {
            window.location.href = "/";
        }
    }

    return (
        <Grid container
            spacing={2}
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ m: 2 }}
            >
            <Grid item xs={12}>
                <TextField
                    value={(username)}
                    onChange={e => setUsername(e.target.value)}
                    id="outlined-required"
                    label="Username"
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" onClick={login}>Login</Button>
            </Grid>
        </Grid>
    )
}

export default Login