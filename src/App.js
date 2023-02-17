import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { Container, Row, Col } from "react-bootstrap";
import MainLeftComponent from "./assets/components/MainLeftComponent";
import MainRightComponent from "./assets/components/MainRightComponent";

function App() {
  return (
    <Container fluid className="w-100 h-100">
      <Row className="h-100 p-5 m-0">
        <Col xs={12} className="mainContainer">
          <Row className="h-100 m-0">
            <MainLeftComponent />
            <MainRightComponent />
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
