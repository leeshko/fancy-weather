import { SHOW_CELSIUS, SHOW_FAHRENHEIT, SWITCH_ENGLISH, SWITCH_RUSSIAN, USERS_CITY } from "./actionTypes";

export function switchEnglish() {
    return {
        type: SWITCH_ENGLISH, 
        payload: 'en'
    };
}

export function switchRussian() {
    return {
        type: SWITCH_RUSSIAN,
        payload: 'ru'
    };
}

export function switchCelsius() {
    return {
        type: SHOW_CELSIUS,
        payload: 'celsius'
    };
}

export function switchFahrenheit() {
    return {
        type: SHOW_FAHRENHEIT,
        payload: 'fahrenheit'
    };
}