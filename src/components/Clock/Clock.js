
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Clock = (props) => {

    const language = useSelector((store) => store.switch.language);

    const [currentDate, setCurrentDate] = useState([]);
    
    let second;

    useEffect(() => {
        tick(language, props.timezone);
        return () => {
            clearInterval(second);
        };
    }, [language, props.timezone])

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