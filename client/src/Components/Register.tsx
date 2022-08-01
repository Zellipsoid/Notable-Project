import axios from 'axios';
import { useState } from 'react';
import UsernamePasswordForm from '../Components/UsernamePasswordForm';

const Register = () => {
    const login = async (username: string, password: string) => {
        let res = await axios.post(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/register`, {
            username,
            password
        }, { withCredentials: true }).catch(e => {
            setError(true);
            setErrorMsg("Registration failed");
        })
        if (res?.data === "success") {
            window.location.href = "/";
        } else {
            setError(true);
            setErrorMsg("Registration failed");
        }
    }
    
    const [error, setError] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>("");

    return (
        <UsernamePasswordForm buttonText="Register" onClickFunc={login} error={error} errorMsg={errorMsg} />
    )
}

export default Register