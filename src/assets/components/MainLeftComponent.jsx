import { Col, Row, InputGroup, FormControl } from "react-bootstrap";
import { ReactComponent as Logo } from "../img/weather-svgrepo-com.svg";
import { BsSearch, BsGeoFill } from "react-icons/bs";

const MainLeftComponent = () => {
  return (
    <Col xs={3} className="mainLeftContainer ">
      <Row>
        <Col xs={12} className="d-flex justify-content-around align-items-center">
          <BsSearch className="inputIcon" />
          <InputGroup className="mx-1 inputContainer">
            <FormControl
              placeholder="Search for places..."
              aria-label="Search for places..."
              aria-describedby="basic-addon1"
              className="inputSearch"
            />
          </InputGroup>
          <BsGeoFill className="inputIcon" />
        </Col>
        <Col xs={12}>
          <Logo className="currentWeatherPhoto" />
        </Col>
        <Col xs={12} className="weatherTextContainer">
          <Row>
            <Col xs={12}>
              <h3 className="degree">15°</h3>
            </Col>
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
              <p className="description m-0 ml-2">Mostly Cloudy</p>
            </Col>
            <Col xs={12} className="d-flex align-items-center mt-2 mb-3">
              <img src="" alt="weather" />
              <p className="description m-0 ml-2 ">Rain - 30%</p>
            </Col>
          </Row>
        </Col>
        <Col xs={12}>
          <div className="currentCityContainer p-3 mt-5 d-flex align-items-center justify-content-center">
            <h4>Current City, Country</h4>
          </div>
        </Col>
      </Row>
    </Col>
  );
};

export default MainLeftComponent;
