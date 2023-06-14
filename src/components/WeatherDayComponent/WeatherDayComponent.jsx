import { Row } from "react-bootstrap";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { WeatherHourFocusComponent } from "./WheatherHourFocusComponent/WeatherHourFocusComponent";

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

const WeatherDayComponent = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hourFocus, setHourFocus] = useState([]);
  const [render, setRender] = useState(true);
  const allWeekWeather = useSelector((state) => state.weather.allWeekWeather);
  const weeklyWeather = useSelector(
    (state) => state.weather.weatherWeeklyResult
  );

  const theDayIs = (date) => {
    const possibleDay = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const day = new Date(date);
    let theDay = possibleDay[day.getDay()];
    return theDay.slice(0, 3);
  };

  useEffect(() => {
    const toMatch = new Date(props.day.dt_txt).toISOString().slice(0, 10);
    const relatedPredictions = allWeekWeather.filter(
      (el) => el.dt_txt.slice(0, 10) === toMatch
    );
    setHourFocus(relatedPredictions);
    setTimeout(() => setRender(false), 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      className="col p-1 px-xl-3"
      animate={isOpen ? "open" : "closed"}
    >
      <Row className="dayRow">
        <motion.div
          className="d-flex flex-column align-items-center dayCard px-0 py-3 "
          whileTap={{ scale: 0.85 }}
          onClick={() => setIsOpen(!isOpen)}
        >
          {weeklyWeather && (
            <>
              <p className="theDay">{theDayIs(props.day.dt_txt)}</p>
              <img
                src={
                  "http://openweathermap.org/img/wn/" +
                  props.day.weather[0].icon +
                  "@2x.png"
                }
                alt="weather icon"
                className="weatherPng"
              />
              <div className="d-flex justify-content-around day-temp-container">
                <p className="dayTemp">
                  {Math.round(props.day.main.temp_max)}°
                </p>
                <p className="px-2 dayTemp">-</p>
                <p className="dayTemp">
                  {Math.round(props.day.main.temp_min)}°
                </p>
              </div>
            </>
          )}
        </motion.div>
        <motion.ul
          className={`daily-hour-list ${render && "render-list"}`}
          variants={{
            open: {
              clipPath: "inset(0% 0% 0% 0% round 10px)",
              transition: {
                type: "spring",
                bounce: 0,
                duration: 0.7,
                delayChildren: 0.3,
                staggerChildren: 0.05,
              },
            },
            closed: {
              clipPath: "inset(10% 50% 90% 50% round 10px)",
              transition: {
                type: "spring",
                bounce: 0,
                duration: 0.3,
              },
            },
          }}
          style={{ pointerEvents: isOpen ? "auto" : "none" }}
        >
          <motion.li
            className="per-hour-recap-item text-center"
            variants={itemVariants}
          >
            {theDayIs(props.day.dt_txt)}, {props.day.dt_txt.slice(0, 10)}
          </motion.li>
          {hourFocus.length > 0 &&
            hourFocus.map((el, i) => (
              <motion.li variants={itemVariants}>
                <WeatherHourFocusComponent
                  key={i}
                  hourFragment={el}
                  index={i}
                />
              </motion.li>
            ))}
        </motion.ul>
      </Row>
    </motion.div>
  );
};
export default WeatherDayComponent;
