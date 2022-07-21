import axios from 'axios';
import { useState } from 'react';
import UsernamePasswordForm from '../Components/UsernamePasswordForm';

const Register = () => {
    const login = async (username: string, password: string) => {
        // TODO: Move the server URL into an env file
        let res = await axios.post(`http://localhost:4000/register`, {
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