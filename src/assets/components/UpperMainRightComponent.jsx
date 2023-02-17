import { Button, Col, Row } from "react-bootstrap";

const UpperMainRightComponent = () => {
  return (
    <>
      <Col xs={12} className="d-flex justify-content-between align-items-center">
        <div>
          <Button className="dayOrWeek">Today</Button>
          <Button className="dayOrWeek ml-3">Week</Button>
        </div>
        <div>
          <Button className="celsiusOrFarheneit mr-3">C°</Button>
          <Button className="celsiusOrFarheneit">F°</Button>
        </div>
      </Col>
      <Col xs={12} className="my-5">
        <Row>
          <Col className="d-flex flex-column align-items-center">
            <p>Sun</p>
            <img src="" alt="weather" />
            <div className="d-flex ">
              <p>15°</p>
              <p className="ml-1">-3°</p>
            </div>
          </Col>
          <Col className="d-flex flex-column align-items-center">
            <p>Sun</p>
            <img src="" alt="weather" />
            <div className="d-flex ">
              <p>15°</p>
              <p className="ml-1">-3°</p>
            </div>
          </Col>
          <Col className="d-flex flex-column align-items-center">
            <p>Sun</p>
            <img src="" alt="weather" />
            <div className="d-flex ">
              <p>15°</p>
              <p className="ml-1">-3°</p>
            </div>
          </Col>
          <Col className="d-flex flex-column align-items-center">
            <p>Sun</p>
            <img src="" alt="weather" />
            <div className="d-flex ">
              <p>15°</p>
              <p className="ml-1">-3°</p>
            </div>
          </Col>
          <Col className="d-flex flex-column align-items-center">
            <p>Sun</p>
            <img src="" alt="weather" />
            <div className="d-flex ">
              <p>15°</p>
              <p className="ml-1">-3°</p>
            </div>
          </Col>
          <Col className="d-flex flex-column align-items-center">
            <p>Sun</p>
            <img src="" alt="weather" />
            <div className="d-flex ">
              <p>15°</p>
              <p className="ml-1">-3°</p>
            </div>
          </Col>
          <Col className="d-flex flex-column align-items-center">
            <p>Sun</p>
            <img src="" alt="weather" />
            <div className="d-flex ">
              <p>15°</p>
              <p className="ml-1">-3°</p>
            </div>
          </Col>
        </Row>
      </Col>
    </>
  );
};
export default UpperMainRightComponent;
