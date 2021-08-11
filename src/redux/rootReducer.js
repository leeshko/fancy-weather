import { combineReducers } from "redux";
import { SWITCH_ENGLISH, SWITCH_RUSSIAN } from "./actionTypes";

export function languageReducer(state = 'ru', action) {
    switch (action.type) {
        case SWITCH_ENGLISH:
            return {...state, language: 'en'}; 
        case SWITCH_RUSSIAN:
            return {...state, language: 'ru'};
        default:
            return state;
    }
} 

export const rootReducer = combineReducers({ language: languageReducer })