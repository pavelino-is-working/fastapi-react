import React, { useContext, useState, onSubmit } from "react";
import GlobalContext from "../context/GlobalContext";
import ErrorMessage from "./ErrorMessage";

const Register = () =>{
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [confirmationPassword,setConfirmationPassword] = useState("");
    const [errorMessage,setErrorMessage] = useState("");
    const {setToken} = useContext(GlobalContext);

    const submitRegistration = async () => {
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username: username, hashed_password: password })
        };
        const response = await fetch("/api/users", requestOptions);
        const data = await response.json();

        if(!response.ok){
            setErrorMessage(data.detail);
        } else {
            setToken(data.access_token);
        }
    };

    const handleSubmit = (e) =>
    {
    e.preventDefault();
    if (password === confirmationPassword && password.length > 7){
        submitRegistration();
    }
    else{
        setErrorMessage("Make sure that the passwords match and have more than 7 character");
    }
    };

    return(
        <div className="column">
            <form className="box" onSubmit={handleSubmit}>
                <h1 className="title has-text-centered">Register</h1>
                <div className="field">
                    <label className="label">Username</label>
                    <div className="control">
                        <input
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={ (e) => setUsername(e.target.value)}
                        className="input"
                        required
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                        <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={ (e) => setPassword(e.target.value)}
                        className="input"
                        required
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Confirm Password</label>
                    <div className="control">
                        <input
                        type="password"
                        placeholder="Enter password"
                        value={confirmationPassword}
                        onChange={ (e) => setConfirmationPassword(e.target.value)}
                        className="input"
                        required
                        />
                    </div>
                </div>
                <ErrorMessage message={errorMessage}/>
                <br />
                <button className="button is-primary"
                type="submit"
                >
                Register
                </button>
            </form>
        </div>
    );
};

export default Register;