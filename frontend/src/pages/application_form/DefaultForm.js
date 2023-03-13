import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import DefaultPage1 from "./DefaultPage1";
import DefaultPage2 from "./DefaultPage2";

function DefaultForm() {
  const [step, setstep] = useState(1);

  const nextStep = () => {
    setstep(step + 1);
  };

  const prevStep = () => {
    setstep(step - 1);
  };

  switch (step) {
    case 1:
      return (
        <div>
          <Container className="align-content-center">
            <Row>
            <Col px={4}>
                <DefaultPage1 nextStep={nextStep} />
              </Col>
            </Row>
          </Container>
        </div>
      );
    case 2:
      return (
        <div>
          <Container>
            <Row>
              <Col px={4}>
                <DefaultPage2 prevStep={prevStep} />
              </Col>
            </Row>
          </Container>
        </div>
      );
    default:
      return <div></div>;
  }
}

export default DefaultForm;
