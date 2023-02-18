import { Col } from "react-bootstrap";
import { useSelector } from "react-redux";

const WeatherDayComponent = (props) => {
  const weeklyWeather = useSelector((state) => state.weather.weatherWeeklyResult);

  const theDayIs = (date) => {
    const possibleDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = new Date(date);
    let theDay = possibleDay[day.getDay()];
    return theDay.slice(0, 3);
  };
  return (
    <Col className="d-flex flex-column align-items-center">
      {weeklyWeather && (
        <>
          <p>{theDayIs(props.day.dt_txt)}</p>
          <img src={"http://openweathermap.org/img/wn/" + props.day.weather[0].icon + ".png"} alt="weather icon" />
          <div className="d-flex ">
            <p>{Math.round(props.day.main.temp_max)}°</p>
            <p className="mx-2">-</p>
            <p>{Math.round(props.day.main.temp_min)}°</p>
          </div>
        </>
      )}
    </Col>
  );
};
export default WeatherDayComponent;
