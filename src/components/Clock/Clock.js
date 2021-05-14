
import React, { useEffect, useState } from 'react';

const Clock = (props) => {
    const [currentDate, setCurrentDate] = useState([]);

    useEffect(() => {
        tick(props.lang, props.timezone);
    }, [props.lang, props.timezone])
    
    const tick = (language, timezone) => {
        //  setInterval(() => {
            let utcTime = (new Date(new Date().getTime() - timezone*1000));
        console.log(new Date(+utcTime + timezone*10000))
        setCurrentDate(new Date(+utcTime + timezone * 1000).toLocaleString(language, {
          
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