
import React, { useEffect, useState } from 'react';

const Clock = (props) => {

    const [currentDate, setCurrentDate] = useState([]);
    
    let second;

    useEffect(() => {
        tick(props.lang, props.timezone);
        return () => {
            clearInterval(second);
        };
    }, [props.lang, props.timezone])

    const tick = (language) => {
        second = setInterval(() => {
            setCurrentDate(new Date().toLocaleString(language, {
                timeZone: props.timezone,
                weekday: 'short',
                day: '2-digit',
                month: 'long',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            }));
        }, 1000);
    }

    return (
        <div>
            <h2>{currentDate}</h2>
        </div>
    );
}

export default Clock;