import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import UserDetails from "./UserDetails";
import UserBasics from "./UserBasics";

function MultiStepForm() {
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
              <Col md={{ span: 6, offset: 3 }}>
                <UserBasics nextStep={nextStep} />
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
              <Col md={{ span: 8, offset: 2 }}>
                <UserDetails prevStep={prevStep} />
              </Col>
            </Row>
          </Container>
        </div>
      );
    default:
      return (
        <div></div>
      );
  }
}

export default MultiStepForm;