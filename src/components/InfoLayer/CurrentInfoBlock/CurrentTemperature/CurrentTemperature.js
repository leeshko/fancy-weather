import s from './currentTemperature.module.css'

const CurrentTemperature = ({ currentTemp, isShowingCels, changeToFahr }) => {

    return (
        <div className={s.currentTemperature}>
            {isShowingCels ? currentTemp.toFixed(0) + '°C' : changeToFahr(currentTemp).toFixed(0) + '°F'}
        </div>)
}

export default CurrentTemperature;