import React, { useContext, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import GlobalContext from '../context/GlobalContext'

export default function Day({day, rowIdx}) {
    const [dayEvents, setDayEvents] = useState([])
    const {setDaySelected, setShowEventModal, savedEvents, setSelectedEvent} = useContext(GlobalContext)

    useEffect(() => {
        console.log("I am in Day useEffect")
        const events= savedEvents.filter((evt) => 
             dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
        );
        setDayEvents(events)
    }, [savedEvents, day])
    

    function getCurrentDayClass(){
        return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") ? 'bg-blue-700 text-white rounded-full w-8 px-2': ''
    }

    return(
        <div className="border border-gray-200 flex flex-col">
            <header className='flex flex-col items-center'>
                {rowIdx === 0 && (
                    <p className='test-sm mt-1'>{day.format('ddd').toUpperCase()}</p>
                )}

                
                <p className={`text-sm p=1 my=1 text-centere ${getCurrentDayClass()}`}>
                    {day.format('DD')}    
                </p>
            </header>
            <div className='flex-1 cursor-pointer' onClick={() => {
                setDaySelected(day);
                setShowEventModal(true);
            }}
            >
                    {dayEvents.map((evt, idx) => (
                        <div 
                        key={idx}
                        onClick={() => setSelectedEvent(evt)}
                        className={`${evt.label} p-1 mr-3 text-white text-sm rounded mb-1 truncate`}>
                            {evt.title}
                        </div>
                    ))}
            </div>
        </div>
    )
}