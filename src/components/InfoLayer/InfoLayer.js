import s from './infoLayer.module.css';
import MapWidget from '../Map/Map';
import { Skycons } from '../../assets/skycons';

const InfoLayer = (props) => {

    const [firstDay, secDay, thirdDay] = props.data.nextDaysInfo;
    console.log('11111', props.data.nextDaysInfo)

    const setIcons = (icon, weather, size) => {
        let skycons = new Skycons({ color: "white" });
        skycons.add(icon, Skycons[weather]);
        skycons.play();
        return (<canvas id={icon} width={size} height={size}> </canvas>)
    }

    const oneDay = new Date().getTime() + 24 * 60 * 60 * 1000;
    
    const weekDay = (nOfDays) => new Date(nOfDays).toLocaleDateString('en-US', { weekday: 'long' });



    return (
        <div className={s.mainBlock}>
            <div className={s.mainInfoBlock}>
                <div>
                    <h1> {props.data.usersCity}, {props.data.usersCountry}</h1>
                    <h3>date</h3>
                </div>
                <div className={s.currentInfo}>
                    <div className={s.currentTemperature}>
                        {props.data.currentTemp.toFixed(0) + '°'}
                    </div>
                    <div className={s.overcastBlock}>
                        <div className={s.icon}>
                            {setIcons('icon1', `${props.data.currentIcon}`, 128)}
                        </div>
                        <div className={s.overcast}>
                            <div>overcast</div>
                            <div>Feels like: {props.data.feelsLike.toFixed(0)}°</div>
                            <div>Wind: {props.data.windSpeed} m/s</div>
                            <div>Humidity: {props.data.humidity}%</div>
                        </div>
                    </div>
                </div>

                <div className={s.nextDays}>
                    <div className={s.nextDay}>
                    <div>{weekDay(oneDay)}</div>
                        {firstDay[0]}°
                        {setIcons('icon2', firstDay[1], 64)}
                    </div>
                    <div className={s.nextDay}>
                        <div>{weekDay(oneDay*2)}</div>
                        {secDay[0]}°
                        {setIcons('icon3', secDay[1], 64)}
                    </div>
                    <div className={s.nextDay}>
                    <div>{weekDay(oneDay*3)}</div>
                        {thirdDay[0]}°
                        {setIcons('icon4', thirdDay[1], 64)}
                    </div>

                </div>
            </div>
            <div className={s.mapBlock}>
                <MapWidget coordinates={props.data} />
                <div className={s.coordinates}>
                    <p>Latitude: {props.data.lat.toFixed(2)}'</p>
                    <p>Longitude: {props.data.long.toFixed(2)}'</p>
                </div>
            </div>
        </div>
    )
}

export default InfoLayer;


// let regionNames = new Intl.DisplayNames(['ru'], {type: 'region'});
// regionNames.of('BY'); 