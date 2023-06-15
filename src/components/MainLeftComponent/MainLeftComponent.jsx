import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Logo from "../../assets/img/logo.svg";
import { OffCanvasComponent } from "../SearchOffCanvasComponent/OffCanvasComponent";
import { setLoad, setWeather } from "../../redux/actions";

const MainLeftComponent = () => {
  const ready = useSelector((state) => state.isLoading);
  const tempMeasure = useSelector((state) => state.measure);
  const dailyWeather = useSelector((state) => state.weather.weatherDailyResult);
  const locationCoordinates = useSelector((state) => state.weather.geoResult);
  const dispatch = useDispatch();

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${locationCoordinates.lat}&lon=${locationCoordinates.lon}&appid=a07c515bd5eb284d7c76a2d03970002b&units=metric`
      );
      if (response.ok) {
        const data = await response.json();
        dispatch(setWeather(data));
        dispatch(setLoad(false));
      } else {
        alert("errore nella response del meteo", response);
      }
    } catch (error) {
      alert("errore fatale nella fetch meteo", error);
    }
  };

  const getCurrentTime = () => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours < 10 ? "0" + hours : hours}:${
      minutes < 10 ? "0" + minutes : minutes
    } ${hours >= 12 ? "PM" : "AM"}`;
  };

  useEffect(() => {
    fetchWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationCoordinates]);

  return (
    <>
      <Col xs={12} md={3} className="mainLeftContainer p-0">
        <Row className="h-md-100 pt-5 pb-1 px-3 px-md-0 px-xl-4">
          <Col
            xs={12}
            className="d-flex align-items-center justify-content-around pb-4 d-md-none"
          >
            <img
              src={Logo}
              alt="weather app logo"
              style={{ width: 25 + "%" }}
            />
            <h1>My Weather App</h1>
          </Col>
          <Col
            xs={12}
            className="d-flex justify-content-around align-items-center inputSection p-0"
          >
            <OffCanvasComponent />
          </Col>
          <Col
            xs={6}
            md={12}
            className="pt-4 pt-md-0 d-flex align-items-center"
          >
            {dailyWeather.weather && (
              <img
                src={
                  "http://openweathermap.org/img/wn/" +
                  dailyWeather.weather[0].icon +
                  "@4x.png"
                }
                alt="weather"
                style={{ width: 80 + "%" }}
              />
            )}
          </Col>
          <Col
            xs={6}
            md={12}
            className="weatherTextContainer d-flex align-items-center pt-4 pt-md-0"
          >
            <Row>
              <Col xs={12}>
                {!ready && (
                  <h3 className="degree">
                    {tempMeasure === "cel"
                      ? Math.round(dailyWeather.main.temp)
                      : Math.round(dailyWeather.main.temp * (9 / 5) + 32)}
                    °
                  </h3>
                )}
              </Col>
              <Col xs={12} className=" p-0 pb-4 pt-3">
                <h4>
                  Today, <span>{getCurrentTime()}</span>
                </h4>
              </Col>
            </Row>
            <hr className="d-none d-md-block" />
          </Col>

          <Col xs={12}>
            <hr className="d-md-none" />
            <Row>
              <Col xs={12} className="d-flex align-items-center pt-4">
                {dailyWeather.weather && (
                  <>
                    <img
                      src={
                        "http://openweathermap.org/img/wn/" +
                        dailyWeather.weather[0].icon +
                        ".png"
                      }
                      alt="weather"
                      className="currentWeatherIcon"
                    />
                    <p className="description m-0 pl-2">
                      {dailyWeather.weather[0].description}
                    </p>
                  </>
                )}
              </Col>
              <Col xs={12} className="d-flex align-items-center pt-2 pb-3">
                {dailyWeather.weather && (
                  <>
                    <img
                      src={
                        "http://openweathermap.org/img/wn/" +
                        dailyWeather.weather[0].icon +
                        ".png"
                      }
                      alt="weather"
                      className="currentWeatherIcon"
                    />
                    <p className="description m-0 pl-2">
                      {dailyWeather.weather[0].main}
                    </p>
                  </>
                )}
              </Col>
            </Row>
          </Col>
          <Col xs={12} className="py-4">
            <div className="currentCityContainer px-3 d-flex align-items-center justify-content-center">
              {!ready && (
                <h4>
                  Location:{" "}
                  <span className="currentLocation">{dailyWeather.name}</span>
                </h4>
              )}
            </div>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default MainLeftComponent;
