import { USERS_CITY, USERS_COUNTRY, USERS_TIMEZONE } from "./actionTypes";

const initialState = {
  city: '',
  country: '',
  timezone: '',
  temperature: 13,
  longitude: 0,
  latitude: 0
};

export function usersInfoReducer(state = initialState, action) {
  switch (action.type) {
    case USERS_CITY:
      return { ...state, city: action.city };
    case USERS_COUNTRY:
      return { ...state, country: action.country };
    case USERS_TIMEZONE:
      return { ...state, timezone: action.timezone };
   
    default:
      return state;
  }
}
