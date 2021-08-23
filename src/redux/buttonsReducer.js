import { SWITCH_ENGLISH, SWITCH_RUSSIAN, SHOW_CELSIUS, SHOW_FAHRENHEIT } from "./actionTypes";

const initialState = {
  language: "ru",
  temperatureScale: "celsius"
};

export function buttonsReducer(state = initialState, action) {
  switch (action.type) {
    case SWITCH_ENGLISH:
      return { ...state, language: "en" };
    case SWITCH_RUSSIAN:
      return { ...state, language: "ru" };
    case SHOW_CELSIUS:
      return { ...state, temperatureScale: "celsius" };
    case SHOW_FAHRENHEIT:
      return { ...state, temperatureScale: "fahrenheit" };
    default:
      return state;
  }
}
