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
        <div className="w-full max-w-md mx-auto">
          
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1>REGISTER</h1>
        <br></br>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" >
              Username
            </label>
            <input 
              className="shadow appearance-none border rounded 
                       w-full py-2 px-3 text-gray-700 leading-tight 
                       focus:outline-none focus:shadow-outline" 
              id="username" value={username} type="text" placeholder="Username"
              onChange={ (e) => setUsername(e.target.value)}
              required/>
          </div>
      
      
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input name="password" type="password"
             placeholder="Enter password" 
             value={password}
             required
             onChange={ (e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded 
            w-full py-2 px-3 text-gray-700 leading-tight 
            focus:outline-none focus:shadow-outline" 
                      
                  />
      
              
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
            Confirm Password
            </label>
            <input name="password" type="password"
             placeholder="Enter password again" 
             value={confirmationPassword}
             required
             onChange={ (e) => setConfirmationPassword(e.target.value)}
            className="shadow appearance-none border rounded 
            w-full py-2 px-3 text-gray-700 leading-tight 
            focus:outline-none focus:shadow-outline" 
                      
                  />
      
              
          </div>
      
      
          <div className="flex items-center justify-between">
            <button className="
            bg-blue-500 
            hover:bg-blue-700 
            text-white font-bold py-2 px-4 rounded 
            focus:outline-none focus:shadow-outline" type="submit" onClick={handleSubmit}>
              Register
            </button>
          </div>
          <ErrorMessage message={errorMessage}/>
        </form>
      </div>
    );
};

export default Register;