import { SWITCH_ENGLISH, SWITCH_RUSSIAN } from "./actionTypes";

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