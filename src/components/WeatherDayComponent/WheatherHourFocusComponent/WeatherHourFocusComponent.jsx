import thermoMax from "../../../assets/img/thermo-max.svg";
import humidity from "../../../assets/img/humidity.svg";
import wind from "../../../assets/img/wind.svg";
import { useSelector } from "react-redux";

export const WeatherHourFocusComponent = ({ hourFragment, index }) => {
  const tempMeasure = useSelector((state) => state.measure);

  const retrieveHour = (date) => {
    const myDate = new Date(date);
    const hour = myDate.getHours();
    const ampm = hour >= 12 ? "PM" : "AM";
    return hour + ":00 " + ampm;
  };

  return (
    <div className="d-flex align-items-center justify-content-around weather-predictions-container px-2">
      <p className="hour rounded p-1">{retrieveHour(hourFragment.dt_txt)}</p>
      <img
        src={
          "http://openweathermap.org/img/wn/" +
          hourFragment.weather[0].icon +
          ".png"
        }
        alt="weather icon"
      />
      <div className="temp-container ps-1 me-2 d-flex align-items-center">
        <img className="hour-frag-img" src={thermoMax} alt="temperature icon" />
        <p className="hour-frag-data">
          {tempMeasure === "cel"
            ? Math.round(hourFragment.main.temp)
            : Math.round(hourFragment.main.temp * (9 / 5) + 32)}
          °
        </p>
      </div>
      <div className="humidity-container ps-1 me-2 d-flex align-items-center">
        <img className="hour-frag-img" src={humidity} alt="humidity icon" />
        <p className="hour-frag-data">{hourFragment.main.humidity}%</p>
      </div>
      <div className="wind-container ps-1 d-flex align-items-center">
        <img className="hour-frag-img" src={wind} alt="wind icon" />
        <p className="hour-frag-data">
          {hourFragment.wind.speed}
          <span>km/h</span>
        </p>
      </div>
    </div>
  );
};
