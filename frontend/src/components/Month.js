import React from 'react'
import Day from './Day'
export default function Month({month}) {
    console.log(month)
    return(
        <div className="grid grid-cols-7">

        {month.map((row, i) => (
            <React.Fragment key={i}>
            {row.map((day, idx) => (
                <Day day={day} key={idx}  className="border p-2"/>
            ))}
            </React.Fragment>
        ))}
        </div>
    )
}