import React from "react";

const GlobalContext = React.createContext({
    monthIndex: 0,
    setMonthIndex: (index) => {},
    showEventModal: false,
    setShowEventModal: () => {},
    daySelected: null,
    setDaySelected: (day) => {},
    dispatchCalEvent: ({type, payload}) => {},
    savedEvents: [],
    selectedEvent: null,
    setSelectedEvent: () => {}, 
    token: null,
    setToken: () => {},
});

export default GlobalContext;  