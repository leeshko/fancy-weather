import s from './currentInfoBlock.module.css';
import CurrentTemperature from './CurrentTemperature/CurrentTemperature';
import CurrentWeatherDescription from './CurrentWeatherDescription/CurrentWeatherDescription';


const CurrentInfoBlock = ({ lang, currentTemp, changeToFahr, isShowingCels, setIcons, currentIcon, feelsLike, windSpeed, humidity}) => {

    return (
        <>
            <CurrentTemperature 
                currentTemp={currentTemp}
                changeToFahr={changeToFahr}
                isShowingCels={isShowingCels}
            />

            <CurrentWeatherDescription 
                setIcons={setIcons}
                currentIcon={currentIcon}
                lang={lang}
                changeToFahr={changeToFahr}
                isShowingCels={isShowingCels}
                feelsLike={feelsLike}
                windSpeed={windSpeed}
                humidity={humidity}
            />
        </>
    )
}

export default CurrentInfoBlock;