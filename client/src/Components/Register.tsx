import axios from 'axios';
import UsernamePasswordForm from '../Components/UsernamePasswordForm';

const Register = () => {
    const login = async (username: string, password: string) => {
        // TODO: Move the server URL into an env file
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