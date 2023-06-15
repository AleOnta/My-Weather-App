import { Col, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import WeatherDayComponent from "../WeatherDayComponent/WeatherDayComponent";
import { setAllWeekWeather, setWeeklyWeather } from "../../redux/actions";
import { WeatherHourComponent } from "../WeatherHourComponent/WeatherHourComponent";

const UpperMainRightComponent = () => {
  const dispatch = useDispatch();
  const weeklyWeather = useSelector(
    (state) => state.weather.weatherWeeklyResult
  );
  const allWeekWeatherPrediction = useSelector(
    (state) => state.weather.allWeekWeather
  );
  const [dayOrWeek, setDayOrWeek] = useState("week");
  const [todayWeather, setTodayWeather] = useState([]);
  const [dayOrWeekLoading, setDayOrWeekLoading] = useState(false);
  const [celsiusOrFarheneit, setCelsiusOrFarheneit] = useState("celsius");
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
        dispatch(setAllWeekWeather(data.list));
        dispatch(setWeeklyWeather(fixedData));
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

  useEffect(() => {
    if (dayOrWeek === "today" && todayWeather.length === 0) {
      const toSet = [];
      let i = 0;
      while (toSet.length < 5) {
        toSet.push(allWeekWeatherPrediction[i]);
        i++;
      }
      setTodayWeather(toSet);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dayOrWeek]);

  useEffect(() => {
    setTimeout(() => setDayOrWeekLoading(false), 2000);
  }, [dayOrWeekLoading]);

  useEffect(() => {
    weeklyFetcher();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationCoordinates]);

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
              setDayOrWeekLoading(true);
              setDayOrWeek("today");
            }}
          >
            Today
          </button>
          <button
            className={`${
              dayOrWeek === "week" && "dayOrWeekSelected"
            } dayOrWeek pl-sm-3`}
            onClick={() => {
              setDayOrWeekLoading(true);
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
            } celsiusOrFarheneit mr-1 mr-sm-3`}
            onClick={() => setCelsiusOrFarheneit("celsius")}
          >
            °C
          </button>
          <button
            className={`${
              celsiusOrFarheneit === "farheneit" && "celsiusOrFarheneitSelected"
            } celsiusOrFarheneit `}
            onClick={() => setCelsiusOrFarheneit("farheneit")}
          >
            °F
          </button>
        </div>
      </Col>
      <Col xs={12} className="py-5 py-md-4 px-3 px-md-0 upperRightCards">
        <Row>
          {weeklyWeather.length > 0 && !dayOrWeekLoading ? (
            dayOrWeek === "today" ? (
              todayWeather.map((el, i) => (
                <WeatherHourComponent hourFragment={el} key={i} />
              ))
            ) : (
              weeklyWeather.map((e, i) => {
                return <WeatherDayComponent day={e} key={i} index={i} />;
              })
            )
          ) : (
            <div className="d-flex justify-content-around">
              <span className="loader mx-2 mx-lg-5"></span>
              <span className="loader mx-2 mx-lg-5"></span>
              <span className="loader mx-5 d-none d-lg-block"></span>
              <span className="loader mx-5 d-none d-lg-block"></span>
              <span className="loader mx-5 d-none d-lg-block"></span>
            </div>
          )}
        </Row>
      </Col>
    </>
  );
};
export default UpperMainRightComponent;
