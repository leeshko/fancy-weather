import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import * as axios from 'axios';
import { Skycons } from '../../assets/skycons';
import s from './infoLayer.module.css';
import MapWidget from '../Map/Map';
import Clock from '../Clock/Clock';
import { languages } from '../data';
import {
    setUsersCity,
    setUsersCountry,
    setUsersTimezone,
} from '../../redux/usersInfoActionCreators';

const InfoLayer = (props) => {
    const switcher = useSelector((store) => store.switch);
    const usersInfo = useSelector((store) => store.usersInfo);

    const dispatch = useDispatch();

    const usersGeolocationApi = 'https://ipinfo.io/json?token=eb5b90bb77d46a';

    useEffect(() => {
        axios.get(usersGeolocationApi).then((data) => {
            dispatch(setUsersCity(data.data.city));
            dispatch(setUsersCountry(data.data.country));
            dispatch(setUsersTimezone(data.data.timezone));
        });
    }, []);

    const [firstDay, secDay, thirdDay] = props.data.nextDaysInfo;

    const setIcons = (icon, weather, size) => {
        let skycons = new Skycons({ color: 'white' });
        skycons.remove('icon1');
        skycons.add(icon, Skycons[weather]);
        // skycons.play();
        return (
            <canvas id={icon} width={size} height={size}>
                {' '}
            </canvas>
        );
    };

    const dayMs = 86400000;
    const nextDays = (numOfDay) =>
        new Date(new Date().getTime() + dayMs * numOfDay).toLocaleDateString(
            `${switcher.language}`,
            { weekday: 'long' }
        );

    const changeToFahr = (temp) => {
        return (temp * 9) / 5 + 32;
    };

    // assign country

    const setCountry = (name) => {
        let regionName = new Intl.DisplayNames([`${switcher.language}`], {
            type: 'region',
        });
        return regionName.of(`${name}`);
    };

    return (
        <div className={s.mainBlock}>
            <div className={s.mainInfoBlock}>
                <div>
                    <h1>
                        {' '}
                        {switcher.language === 'ru'
                            ? props.data.geocodingCityInRussian
                            : usersInfo.city}
                        , {setCountry(usersInfo.country)}
                    </h1>
                    <Clock timezone={usersInfo.timezone} />
                </div>
                <div className={s.currentInfo}>
                    <div className={s.currentTemperature}>
                        {switcher.temperatureScale === 'celsius'
                            ? props.data.currentTemp.toFixed(0) + '°C'
                            : changeToFahr(props.data.currentTemp).toFixed(0) + '°F'}
                    </div>
                    <div className={s.overcastBlock}>
                        <div className={s.icon}>
                            {setIcons('icon1', `${props.data.currentIcon}`, 128)}
                        </div>
                        <div className={s.overcast}>
                            <div>
                                {switcher.language === 'en'
                                    ? languages.en.feelsLike
                                    : languages.ru.feelsLike}
                                :
                                {switcher.temperatureScale === 'celsius'
                                    ? props.data.feelsLike.toFixed(0) + '°C'
                                    : changeToFahr(props.data.feelsLike).toFixed(0) +
                                      '°F'}
                            </div>
                            <div>
                                {switcher.language === 'en'
                                    ? languages.en.wind
                                    : languages.ru.wind}
                                : {props.data.windSpeed}
                                {switcher.language === 'en' ? 'm/s' : 'м/с'}
                            </div>
                            <div>
                                {switcher.language === 'en'
                                    ? languages.en.humidity
                                    : languages.ru.humidity}
                                : {props.data.humidity}%
                            </div>
                        </div>
                    </div>
                </div>

                <div className={s.nextDays}>
                    <div className={s.nextDay}>
                        <div className={s.nameOfDay}>{nextDays(1)}</div>
                        {switcher.temperatureScale === 'celsius'
                            ? firstDay[0] + '°C'
                            : changeToFahr(firstDay[0]).toFixed(0) + '°F'}

                        {setIcons('icon2', firstDay[1], 64)}
                    </div>
                    <div className={s.nextDay}>
                        <div className={s.nameOfDay}>{nextDays(2)}</div>
                        {switcher.temperatureScale === 'celsius'
                            ? secDay[0] + '°C'
                            : changeToFahr(secDay[0]).toFixed(0) + '°F'}
                        {setIcons('icon3', secDay[1], 64)}
                    </div>
                    <div className={s.nextDay}>
                        <div className={s.nameOfDay}>{nextDays(3)}</div>
                        {switcher.temperatureScale === 'celsius'
                            ? thirdDay[0] + '°C'
                            : changeToFahr(thirdDay[0]).toFixed(0) + '°F'}
                        {setIcons('icon4', thirdDay[1], 64)}
                    </div>
                </div>
            </div>
            <div className={s.mapBlock}>
                <MapWidget coordinates={props.data} />
                <div className={s.coordinates}>
                    <p>
                        {switcher.language === 'en'
                            ? languages.en.longitude
                            : languages.ru.longitude}
                        : {props.data.long.toFixed(2)}'
                    </p>
                    <p>
                        {switcher.language === 'en'
                            ? languages.en.latitude
                            : languages.ru.latitude}
                        : {props.data.lat.toFixed(2)}'
                    </p>
                </div>
            </div>
        </div>
    );
};

export default InfoLayer;
