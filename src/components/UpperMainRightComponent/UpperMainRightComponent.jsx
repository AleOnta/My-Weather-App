import { Col, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import WeatherDayComponent from "../WeatherDayComponent/WeatherDayComponent";

const UpperMainRightComponent = () => {
  const dispatch = useDispatch();
  const weeklyWeather = useSelector(
    (state) => state.weather.weatherWeeklyResult
  );
  const [dayOrWeek, setDayOrWeek] = useState("week");
  const [celsiusOrFarheneit, setCelsiusOrFarheneit] = useState("celsius");
  const isLoading = useSelector((state) => state.isLoading);
  const locationCoordinates = useSelector((state) => state.weather.geoResult);

  const weeklyFetcher = async () => {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/forecast?lat=${locationCoordinates.lat}&lon=${locationCoordinates.lon}&appid=a07c515bd5eb284d7c76a2d03970002b&units=metric`
      );
      if (response.ok) {
        const data = await response.json();
        const fixedData = data.list
          .map((e) => ({ ...e, dt: epochToTime(e.dt) }))
          .filter((e) => e.dt === "17:0" || e.dt === "16:0");
        setWeeklyWeather(fixedData);
      } else {
        alert("errore nella response della weekly", response);
      }
    } catch (error) {
      alert("errore fatale nella weekly fetch");
      console.log(error);
    }
  };

  const epochToTime = (epoch) => {
    const date = new Date(epoch * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return hours + ":" + minutes;
  };

  const setWeeklyWeather = (value) => {
    dispatch({
      type: "ADD_WEEKLY_RESULT",
      payload: value,
    });
  };

  useEffect(() => {
    weeklyFetcher();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <>
      <Col
        xs={12}
        className="d-flex justify-content-between align-items-center pt-5 px-3 px-md-5 upperRightButtons"
      >
        <div>
          <button
            className={`${
              dayOrWeek === "today" && "dayOrWeekSelected"
            } dayOrWeek`}
            onClick={() => {
              setDayOrWeek("today");
            }}
          >
            Today
          </button>
          <button
            className={`${
              dayOrWeek === "week" && "dayOrWeekSelected"
            } dayOrWeek pl-3`}
            onClick={() => {
              setDayOrWeek("week");
            }}
          >
            Week
          </button>
        </div>
        <div>
          <button
            className={`${
              celsiusOrFarheneit === "celsius" && "celsiusOrFarheneitSelected"
            } celsiusOrFarheneit mr-3`}
            onClick={() => setCelsiusOrFarheneit("celsius")}
          >
            °C
          </button>
          <button
            className={`${
              celsiusOrFarheneit === "farheneit" && "celsiusOrFarheneitSelected"
            } celsiusOrFarheneit mr-3`}
            onClick={() => setCelsiusOrFarheneit("farheneit")}
          >
            °F
          </button>
        </div>
      </Col>
      <Col xs={12} className="py-5 py-md-4 px-3 px-md-5 upperRightCards">
        <Row>
          {weeklyWeather.length > 0
            ? weeklyWeather.map((e, i) => {
                return <WeatherDayComponent day={e} key={i} />;
              })
            : ""}
        </Row>
      </Col>
    </>
  );
};
export default UpperMainRightComponent;
