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
          <Container fluid>
            <Row>
            <Col>
                <DefaultPage1 nextStep={nextStep} />
              </Col>
            </Row>
          </Container>
        </div>
      );
    case 2:
      return (
        <div>
          <Container fluid>
            <Row>
              <Col>
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
