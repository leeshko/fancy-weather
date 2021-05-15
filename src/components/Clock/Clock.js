
import React, { useEffect, useState } from 'react';

const Clock = (props) => {
    const [currentDate, setCurrentDate] = useState([]);

    useEffect(() => {
        tick(props.lang, props.timezone);
    }, [props.lang, props.timezone])
    
    const tick = (language, timezone) => {
        //  setInterval(() => {
            let utcTimeStamp = (Date.now() - timezone*1000);
            console.log(new Date())
            console.log(new Date(utcTimeStamp))
            console.log(timezone)
         

        setCurrentDate(new Date(utcTimeStamp + timezone * 1000).toLocaleString(language, {
          
            weekday: 'short',
            day: '2-digit',
            month: 'long',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }));

        //  }, 1000);
    }
    
    return (
        <div>
            <h2>{currentDate}</h2>
        </div>
    );

}

export default Clock;