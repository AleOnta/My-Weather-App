import { Card, Col, Row } from "react-bootstrap";
import { BsCompass } from "react-icons/bs";
import { useSelector } from "react-redux";
import thermoMin from "../../assets/img/thermo-min.svg";
import thermoMax from "../../assets/img/thermo-max.svg";
import humidity from "../../assets/img/humidity.svg";
import wind from "../../assets/img/wind.svg";
import visibility from "../../assets/img/visibility.svg";
import sunrise from "../../assets/img/sunrise.svg";
import sunset from "../../assets/img/sunset.svg";
import pressure from "../../assets/img/pressure.svg";

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
      <Col xs={12} className="highlights px-3 px-md-5 d-flex align-items-center">
        <h3 className="mb-0">Today's Highlights</h3>
      </Col>
      <Col xs={12} className="lowerCards px-3 px-md-5 pb-5 pb-md-2">
        <Row xs={2} md={3} className="lowerCardsRow">
          <Col className="cardContainer">
            <Card className="detailCard temperature ">
              <Card.Title className="pb-0">
                <h5>Temperature</h5>
              </Card.Title>
              <Card.Body>
                {dailyWeather.main && (
                  <>
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="m-0 temp">Min. {Math.round(dailyWeather.main.temp_min)}°</p>
                      <img src={thermoMin} alt="thermometer" className="weatherIcon" />
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                      <p className="m-0 temp">Max. {Math.round(dailyWeather.main.temp_max)}°</p>
                      <img src={thermoMax} alt="thermometer" className="weatherIcon" />
                    </div>
                    <p className="m-0 temp">Feels like {Math.round(dailyWeather.main.feels_like)}°</p>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
          <Col className="cardContainer">
            <Card className="detailCard">
              <Card.Title>
                <h5>Wind Status</h5>
              </Card.Title>
              <Card.Body>
                <div className="d-flex align-items-center justify-content-between">
                  {dailyWeather.wind && <h2>{dailyWeather.wind.speed} km/h</h2>}
                  <img src={wind} alt="wind icon" className="weatherIcon" />
                </div>
                <div className="d-flex align-items-center">
                  <BsCompass />
                  <p className="mb-0 pl-2">Deg.</p>
                  {dailyWeather.wind && <p className="mb-0 pl-2">{dailyWeather.wind.deg}</p>}
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col className="cardContainer">
            <Card className="detailCard">
              <Card.Title>
                <h5>Sunrise / Sunset</h5>
              </Card.Title>
              <Card.Body>
                <div className="d-flex align-items-center justify-content-between">
                  {dailyWeather.sys && <p>{epochToTime(dailyWeather.sys.sunrise)} AM</p>}
                  <img src={sunrise} alt="sunrise icon" className="weatherIcon" />
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  {dailyWeather.sys && <p>{epochToTime(dailyWeather.sys.sunset)} PM</p>}
                  <img src={sunset} alt="sunset icon" className="weatherIcon" />
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col className="cardContainer">
            <Card className="detailCard">
              <Card.Title>
                <h5>Humidity</h5>
              </Card.Title>
              <Card.Body>
                {dailyWeather.main && (
                  <>
                    <div className="d-flex align-items-center justify-content-between">
                      <h2>{dailyWeather.main.humidity}%</h2>
                      <img src={humidity} alt="humidity icon" className="weatherIcon" />
                    </div>
                    <div>
                      <p>{humidityChecker(parseInt(dailyWeather.main.humidity))}</p>
                    </div>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
          <Col className="cardContainer">
            <Card className="detailCard">
              <Card.Title>
                <h5>Visibility</h5>
              </Card.Title>
              <Card.Body>
                {dailyWeather.visibility && (
                  <>
                    <div className="d-flex align-items-center justify-content-between">
                      <h2>{dailyWeather.visibility.toString().slice(0, 2)} km</h2>
                      <img src={visibility} alt="visibility icon" className="weatherIcon" />
                    </div>
                    <div>
                      <p>{visibilityChecker(dailyWeather.visibility)}</p>
                    </div>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
          <Col className="cardContainer">
            <Card className="detailCard">
              <Card.Title>
                <h5>Pressure</h5>
              </Card.Title>
              <Card.Body>
                {dailyWeather.main && (
                  <>
                    <div className="d-flex align-items-center justify-content-between">
                      <h2>{dailyWeather.main.pressure} hPa</h2>
                      <img src={pressure} alt="pressure icon" className="weatherIcon" />
                    </div>
                    <div>
                      <p>{pressureChecker(dailyWeather.main.pressure)}</p>
                    </div>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Col>
    </>
  );
};
export default LowerMainRightComponent;
