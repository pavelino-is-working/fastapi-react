import React, {useContext, useState, useEffect} from "react";
import Register from "./components/Register";
import Header from "./components/Header";
import Login from "./components/Login";
import { UserContext } from "./context/UserContext";
import {getMonth} from './util';

const App = () => {
  console.table(getMonth())
  const [message, setMessage] = useState("");
  const [token] = useContext(UserContext);
  const getWelcomeMessage = async () => {
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };
    const response = await fetch("/api", requestOptions);
    const data = await response.json();
    if(!response.ok){
        console.log("something messed up");
    }
    else{
        setMessage(data.message);
    }

  };
  useEffect(() => {
  getWelcomeMessage();
  }, []);
  return (
  <>
  <Header title={message} />
  <div className="columns">
    <div className="column"></div>
    <div className="column m-5 is-two-thirds">
        { !token ?(
            <div className="columns">
            <Register/> <Login />
            </div>
        ) : (
            <p>Calendar</p>
        )}
    </div>
    <div className="column"></div>
  </div>
    </>
  );
}

export default App;