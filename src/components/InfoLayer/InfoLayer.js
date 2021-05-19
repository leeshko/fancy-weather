import s from './infoLayer.module.css';
import MapWidget from '../Map/Map';
import { Skycons } from '../../assets/skycons';
import Clock from '../Clock/Clock';
import UsersLocation from './UsersLocation/UsersLocation';
import CurrentInfoBlock from './CurrentInfoBlock/CurrentInfoBlock'
import { languages } from '../data'

const InfoLayer = (props) => {

    const changeToFahr = props.data.changeToFahr;
    const isShowingCels = props.data.showCelsius;

    const lang = props.data.lang;

    const [firstDay, secDay, thirdDay] = props.data.nextDaysInfo;

    const setIcons = (icon, weather, size) => {
        let skycons = new Skycons({ color: "white" });
        skycons.remove('icon1');
        skycons.add(icon, Skycons[weather]);
        skycons.play();
        return (<canvas id={icon} width={size} height={size}> </canvas>)
    }

    const dayMs = 86400000;
    const nextDays = (numOfDay) => new Date(new Date().getTime() + dayMs * numOfDay).toLocaleDateString(`${lang}`, { weekday: 'long' });

    // assign country

    const setCountry = (name) => {
        let regionName = new Intl.DisplayNames([`${lang}`], { type: 'region' });
        return regionName.of(`${name}`);
    }

    return (
        <div className={s.mainBlock}>
            <div className={s.mainInfoBlock}>
                <div>
                    <UsersLocation
                        lang={lang}
                        geocodingCityInRussian={props.data.geocodingCityInRussian}
                        usersCity={props.data.usersCity}
                        usersCountry={props.data.usersCountry}
                        setCountry={setCountry}
                    />

                    <Clock
                        lang={lang}
                        timezone={props.data.timezone}
                    />
                </div>
                <div className={s.currentInfo}>
                    <CurrentInfoBlock 
                        currentTemp={props.data.currentTemp}
                        changeToFahr={changeToFahr}
                        isShowingCels={isShowingCels}
                        setIcons={setIcons}
                        currentIcon={props.data.currentIcon}
                        lang={lang}
                        feelsLike={props.data.feelsLike}
                        windSpeed={props.data.windSpeed}
                        humidity={props.data.humidity} 
                    />   
                </div>

                <div className={s.nextDays}>
                    <div className={s.nextDay}>
                        <div className={s.nameOfDay}>{nextDays(1)}</div>
                        {isShowingCels ? firstDay[0] + '°C' : changeToFahr(firstDay[0]).toFixed(0) + '°F'}

                        {setIcons('icon2', firstDay[1], 64)}
                    </div>
                    <div className={s.nextDay}>
                        <div className={s.nameOfDay}>{nextDays(2)}</div>
                        {isShowingCels ? secDay[0] + '°C' : changeToFahr(secDay[0]).toFixed(0) + '°F'}
                        {setIcons('icon3', secDay[1], 64)}
                    </div>
                    <div className={s.nextDay}>
                        <div className={s.nameOfDay}>{nextDays(3)}</div>
                        {isShowingCels ? thirdDay[0] + '°C' : changeToFahr(thirdDay[0]).toFixed(0) + '°F'}
                        {setIcons('icon4', thirdDay[1], 64)}
                    </div>

                </div>
            </div>
            <div className={s.mapBlock}>
                <MapWidget coordinates={props.data} />
                <div className={s.coordinates}>
                    <p>{lang === 'en' ? languages.en.longitude : languages.ru.longitude}: {props.data.long.toFixed(2)}'</p>
                    <p>{lang === 'en' ? languages.en.latitude : languages.ru.latitude}: {props.data.lat.toFixed(2)}'</p>
                </div>
            </div>
        </div>
    )
}

export default InfoLayer;
