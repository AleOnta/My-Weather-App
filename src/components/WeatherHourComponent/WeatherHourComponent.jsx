import { useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import thermoMax from "../../assets/img/thermo-max.svg";
import humidity from "../../assets/img/humidity.svg";
import pressure from "../../assets/img/pressure.svg";

export const WeatherHourComponent = ({ hourFragment }) => {
  const allWeekWeather = useSelector((state) => state.weather.allWeekWeather);

  const retrieveHour = (date) => {
    const myDate = new Date(date);
    const hour = myDate.getHours();
    const ampm = hour >= 12 ? "PM" : "AM";
    return hour + ":00 " + ampm;
  };

  return (
    <Col className="p-1 px-xl-3 hour-fragments-container">
      <Row className="dayRow">
        <Col className="d-flex flex-column align-items-center hourCard px-0 py-3 ">
          {allWeekWeather && (
            <>
              <p className="theHour">{retrieveHour(hourFragment.dt_txt)}</p>
              <img
                src={
                  "http://openweathermap.org/img/wn/" +
                  hourFragment.weather[0].icon +
                  ".png"
                }
                alt="weather icon"
                className="weatherPng"
              />
              <div className="hour-data-container">
                <div className="d-flex aling-items-center justify-content-between pb-1">
                  <img
                    src={thermoMax}
                    alt="thermometer icon"
                    className="hour-icon-data"
                  />
                  <p className="hour-actual-data">
                    {Math.round(hourFragment.main.temp)}
                    <span className="data-measure">°</span>
                  </p>
                </div>
                <div className="d-flex aling-items-center justify-content-between pb-1">
                  <img
                    src={humidity}
                    alt="humidity icon"
                    className="hour-icon-data"
                  />
                  <p className="hour-actual-data">
                    {hourFragment.main.humidity}
                    <span className="data-measure">%</span>
                  </p>
                </div>
                <div className="d-flex aling-items-center justify-content-between pb-1">
                  <img
                    src={pressure}
                    alt="pressure icon"
                    className="hour-icon-data"
                  />
                  <p className="hour-actual-data">
                    {hourFragment.main.pressure}
                    <span className="data-measure">hPa</span>
                  </p>
                </div>
              </div>
            </>
          )}
        </Col>
      </Row>
    </Col>
  );
};
