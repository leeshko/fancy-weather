import { USERS_CITY, USERS_COUNTRY, USERS_TIMEZONE } from "./actionTypes";



export function setUsersCity(city) {
    return {
        type: USERS_CITY,
        city: city
    };
}
export function setUsersCountry(country) {
    return {
        type: USERS_COUNTRY,
        country: country
    };
}
export function setUsersTimezone(timezone) {
    return {
        type: USERS_TIMEZONE,
        timezone: timezone
    };
}