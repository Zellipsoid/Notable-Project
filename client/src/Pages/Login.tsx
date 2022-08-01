import axios from 'axios';
import { useState } from 'react';
import UsernamePasswordForm from '../Components/UsernamePasswordForm';

const Login = () => {

    const login = async (username: string, password: string) => {
        let res = await axios.post(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/login`, {
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