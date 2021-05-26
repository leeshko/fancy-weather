import s from './currentWeatherDescription.module.css';
import { languages } from '../../../data';

const CurrentWeatherDescription = ({ setIcons, currentIcon, changeToFahr, isShowingCels, feelsLike, windSpeed, lang, humidity}) => {

    return (
        <div className={s.overcastBlock}>
            <div className={s.icon}>
                {setIcons('icon1', `${currentIcon}`, 128)}
            </div>
            <div className={s.overcast}>
                <div>{lang === 'en' ? languages.en.feelsLike : languages.ru.feelsLike}:
                            {isShowingCels ? feelsLike.toFixed(0) + '°C' : changeToFahr(feelsLike).toFixed(0) + '°F'}
                </div>
                <div>{lang === 'en' ? languages.en.wind : languages.ru.wind}: {windSpeed} {lang === 'en' ? 'm/s' : 'м/с'}</div>
                <div>{lang === 'en' ? languages.en.humidity : languages.ru.humidity}: {humidity}%</div>
            </div>
        </div>
    )
}

export default CurrentWeatherDescription;