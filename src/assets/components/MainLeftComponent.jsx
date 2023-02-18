import { Col, Row, InputGroup, FormControl } from "react-bootstrap";
import { BsSearch, BsGeoFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

const MainLeftComponent = () => {
  const ready = useSelector((state) => state.isLoading);
  const dailyWeather = useSelector((state) => state.weather.weatherDailyResult);
  const locationCoordinates = useSelector((state) => state.weather.geoResult);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${locationCoordinates.lat}&lon=${locationCoordinates.lon}&appid=a07c515bd5eb284d7c76a2d03970002b&units=metric`
      );
      if (response.ok) {
        const data = await response.json();
        setWeather(data);
        setLoad(false);
      } else {
        alert("errore nella response del meteo", response);
      }
    } catch (error) {
      alert("errore fatale nella fetch meteo", error);
    }
  };

  const setLoad = (bool) => {
    dispatch({
      type: "SET_LOAD",
      payload: bool,
    });
  };

  const setWeather = (value) => {
    dispatch({
      type: "ADD_WEATHER_RESULT",
      payload: value,
    });
  };

  useEffect(() => {
    fetchWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationCoordinates]);

  return (
    <Col xs={3} className="mainLeftContainer ">
      <Row>
        <Col xs={12} className="d-flex justify-content-around align-items-center">
          <BsSearch
            className="inputIcon"
            onClick={() => {
              dispatch({
                type: "ADD_LOCATION",
                payload: search,
              });
              setLoad(true);
            }}
          />
          <InputGroup className="mx-1 inputContainer">
            <FormControl
              placeholder="Search for places..."
              aria-label="Search for places..."
              aria-describedby="basic-addon1"
              className="inputSearch"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
          <BsGeoFill className="inputIcon" />
        </Col>
        <Col xs={12}>
          {dailyWeather.weather && (
            <img
              src={"http://openweathermap.org/img/wn/" + dailyWeather.weather[0].icon + "@4x.png"}
              alt="weather"
              style={{ width: 80 + "%" }}
            />
          )}
        </Col>
        <Col xs={12} className="weatherTextContainer">
          <Row>
            <Col xs={12}>{!ready && <h3 className="degree">{Math.round(dailyWeather.main.temp)}°</h3>}</Col>
            <Col xs={12} className="mb-4">
              <h4>
                Today, <span>13:00</span>
              </h4>
            </Col>
          </Row>
          <hr />
        </Col>
        <Col xs={12}>
          <Row>
            <Col xs={12} className="d-flex align-items-center my-4">
              <img src="" alt="weather" />
              {dailyWeather.weather && <p className="description m-0 ml-2">{dailyWeather.weather[0].description}</p>}
            </Col>
            <Col xs={12} className="d-flex align-items-center mt-2 mb-3">
              <img src="" alt="weather" />
              {dailyWeather.weather && <p className="description m-0 ml-2 ">{dailyWeather.weather[0].main}</p>}
            </Col>
          </Row>
        </Col>
        <Col xs={12}>
          <div className="currentCityContainer p-3 mt-5 d-flex align-items-center justify-content-center">
            {!ready && <h4>Location: {dailyWeather.name}</h4>}
          </div>
        </Col>
      </Row>
    </Col>
  );
};

export default MainLeftComponent;
