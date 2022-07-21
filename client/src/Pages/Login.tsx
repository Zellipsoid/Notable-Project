import axios from 'axios';
import { useState } from 'react';
import UsernamePasswordForm from '../Components/UsernamePasswordForm';

const Login = () => {

    const login = async (username: string, password: string) => {
        // TODO: Move the server URL into an env file
        let res = await axios.post(`http://localhost:4000/login`, {
            username,
            password
        }, { withCredentials: true }).catch(e => {
            setError(true);
            setErrorMsg("Login failed");
        })
        if (res?.data === "success") {
            window.location.href = "/";
            setError(false);
            setErrorMsg("");
        }
    }

    const [error, setError] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>("");

    return (
        <UsernamePasswordForm buttonText="Login" onClickFunc={login} error={error} errorMsg={errorMsg}/>
    )
}

export default Login