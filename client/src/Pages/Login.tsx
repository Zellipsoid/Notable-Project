import React, { useState } from 'react'
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const login = async () => {
        console.log("attmepting login");
        let { data } = await axios.post("http://localhost:4000/login", {
            username,
            password
        }, {withCredentials: true})
        console.log(data);
        if (data === "success"){
            window.location.href = "/";
        }
    }


    const getUser = async () => {
        let { data } = await axios.get("http://localhost:4000/user", {
            withCredentials: true
        })
        console.log(data);
    }

    return (
        <div>
            <h1>Login</h1>
            <input type="text" placeholder="username" onChange={e => setUsername(e.target.value)}/>
            <input type="text" placeholder="password" onChange={e => setPassword(e.target.value)}/>
            <button onClick={login}>Login</button>
            <button onClick={getUser}>Check Login</button>
        </div>
    )
}

export default Login