import React, {useContext, useState, useEffect} from "react";
import {getMonth} from './util';

import CalendarHeader from './components/CalendarHeader';
import Sidebar from './components/Sidebar';
import Month from './components/Month';

import GlobalContext from "./context/GlobalContext";
import EventModel from "./components/EventModel";

import Header from "./components/Header";
import Register from "./components/Register";
import Login from "./components/Login";



const App = () => {

  const[currentMonth,setCurrentMonth] = useState(getMonth())
  const { monthIndex, showEventModal } = useContext(GlobalContext)
  const {token} = useContext(GlobalContext);
  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex))
  }, [monthIndex]);

  return (

  <React.Fragment>
    {showEventModal && <EventModel />  }
    <Header title={"Noice"} />
    { !token ?(
            <div className="grid grid-cols-2">
            <Register/> <Login />
            </div>
        ) : (
          <div className="h-screen flex flex-col">
          <CalendarHeader />
          <div className="flex flex-1"><></>
              <Sidebar />
              <Month month={currentMonth}/>
      
          </div>
          
        </div>
        )}
  
  </React.Fragment>
  );
}

export default App;
