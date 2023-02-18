import { Col, Row } from "react-bootstrap";
import { BsCompass } from "react-icons/bs";
import { useSelector } from "react-redux";

const LowerMainRightComponent = () => {
  const dailyWeather = useSelector((state) => state.weather.weatherDailyResult);

  const epochToTime = (epoch) => {
    const date = new Date(epoch * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return hours + ":" + minutes;
  };

  const humidityChecker = (value) => {
    return value < 30 ? "Low" : value > 30 && value < 60 ? "Normal" : "High";
  };

  const visibilityChecker = (value) => {
    return value < 2000 ? "Low" : value > 2000 && value < 6000 ? "Average" : "High";
  };

  const pressureChecker = (value) => {
    return value < 200 ? "Low" : value > 200 && value < 700 ? "Average" : "High";
  };

  return (
    <>
      <Col xs={12} className="mt-5">
        <h3>Today's Highlights</h3>
      </Col>
      <Col xs={12} className="mt-5">
        <Row xs={3}>
          <Col>
            <h5>Temperature</h5>
            <img src="" alt="temperature info" />
            {dailyWeather.main && (
              <>
                <p>Min. {Math.round(dailyWeather.main.temp_min)}°</p>
                <p>Max. {Math.round(dailyWeather.main.temp_max)}°</p>
                <p>Feels like {Math.round(dailyWeather.main.feels_like)}°</p>
              </>
            )}
          </Col>
          <Col>
            <h5>Wind Status</h5>
            {dailyWeather.wind && <h2>{dailyWeather.wind.speed} km/h</h2>}

            <div className="d-flex align-items-center">
              <BsCompass />
              <p className="mb-0 ml-2">Deg.</p>
              {dailyWeather.wind && <p className="mb-0 ml-2">{dailyWeather.wind.deg}</p>}
            </div>
          </Col>
          <Col>
            <h5>Sunrise / Sunset</h5>
            <div>
              <img src="" alt="" />
              <div>{dailyWeather.sys && <p>{epochToTime(dailyWeather.sys.sunrise)} AM</p>}</div>
            </div>
            <div>
              <img src="" alt="" />
              <div>{dailyWeather.sys && <p>{epochToTime(dailyWeather.sys.sunset)} PM</p>}</div>
            </div>
          </Col>
          <Col>
            <h5>Humidity</h5>
            {dailyWeather.main && (
              <>
                <h2>{dailyWeather.main.humidity}%</h2>
                <div>
                  <p>{humidityChecker(parseInt(dailyWeather.main.humidity))}</p>
                </div>
              </>
            )}
          </Col>
          <Col>
            <h5>Visibility</h5>
            {dailyWeather.visibility && (
              <>
                <h2>{dailyWeather.visibility.toString().slice(0, 2)} km</h2>
                <div>
                  <p>{visibilityChecker(dailyWeather.visibility)}</p>
                </div>
              </>
            )}
          </Col>
          <Col>
            <h5>Pressure</h5>
            {dailyWeather.main && (
              <>
                <h2>{dailyWeather.main.pressure} hPa</h2>
                <div>
                  <p>{pressureChecker(dailyWeather.main.pressure)}</p>
                </div>
              </>
            )}
          </Col>
        </Row>
      </Col>
    </>
  );
};
export default LowerMainRightComponent;
