import s from './buttons.module.css';
import React from 'react';


const Buttons = ({refreshBackground}) => {

    return (
        <>
            <div className={s.btnBlock} >
                <div className={s.updateBackground} onClick={refreshBackground}> </div>

                <select>
                    <option value="en">En</option>
                    <option value="ru">Ру</option>
                </select>

                <div className={s.fahr}> °F </div>
                <div className={s.celsActive}> °C </div>
            </div>

            <div className={s.searchBlock}>
                <input className={s.searchField} type="text" placeholder={'Search city'} >
                </input>
                <button className={s.searchButton}>SEARCH</button>
            </div>
        </>
    )

}

export default Buttons;