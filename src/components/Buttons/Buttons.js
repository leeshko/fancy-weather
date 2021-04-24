import s from './buttons.module.css';
import React from 'react'


const Buttons = () => {
    
    return (
        <>
        <div className={s.btnBlock}>
            <div className={s.updateBackground}> </div>

            <select>
                <option value="ru">Ру</option>
                <option value="en">En</option>
            </select>

            <div className={s.fahr}> °F </div>
            <div className={s.cels}> °C </div>
        </div>

        <input className={s.searchField}>
        </input>



        </>
    )

}




export default Buttons;