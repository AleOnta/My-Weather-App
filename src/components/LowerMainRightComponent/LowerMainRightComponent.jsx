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
import { useEffect, useState } from "react";
import { ChartModalComponent } from "./ChartsModalsComponents/ChartModalComponent";

const LowerMainRightComponent = () => {
  const [windData, setWindData] = useState(null);
  const [humidityData, setHumidityData] = useState(null);
  const [temperatureData, setTemperatureData] = useState(null);
  const tempMeasure = useSelector((state) => state.measure);
  const dailyWeather = useSelector((state) => state.weather.weatherDailyResult);
  const dayByDayWeather = useSelector(
    (state) => state.weather.weatherWeeklyResult
  );

  const epochToTime = (epoch) => {
    const date = new Date(epoch * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return hours + ":" + minutes;
  };

  const retrieveHour = (epoch, diffTZ) => {
    const d = new Date(epoch * 1000);
    const localTime = d.getTime();
    const localOffset = d.getTimezoneOffset() * 60000;
    const utc = localTime + localOffset;
    const offset = Math.round(diffTZ / 60 / 60);
    const current = utc + 3600000 * offset;
    const currentTime = new Date(current);
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    return `${hours < 10 ? "0" + hours : hours}:${
      minutes < 10 ? "0" + minutes : minutes
    } ${hours >= 12 ? "PM" : "AM"}`;
  };

  const humidityChecker = (value) => {
    return value < 30 ? "Low" : value > 30 && value < 60 ? "Normal" : "High";
  };

  const visibilityChecker = (value) => {
    return value < 2000
      ? "Low"
      : value > 2000 && value < 6000
      ? "Average"
      : "High";
  };

  const pressureChecker = (value) => {
    return value < 200
      ? "Low"
      : value > 200 && value < 700
      ? "Average"
      : "High";
  };

  const defineColorByTemperature = (valuesArray) => {
    const tempColors = [];
    for (const temp of valuesArray) {
      if (temp >= 35) {
        tempColors.push("#de0434"); // heavy red
      } else if (temp < 35 && temp >= 30) {
        tempColors.push("#de5f04"); // heavy orange
      } else if (temp < 30 && temp >= 25) {
        tempColors.push("#de8304"); // orange
      } else if (temp < 25 && temp >= 20) {
        tempColors.push("#deba04"); // heavy yellow
      } else if (temp < 20 && temp >= 15) {
        tempColors.push("#f2f200"); // yellow
      } else if (temp < 15 && temp >= 10) {
        tempColors.push("#09dbc6"); // light blue
      } else if (temp < 10 && temp >= 5) {
        tempColors.push("#09c3db"); // blue
      } else if (temp < 5 && temp >= 0) {
        tempColors.push("#0987db"); // darker blue
      } else {
        tempColors.push("#0d42b5"); // heavy blue
      }
    }
    return tempColors;
  };

  const defineColorByHumidity = (valuesArray) => {
    const humColors = [];
    for (const hum of valuesArray) {
      if (hum >= 95) {
        humColors.push("#0502c4"); // heavy blue
      } else if (hum < 95 && hum >= 80) {
        humColors.push("#234fde"); // blue
      } else if (hum < 80 && hum >= 65) {
        humColors.push("#2371de"); // orange
      } else if (hum < 65 && hum >= 45) {
        humColors.push("#2393de"); // heavy yellow
      } else if (hum < 45 && hum >= 20) {
        humColors.push("#23acde"); // yellow
      } else if (hum < 20 && hum >= 10) {
        humColors.push("#23bfde"); // light blue
      } else {
        humColors.push("#63c7db"); // blue
      }
    }
    return humColors;
  };

  useEffect(() => {
    if (dayByDayWeather.length > 0) {
      setTemperatureData({
        labels: dayByDayWeather.map((el) => el.dt_txt.slice(0, 10)),
        datasets: [
          {
            label: "Registered temperatures",
            data: dayByDayWeather.map((el) => Math.round(el.main.temp)),
            backgroundColor: defineColorByTemperature(
              dayByDayWeather.map((el) => Math.round(el.main.temp))
            ),
          },
        ],
      });

      setHumidityData({
        labels: dayByDayWeather.map((el) => el.dt_txt.slice(0, 10)),
        datasets: [
          {
            label: "Registered humidity",
            data: dayByDayWeather.map((el) => el.main.humidity),
            backgroundColor: defineColorByHumidity(
              dayByDayWeather.map((el) => el.main.humidity)
            ),
          },
        ],
      });

      setWindData({
        labels: dayByDayWeather.map((el) => el.dt_txt.slice(0, 10)),
        datasets: [
          {
            label: "Wind strenght",
            data: dayByDayWeather.map((el) => el.wind.speed),
            fill: true,
          },
        ],
      });
    }
  }, [dayByDayWeather]);

  return (
    <>
      <Col
        xs={12}
        className="highlights px-3 px-md-0 d-flex align-items-center"
      >
        <h3 className="mb-0">Today's Highlights</h3>
      </Col>
      <Col xs={12} className="lowerCards px-3 px-md-5 pb-5 pb-md-2">
        <Row xs={2} md={3} className="lowerCardsRow">
          <Col className="cardContainer">
            <Card className="detailCard temperature">
              <Card.Title className="pb-0 d-flex align-items-center justify-content-between">
                <h5>Temperature</h5>
                {temperatureData && (
                  <ChartModalComponent data={temperatureData} type="temp" />
                )}
              </Card.Title>
              <Card.Body>
                {dailyWeather.main && (
                  <>
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="m-0 temp">
                        <span>Min.</span>{" "}
                        {tempMeasure === "cel"
                          ? Math.round(dailyWeather.main.temp_min)
                          : Math.round(
                              dailyWeather.main.temp_min * (9 / 5) + 32
                            )}
                        °
                      </p>
                      <img
                        src={thermoMin}
                        alt="thermometer"
                        className="weatherIcon"
                      />
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                      <p className="m-0 temp">
                        <span>Max.</span>{" "}
                        {tempMeasure === "cel"
                          ? Math.round(dailyWeather.main.temp_max)
                          : Math.round(
                              dailyWeather.main.temp_max * (9 / 5) + 32
                            )}
                        °
                      </p>
                      <img
                        src={thermoMax}
                        alt="thermometer"
                        className="weatherIcon"
                      />
                    </div>
                    <p className="m-0 temp">
                      <span>Feels like</span>{" "}
                      {tempMeasure === "cel"
                        ? Math.round(dailyWeather.main.feels_like)
                        : Math.round(
                            dailyWeather.main.feels_like * (9 / 5) + 32
                          )}
                      °
                    </p>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
          <Col className="cardContainer">
            <Card className="detailCard">
              <Card.Title className="d-flex align-items-center justify-content-between">
                <h5>Wind Status</h5>
                {windData && (
                  <ChartModalComponent data={windData} type="wind" />
                )}
              </Card.Title>
              <Card.Body>
                <div className="d-flex align-items-center justify-content-between">
                  {dailyWeather.wind && <h2>{dailyWeather.wind.speed} km/h</h2>}
                  <img src={wind} alt="wind icon" className="weatherIcon" />
                </div>
                <div className="d-flex align-items-center">
                  <BsCompass />
                  <p className="mb-0 pl-2">Deg.</p>
                  {dailyWeather.wind && (
                    <p className="mb-0 pl-2">{dailyWeather.wind.deg}</p>
                  )}
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
                  {dailyWeather.sys && (
                    <p>
                      {retrieveHour(
                        dailyWeather.sys.sunrise,
                        dailyWeather.timezone
                      )}
                    </p>
                  )}
                  <img
                    src={sunrise}
                    alt="sunrise icon"
                    className="weatherIcon"
                  />
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  {dailyWeather.sys && (
                    <p>
                      {retrieveHour(
                        dailyWeather.sys.sunset,
                        dailyWeather.timezone
                      )}
                    </p>
                  )}
                  <img src={sunset} alt="sunset icon" className="weatherIcon" />
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col className="cardContainer">
            <Card className="detailCard">
              <Card.Title className="d-flex justify-content-between align-items-center">
                <h5>Humidity</h5>
                {humidityData && (
                  <ChartModalComponent data={humidityData} type="hum" />
                )}
              </Card.Title>
              <Card.Body>
                {dailyWeather.main && (
                  <>
                    <div className="d-flex align-items-center justify-content-between">
                      <h2>{dailyWeather.main.humidity}%</h2>
                      <img
                        src={humidity}
                        alt="humidity icon"
                        className="weatherIcon"
                      />
                    </div>
                    <div>
                      <p>
                        {humidityChecker(parseInt(dailyWeather.main.humidity))}
                      </p>
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
                      <h2>
                        {dailyWeather.visibility.toString().slice(0, 2)} km
                      </h2>
                      <img
                        src={visibility}
                        alt="visibility icon"
                        className="weatherIcon"
                      />
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
                      <img
                        src={pressure}
                        alt="pressure icon"
                        className="weatherIcon"
                      />
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
