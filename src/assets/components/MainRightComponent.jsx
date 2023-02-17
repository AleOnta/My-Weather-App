import { Col, Row } from "react-bootstrap";
import LowerMainRightComponent from "./LowerMainRightComponent";
import UpperMainRightComponent from "./UpperMainRightComponent";

const MainRightComponent = () => {
  return (
    <Col xs={9}>
      <Row>
        <UpperMainRightComponent />
        <LowerMainRightComponent />
      </Row>
    </Col>
  );
};
export default MainRightComponent;
