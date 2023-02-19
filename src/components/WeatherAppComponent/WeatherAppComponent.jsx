import { Row } from "react-bootstrap";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MainLeftComponent from "../MainLeftComponent/MainLeftComponent";
import MainRightComponent from "../MainRightComponent/MainRightComponent";

const WeatherAppComponent = () => {
  const geoParam = useSelector((state) => state.weather.toFetchGeo);
  const dispatch = useDispatch();

  const fetchLocation = async (location) => {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=a07c515bd5eb284d7c76a2d03970002b`
      );
      if (response.ok) {
        const data = await response.json();
        const coordinates = {
          lat: data[0].lat,
          lon: data[0].lon,
        };
        setCoordinates(coordinates);
      } else {
        alert("errore nella response della fetch", response);
      }
    } catch (error) {
      alert("errore fatale", error);
    }
  };

  const setCoordinates = (values) => {
    dispatch({
      type: "ADD_COORDINATES",
      payload: values,
    });
  };

  useEffect(() => {
    fetchLocation(geoParam);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geoParam]);

  return (
    <Row className="h-100 m-0">
      <MainLeftComponent />
      <MainRightComponent />
    </Row>
  );
};

export default WeatherAppComponent;
