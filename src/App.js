import React, { useState, useEffect } from 'react';
import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import './App.css';
import Buttons from './components/Buttons/Buttons';
import Background from './components/background/Background';
import InfoLayer from './components/InfoLayer/InfoLayer';
import { rootReducer } from './redux/rootReducer';

const store = createStore(rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

function App() {

  const [imageUrl, setImage] = useState('');

  //weatherAPI
  const [long, setLong] = useState(0);
  const [lat, setLat] = useState(0);
  const [currentTemp, setCurrentTemp] = useState(0);
  const [currentIcon, setCurrentIcon] = useState('');
  const [nextDaysInfo, setNextDaysInfo] = useState([[0, ''], [0, ''], [0, '']]);
  const [feelsLike, setFeelsLike] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [windSpeed, setWindSpeed] = useState(0);
  const [timezone, setTimezone] = useState('');

  //Geolocation
  const [usersCity, setUsersCity] = useState('');
  const [usersCountry, setUsersCountry] = useState('');

  //geocoding 
  const [geocodingCityInRussian, setGeocodingCityInRussian] = useState('');

  //appLanguage  
  const [lang, setLang] = useState(localStorage.lang || 'en');

  //type Of Temperature (celsius, fahrengeit)
  const [showCelsius, setShowCelsius] = useState(localStorage.cels === 'true' || localStorage.cels === undefined);

  const urlBackground = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=0f15ff623f1198a1f7f52550f8c36057&tags=nature,spring,morning&tag_mode=all&extras=url_h&format=json&nojsoncallback=1';

  const usersGeolocationApi = 'https://ipinfo.io/json?token=eb5b90bb77d46a';

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const takeBackground = () => {
    fetch(urlBackground)
      .then(response => response.json())
      .then(data => {
        let backgroundImg = (data.photos.photo[getRandomInt(0, data.photos.photo.length)].url_h !== undefined ? data.photos.photo[getRandomInt(0, data.photos.photo.length)].url_h : takeBackground());
        setImage(backgroundImg);
      })
      .catch(() => { alert('background is not loaded') });
  }

  const takeGeoLocation = (city) => {
    fetch(usersGeolocationApi)
      .then(response => response.json())
      .then(data => {
        setUsersCity(data.city);
        setUsersCountry(data.country);
        setTimezone(data.timezone);

        let weatherApi = `https://api.openweathermap.org/data/2.5/forecast?q=${city || data.city}&lang=${lang}&units=metric&APPID=020a35eb47b0ddb74a74d261995e71fe`;
        fetch(weatherApi)
          .then(response => response.json())
          .then(data => {
            setUsersCity(data.city.name);
            setUsersCountry(data.city.country);
            setCurrentTemp(data.list[0].main.temp);
            setLong(data.city.coord.lat);
            setLat(data.city.coord.lon);
            setCurrentIcon(data.list[0].weather[0].main);
            setFeelsLike(data.list[0].main.feels_like);
            setHumidity(data.list[0].main.humidity);
            setWindSpeed(data.list[0].wind.speed);
            setNextDaysInfo([[data.list[7].main.temp.toFixed(0), data.list[7].weather[0].main], [data.list[15].main.temp.toFixed(0), data.list[15].weather[0].main], [data.list[23].main.temp.toFixed(0), data.list[23].weather[0].main]])

            const geocodingApi = `https://api.opencagedata.com/geocode/v1/json?q=${data.city.coord.lat}%2C%20${data.city.coord.lon}&key=a50ff26bf2c342f88d097f0c703ab93c&language=ru&pretty=1`

            return fetch(geocodingApi);
          })
          .then(response => response.json())
          .then(data => {
            setGeocodingCityInRussian(data.results[0].components.city);
            setTimezone(data.results[0].annotations.timezone.name);
          })
          .catch(() => { alert('incorrect city name') });
      });
  }

  useEffect(() => {
    takeGeoLocation();
  }, [])

  const changeLang = (e) => {
    setLang(e.target.value);
    localStorage.setItem('lang', e.target.value);
  }

  const changeToFahr = (temp) => {
    setShowCelsius(false);
    localStorage.setItem('cels', false);
    return (temp * 9 / 5) + 32;
  }

  const changeToCels = () => {
    setShowCelsius(true);
    localStorage.setItem('cels', true);
  }

  const searchInputValue = (city) => {
    takeGeoLocation(city);
  }

  return (
    <div className='appLayer'>
      <div className="container">
        <Background
          image={imageUrl}
          takeBackground={takeBackground} />
        <Buttons
          refreshBackground={takeBackground}
          changeLang={changeLang}
          lang={lang}
          changeToFahr={changeToFahr}
          changeToCels={changeToCels}
          showCelsius={showCelsius}
          searchInputValue={searchInputValue}
        />
      </div>
      <InfoLayer data={{
        long, lat, timezone, currentTemp, currentIcon, feelsLike, humidity, windSpeed,
        usersCity, usersCountry, nextDaysInfo, lang, geocodingCityInRussian, showCelsius, changeToFahr
      }} />
    </div>
  );
}

export default App;
