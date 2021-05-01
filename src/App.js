import './App.css';
import Buttons from './components/Buttons/Buttons';
import Background from './components/background/Background';
import InfoLayer from './components/InfoLayer/InfoLayer';
import React, { useState, useEffect } from 'react';


function App() {

  const [imageUrl, setImage] = useState('');
  const [long, setLong] = useState(0);
  const [lat, setLat] = useState(0);
  const [currentTemp, setCurrentTemp] = useState(0);
  const [currentIcon, setCurrentIcon] = useState('');
  const [nextDaysInfo, setNextDaysInfo] = useState([[0, ''], [0, ''], [0, '']]);
  const [feelsLike, setFeelsLike] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [windSpeed, setWindSpeed] = useState(0);
  const [usersCity, setUsersCity] = useState('');
  const [usersCountry, setUsersCountry] = useState('');

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const urlWeather = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=0f15ff623f1198a1f7f52550f8c36057&tags=nature,spring,morning&tag_mode=all&extras=url_h&format=json&nojsoncallback=1';

  const takeBackground = () => {
    fetch(urlWeather)
      .then(response => response.json())
      .then(data => {
        let backgroundImg = !undefined ? data.photos.photo[getRandomInt(0, data.photos.photo.length)].url_h : takeBackground();
        setImage(backgroundImg);
      });
  }

  const weatherApi = 'https://api.openweathermap.org/data/2.5/forecast?q=Берлин&lang=en&units=metric&APPID=a9a3a62789de80865407c0452e9d1c27';

  const takeWeather = () => {
    fetch(weatherApi)
      .then(response => response.json())
      .then(data => {
        setCurrentTemp(data.list[0].main.temp);
        setLong(data.city.coord.lat);
        setLat(data.city.coord.lon);
        setCurrentIcon(data.list[0].weather[0].main);
        setFeelsLike(data.list[0].main.feels_like);
        setHumidity(data.list[0].main.humidity);
        setWindSpeed(data.list[0].wind.speed);
        setNextDaysInfo([[data.list[7].main.temp.toFixed(0), data.list[7].weather[0].main], [data.list[15].main.temp.toFixed(0), data.list[15].weather[0].main], [data.list[23].main.temp.toFixed(0), data.list[23].weather[0].main]]);
        
        console.log(data)
      });
    }
    
  const usersGeolocationApi = 'https://ipinfo.io/json?token=eb5b90bb77d46a';

  const takeGeoLocation = () => {
    fetch(usersGeolocationApi)
      .then(response => response.json())
      .then(data => {
        setUsersCity(data.city);
        setUsersCountry(data.country);
      });
  }

  useEffect(() => {
    takeWeather();
    // eslint-disable-next-line
  }, [])
  
  useEffect(() => {
    takeGeoLocation();
  }, [])

  return (
    <div className='appLayer'>
      <div className="container">
        <Background image={imageUrl} takeBackground={takeBackground} />
        <Buttons refreshBackground={takeBackground} />
      </div>
      <InfoLayer data={{ long, lat, currentTemp, currentIcon, feelsLike, humidity, windSpeed, usersCity, usersCountry, nextDaysInfo }} />
    </div>
  );
}

export default App;
