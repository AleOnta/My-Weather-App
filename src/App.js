import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import "./App.scss";

function App() {
  return (
    <Container>
      <Row>
        {/* left col */}
        <Col></Col>
        {/* right col */}
        <Col>
          <Row>
            <Col></Col>
            <Col></Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
