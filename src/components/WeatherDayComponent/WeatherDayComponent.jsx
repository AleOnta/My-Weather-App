import { Col, Row } from "react-bootstrap";
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
    <Col className="p-1 px-xl-3">
      <Row className="dayRow">
        <Col className="d-flex flex-column align-items-center dayCard px-0 py-3 ">
          {weeklyWeather && (
            <>
              <p className="theDay">{theDayIs(props.day.dt_txt)}</p>
              <img
                src={"http://openweathermap.org/img/wn/" + props.day.weather[0].icon + "@2x.png"}
                alt="weather icon"
                className="weatherPng"
              />
              <div className="d-flex ">
                <p className="dayTemp">{Math.round(props.day.main.temp_max)}°</p>
                <p className="px-2 dayTemp">-</p>
                <p className="dayTemp">{Math.round(props.day.main.temp_min)}°</p>
              </div>
            </>
          )}
        </Col>
      </Row>
    </Col>
  );
};
export default WeatherDayComponent;
