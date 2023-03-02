import React, {useContext, useState, useEffect} from "react";
import styles from "./index.css"
import {getMonth} from './util';

import CalendarHeader from './components/CalendarHeader';
import Sidebar from './components/Sidebar';
import Month from './components/Month';


const App = () => {

  const[currentMonth,setCurrentMonth] = useState(getMonth())

  return (

  <React.Fragment>
  <div className="h-screen flex flex-columns">
    <CalendarHeader />
    <Month month={currentMonth}/>
    <div className="flex flex-1">
        <Sidebar />

    </div>
  </div>
  </React.Fragment>
  );
}

export default App;
