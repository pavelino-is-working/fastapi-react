import React, { useEffect, useReducer, useState } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";

function savedEventsReducer(state, {type, payload, token}){
    
    switch(type){
        case "initialize":
            return payload;
        case 'push':
            saveAppointments(payload, token)
            return[...state, payload];
        case 'update':
            updateAppointments(payload, token)
            return state.map((evt) => evt.id === payload.id ? payload : evt);
        case 'delete':
            deleteAppointments(payload, token)
            return state.filter((evt) => evt.id !== payload.id);
        default:
            throw new Error();
    }
}
async function saveAppointments(payload, token) {
    const requestOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json",
                   "Authorization": "Bearer " + token},
        body: JSON.stringify(payload),    
    };
    console.log(requestOptions)
    const response = await fetch("/api/appointments", requestOptions);
    const data = await response.json();
    console.log(data)
}

async function updateAppointments(payload, token) {
    const requestOptions = {
        method: "PUT",
        headers: {"Content-Type": "application/json",
                   "Authorization": "Bearer " + token},
        body: JSON.stringify(payload),    
    };
    console.log(requestOptions)
    const response = await fetch(`/api/appointments/${payload.id}`, requestOptions);
    const data = await response.json();
    console.log("update",data)
}

async function deleteAppointments(payload, token) {
    const requestOptions = {
        method: "DELETE",
        headers: {"Content-Type": "application/json",
                   "Authorization": "Bearer " + token},    
    };
    console.log(requestOptions)
    const response = await fetch(`/api/appointments/${payload.id}`, requestOptions);
    const data = await response.json();
}

async function getAll(token){
    const requestOptions = {
        method: "GET",
        headers: {"Content-Type": "application/json",
                   "Authorization": "Bearer " + token},  
    };
    const response = await fetch('/api/appointments', requestOptions);
    const data = await response.json();
    console.log(data)
    return data;   
}


export default function ContextWrapper(props){
    
    const[monthIndex, setMonthIndex] = useState(dayjs().month());
    const[showEventModal,setShowEventModal ] = useState(false);
    const[daySelected, setDaySelected ] = useState(dayjs());
    const[selectedEvent,setSelectedEvent ] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("awesomeCalendarToken"));
    const [savedEvents, dispatchCalEvent] = useReducer(savedEventsReducer, []);

    useEffect(() => {
        async function fetchData() {
          const data = await getAll(token);
          if (token !== null){
            dispatchCalEvent({ type: "initialize", payload: data });
        } else {
           dispatchCalEvent({ type: "initialize", payload: [] });
        }
        }
        fetchData();
      }, [token]);


    useEffect(() => {
        localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
    }, [savedEvents]);


    
    useEffect(() => {
        if (!showEventModal) {
          setSelectedEvent(null);
        }
      }, [showEventModal]);

      useEffect(() => {
        const fetchUser = async () =>{
           const requestOptions = {
               method: "GET",
               headers:{
                   "Content-Type": "application/json",
                   Authorization: "Bearer " + token,
               },
           };
           const response = await fetch("/api/users/me", requestOptions);
           if (!response.ok){
           setToken(null);
            }
            localStorage.setItem("awesomeCalendarToken", token);
        };
        fetchUser();
       }, [token]);

    return (
        <GlobalContext.Provider value={{ 
            monthIndex, 
            setMonthIndex,
            showEventModal,
            setShowEventModal,
            daySelected,
            setDaySelected,
            dispatchCalEvent,
            savedEvents,
            selectedEvent,
            setSelectedEvent,
            token,
            setToken,
            }}>
            {props.children}
        </GlobalContext.Provider>
    );
}
