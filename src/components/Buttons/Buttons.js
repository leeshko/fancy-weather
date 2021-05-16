import s from './buttons.module.css';
import React, { useState } from 'react';
import { languages } from '../data';


const Buttons = ({ refreshBackground, changeLang, lang, searchInputValue,  changeToCels, changeToFahr, showCelsius }) => {

    const [city, setCity] = useState('');

    const searchInput = (event) => {
        setCity(event.target.value);
    }
    
    const onEnterPress = (event) => {
        event.preventDefault();
        searchInputValue(city);
        setCity('');
    }

    return (
        <>
            <div className={s.btnBlock} >
                <div className={s.updateBackground} onClick={refreshBackground}> </div>

                <select onChange={changeLang} value={lang}>
                    <option value="en">En</option>
                    <option value="ru">Ру</option>
                </select>

                <div className={!showCelsius ? s.fahrActive : s.fahr} onClick={showCelsius ? changeToFahr : null}> °F </div>
                <div className={showCelsius ? s.celsActive : s.cels} onClick={changeToCels}> °C </div>
            </div>
            <form className={s.searchBlock} onClick={onEnterPress} >
                <input
                    className={s.searchField}
                    type="text" 
                    value={city}
                    onChange={searchInput}
                    placeholder={lang === 'en' ? languages.en.searchField : languages.ru.searchField}
                />

                <input
                    className={s.searchButton}
                    type="submit"
                    value={lang === 'en' ? languages.en.searchBtn : languages.ru.searchBtn}  
                />
            </form>
        </>
    )
}

export default Buttons;