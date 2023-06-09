import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { Container, Row, Col } from "react-bootstrap";
import WeatherAppComponent from "./components/WeatherAppComponent/WeatherAppComponent";

function App() {
  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center p-3 p-md-5  fullContainer"
    >
      <Row className="m-0">
        <Col xs={12} className="mainContainer p-0">
          <WeatherAppComponent />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
