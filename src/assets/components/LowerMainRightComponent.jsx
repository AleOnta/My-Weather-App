import { Col, Row } from "react-bootstrap";
import { BsCompass } from "react-icons/bs";

const LowerMainRightComponent = () => {
  return (
    <>
      <Col xs={12} className="mt-5">
        <h3>Today's Highlights</h3>
      </Col>
      <Col xs={12} className="mt-5">
        <Row xs={3}>
          <Col>
            <h5>UV Index</h5>
            <img src="" alt="UV index info" />
          </Col>
          <Col>
            <h5>Wind Status</h5>
            <h2>7.70 km/h</h2>
            <div>
              <BsCompass />
              <p>WSW</p>
            </div>
          </Col>
          <Col>
            <h5>Sunrise Sunset</h5>
            <div>
              <img src="" alt="" />
              <div>
                <p>6.35AM</p>
                <p>- 1m 46s</p>
              </div>
            </div>
            <div>
              <img src="" alt="" />
              <div>
                <p>5.42PM</p>
                <p>- 2m 22s</p>
              </div>
            </div>
          </Col>
          <Col>
            <h5>Humidity</h5>
            <h2>12%</h2>
            <div>
              <p>Normal</p>
            </div>
          </Col>
          <Col>
            <h5>Visibility</h5>
            <h2>5.2 km</h2>
            <div>
              <p>Average</p>
            </div>
          </Col>
          <Col>
            <h5>Air Quality</h5>
            <h2>105</h2>
            <div>
              <p>Unhealty</p>
            </div>
          </Col>
        </Row>
      </Col>
    </>
  );
};
export default LowerMainRightComponent;
