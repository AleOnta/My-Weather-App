import { Row } from "react-bootstrap";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { WeatherHourFocusComponent } from "./WheatherHourFocusComponent/WeatherHourFocusComponent";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

const WeatherDayComponent = ({ day, index }) => {
  const focusRef = useRef();
  const { width } = useWindowDimensions();
  const [render, setRender] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [hourFocus, setHourFocus] = useState([]);
  const tempMeasure = useSelector((state) => state.measure);
  const allWeekWeather = useSelector((state) => state.weather.allWeekWeather);
  const weeklyWeather = useSelector(
    (state) => state.weather.weatherWeeklyResult
  );

  const definePosition = () => {
    if (width > 308 && width < 418) {
      switch (index) {
        case 0:
          return "on-left";
        case 1:
          return "on-right";
        case 2:
          return "on-left";
        case 3:
          return "on-right";
        default:
          return "";
      }
    } else if (width >= 418 && width < 526) {
      switch (index) {
        case 0:
          return "on-left";
        case 2:
          return "on-right";
        case 3:
          return "on-left";
        case 4:
          return "on-right";
        default:
          return "";
      }
    } else if (width >= 526 && width < 634) {
      switch (index) {
        case 0:
          return "on-left";
        case 1:
          return "on-left";
        case 2:
          return "on-right";
        case 3:
          return "on-right";
        default:
          return "";
      }
    } else if (width >= 634 && width < 768) {
      switch (index) {
        case 0:
          return "on-left";
        case 4:
          return "on-right";
        default:
          return "";
      }
    }
  };

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
    const toMatch = new Date(day.dt_txt).toISOString().slice(0, 10);
    const relatedPredictions = allWeekWeather.filter(
      (el) => el.dt_txt.slice(0, 10) === toMatch
    );
    setHourFocus(relatedPredictions);
    setTimeout(() => setRender(false), 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allWeekWeather]);

  useEffect(() => {
    let handler = (e) => {
      if (!focusRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <motion.div
      className="col p-1 px-xl-3"
      animate={isOpen ? "open" : "closed"}
    >
      <Row className="dayRow">
        <motion.div
          className="d-flex flex-column align-items-center dayCard px-0 py-3 "
          whileTap={{ scale: 0.85 }}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          {weeklyWeather && (
            <>
              <p className="theDay">{theDayIs(day.dt_txt)}</p>
              <img
                src={
                  "http://openweathermap.org/img/wn/" +
                  day.weather[0].icon +
                  "@2x.png"
                }
                alt="weather icon"
                className="weatherPng"
              />
              <div className="d-flex justify-content-around day-temp-container">
                <p className="dayTemp">
                  {tempMeasure === "cel"
                    ? Math.round(day.main.temp_max)
                    : Math.round(day.main.temp_max * (9 / 5) + 32)}
                  °
                </p>
                <p className="px-2 dayTemp">-</p>
                <p className="dayTemp">
                  {tempMeasure === "cel"
                    ? Math.round(day.main.temp_min)
                    : Math.round(day.main.temp_min * (9 / 5) + 32)}
                  °
                </p>
              </div>
            </>
          )}
        </motion.div>
        <motion.ul
          ref={focusRef}
          className={`daily-hour-list ${
            render && "render-list"
          } ${definePosition()}`}
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
            {theDayIs(day.dt_txt)}, {day.dt_txt.slice(0, 10)}
          </motion.li>
          {hourFocus.length > 0 &&
            hourFocus.map((el, i) => (
              <motion.li variants={itemVariants} key={i}>
                <WeatherHourFocusComponent hourFragment={el} index={i} />
              </motion.li>
            ))}
        </motion.ul>
      </Row>
    </motion.div>
  );
};
export default WeatherDayComponent;
