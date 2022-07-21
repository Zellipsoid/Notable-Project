import React, { useState } from 'react'
import { Button, TextField, Grid } from '@mui/material';

const UsernamePasswordForm = (props: {buttonText: string, onClickFunc: (username: string, password: string) => any}) => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

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
                <Button variant="contained" onClick={() => props.onClickFunc(username, password)}>{props.buttonText}</Button>
            </Grid>
        </Grid>
    )
}

export default UsernamePasswordForm;