import s from './background.module.css';
import React, { useEffect } from 'react'

const Background = ({image, takeBackground}) => {

    
    useEffect(() => {
        takeBackground();
    // eslint-disable-next-line
    }, [])

    return (
        <div
            className={s.backgroundImage}
            style={{ backgroundImage: `url(${image})`}}>
        </div>
    )
}

export default Background;