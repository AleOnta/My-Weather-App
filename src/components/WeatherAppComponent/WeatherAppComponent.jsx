import { Row } from "react-bootstrap";
import MainLeftComponent from "../MainLeftComponent/MainLeftComponent";
import MainRightComponent from "../MainRightComponent/MainRightComponent";

const WeatherAppComponent = () => {
  return (
    <Row className="m-0">
      <MainLeftComponent />
      <MainRightComponent />
    </Row>
  );
};

export default WeatherAppComponent;
