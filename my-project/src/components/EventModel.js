import dayjs from 'dayjs';
import React, { useState } from 'react'
import { useContext } from 'react'
import GlobalContext from '../context/GlobalContext'

const labelsClasses = ["bg-indigo-500", "bg-gray-500", "bg-green-500", "bg-blue-500" ,"bg-red-500", "bg-purple-500"]

export default function EventModel() {
   
    const {setShowEventModal, 
        daySelected, dispatchCalEvent, 
        selectedEvent, token,
    } = useContext(GlobalContext)

    const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "" );
    const [description, setDescription] = useState(selectedEvent ? selectedEvent.description : "");
    const [ selectedLabel, setSelectedLabel] = useState(
        selectedEvent ? labelsClasses.find((lbl) => lbl ===selectedEvent.label) : labelsClasses[0]);

        async function handleSubmit(e){
        e.preventDefault()
        
        const calendarEvent = {
            title,
            description,
            label: selectedLabel,
            day: daySelected.valueOf(),
            id: selectedEvent ? selectedEvent.id : Date.now(),

        };
        if (selectedEvent){
            dispatchCalEvent({type: 'update', payload: calendarEvent, token: token});
        } else {
            dispatchCalEvent({type: 'push', payload: calendarEvent, token: token});
        }
        
        setShowEventModal(false); 

    }

    return(
        <div className='h-screen w-full fixed left-0 top-0 flex justify-center items-center'>
            <form className='bg-white rounded-lg shadow-2xl w-1/4'>
                <header className='bg-gray-100 px-4 py-2 flex justify-between items-center'>

                    <div className='text-gray-400'>
                        Drag
                    </div>
                    <div>
                        {selectedEvent && (
                              <div 
                              onClick={() => {
                                dispatchCalEvent({type: "delete", payload: selectedEvent, token: token})
                                setShowEventModal(false);
                            }}
                              className='text-gray-400 cursor-pointer'>
                              Remove
                          </div> 
                        )}
                    <button on onClick={() => setShowEventModal(false)}>
                    <div className='text-gray-400'>
                        X
                    </div> 
                    </button>
                    </div>
                    

                </header>
                <div className='p-3'>
                    <div className='grid grid-cols-1/5 items-end gap-y-7'>
                        <div></div>
                        <input type="text" name="title" 
                        placeholder='Add title' 
                        value={title} 
                        required
                        onChange={(e) => setTitle(e.target.value)} 
                        className="pt-3 border-0 
                                    text-gray-600 text-xl 
                                    font-semibold pb-2 w-full border-b-2 border-gray-200 
                                    focus:outline-none focus:ring-0 focus:border-blue-500"
                        />
                        <div className='text-gray-400'>
                            Day
                        </div>
                        <p>{daySelected.format("dddd, MMMM DD")}</p>
                        <div className='text-gray-400'>
                            Desc
                        </div>
                        <input type="text" name="description" 
                        placeholder='Add a description' 
                        value={description} 
                        required
                        onChange={(e) => setDescription(e.target.value)} 
                        className="pt-3 border-0 
                                    text-gray-600 pb-2 w-full border-b-2 border-gray-200 
                                    focus:outline-none focus:ring-0 focus:border-blue-500"
                        />
                        <div className='text-gray-400'>
                            Color
                        </div>
                        <div className='flex gap-x-2'>
                            {labelsClasses.map((lblClass, i) => (
                                <div key={i}
                                onClick = {() => setSelectedLabel(lblClass)}
                                className={`${lblClass} w-6 h-6 
                                        rounded-full flex items-center 
                                        justify-center cursor-pointer`}
                                >
                                    {selectedLabel ===lblClass && 
                                    <span className='text-white text-sm'>A</span>}
                                </div>                                    
                            ))}
                        </div>
                    </div>
                </div>
                <footer className='flex justify-end border-t p-3 mt-5'>
                    <button type="submit" onClick={handleSubmit}
                    className='bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white'>
                                        Save
                    </button>

                </footer>
            </form>
        </div>
    );
}