import * as React from "react";
import { Container, Row, Col} from "react-bootstrap";
import "./Footer.css";

function Footer() {
  const GTLogo = require("../assets/images/gt-logo-fullname-blk.svg").default;

  return (
    <Container fluid className="footer">
      <Row>
        <Col sm={12} md={4} lg={3}>
          <address className="footerSection">
            <strong>Georgia Institute of Technology</strong>
            <br />
            North Avenue, Atlanta, GA 30332
            <br />
            404.894.2000
          </address>
        </Col>
        <Col sm={12} md={8} lg={9}>
          <Row>
            <Col sm={4}>
              <div className="footerSection">
                <p><a href="https://www.directory.gatech.edu/" target="_blank">Directory</a></p>
                <p><a href="http://www.gatech.edu/emergency/" target="_blank">Emergency Information</a></p>
                <p><a href="http://www.gatech.edu/legal/" target="_blank">Legal &amp; Privacy Information</a></p>
                <p><a href="https://gbi.georgia.gov/human-trafficking-notice" target="_blank">Human Trafficking Notice</a></p>
                <p><a href="https://titleix.gatech.edu/" target="_blank">Title IX/Sexual Misconduct</a></p>
              </div>
            </Col>
            <Col sm={4}>
              <div className="footerSection">
                <p><a href="http://www.gatech.edu/accessibility/" target="_blank">Accessibility</a></p>
                <p><a href="http://www.gatech.edu/accountability/" target="_blank">Accountability</a></p>
                <p><a href="https://www.gatech.edu/accreditation/" target="_blank">Accreditation</a></p>
                <p><a href="http://www.careers.gatech.edu/" target="_blank">Employment</a></p>
              </div>
            </Col>
            <Col sm={4}>
              <Row>
                <Col>
                  <img
                    className="footerImage"
                    src={GTLogo}
                    alt="Georgia Institute of Technology"
                    loading="lazy"
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <p style={{ letterSpacing: "normal", float: "right" }}>©&nbsp;Georgia Institute of Technology</p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
