import { Box, AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import axios from 'axios';
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { userContext as context } from './UserContext'

const Navbar = () => {
    const userContext = useContext(context);
    const logout = async () => {
        let { data } = await axios.get(`process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/logout`, {
            withCredentials: true
        })
        if (data === "success"){
            window.location.href = "/";
        }
    }
    return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Notable
          </Typography>
          <Button color="inherit" component={Link} to="/">Home</Button>
          {!userContext?.id ? (<>
            <Button color="inherit" component={Link} to="/register">Register</Button>
            <Button color="inherit" component={Link} to="/login">Login</Button>
          </>) : (<Button color="inherit" onClick={logout}>Logout</Button>)}
        </Toolbar>
      </AppBar>
    </Box>
    )
}

export default Navbar