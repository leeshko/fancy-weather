
const UsersLocation = ({ lang, geocodingCityInRussian, usersCity, usersCountry, setCountry }) => {

    return (
        <h1> {lang === 'ru' ? geocodingCityInRussian : usersCity}, {setCountry(usersCountry)}</h1>
    )
}

export default UsersLocation;