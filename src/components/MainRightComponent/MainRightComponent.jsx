import { Col, Row } from "react-bootstrap";
import LowerMainRightComponent from "../LowerMainRightComponent/LowerMainRightComponent";
import UpperMainRightComponent from "../UpperMainRightComponent/UpperMainRightComponent";

const MainRightComponent = () => {
  return (
    <Col xs={12} md={9} className="mainRightContainer h-100">
      <Row className="rowRight">
        <UpperMainRightComponent />
        <LowerMainRightComponent />
      </Row>
    </Col>
  );
};
export default MainRightComponent;
