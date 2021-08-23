import s from "./buttons.module.css";
import React, { useState } from "react";
import { languages } from "../data";
import { useDispatch, useSelector } from "react-redux";
import { switchCelsius, switchEnglish, switchFahrenheit, switchRussian } from "../../redux/buttonsActionCreators";

const Buttons = ({
  refreshBackground,
  searchInputValue
}) => {

  const language = useSelector((store) => store.switch.language);
  const temperatureScale = useSelector((store) => store.switch.temperatureScale);

  const dispatch = useDispatch();

  const [city, setCity] = useState("");

  const searchInput = (event) => {
    setCity(event.target.value);
  };

  const onEnterPress = (event) => {
    event.preventDefault();
    searchInputValue(city);
    setCity("");
  };

  const changeLang = (e) => {
    let currentLang = e.target.value;

    if (currentLang === "en") {
      dispatch(switchEnglish());
    } else if (currentLang === "ru") {
      dispatch(switchRussian());
    }
  };

  return (
    <>
      <div className={s.btnBlock}>
        <div className={s.updateBackground} onClick={refreshBackground}>
          {" "}
        </div>

        <select onChange={changeLang} value={language}>
          <option value="en">En</option>
          <option value="ru">Ру</option>
        </select>

        <div
          className={temperatureScale === 'fahrenheit' ? s.fahrActive : s.fahr}
          onClick={() => dispatch(switchFahrenheit())}
        >
          {" "}
          °F{" "}
        </div>
        <div
          className={temperatureScale === 'celsius' ? s.celsActive : s.cels}
          onClick={() => dispatch(switchCelsius())}
        >
          {" "}
          °C{" "}
        </div>
      </div>
      <form className={s.searchBlock} onClick={onEnterPress}>
        <input
          className={s.searchField}
          type="text"
          value={city}
          onChange={searchInput}
          placeholder={
            language === "en"
              ? languages.en.searchField
              : languages.ru.searchField
          }
        />

        <input
          className={s.searchButton}
          type="submit"
          value={
            language === "en" ? languages.en.searchBtn : languages.ru.searchBtn
          }
        />
      </form>
    </>
  );
};

export default Buttons;
