import * as React from "react";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function Footer() {
  const GTLogo = require("../assets/images/gt-logo-full-text.svg").default;

  return (
    <Navbar expand="lg" fixed="bottom" style={styles.footer}>
      <Container style={styles.row}>
        {/* <Navbar.Brand>Georgia Tech</Navbar.Brand> */}
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
          </Nav>
        </Navbar.Collapse> */}
        <img src={GTLogo} alt="Georgia Tech" style={styles.logo} />
      </Container>
    </Navbar>
  );
}

export default Footer;

const styles = {
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  logo: {
    height: "3.7vh",
    marginLeft: "30px",
    marginRight: "75px",
  },
  footer: {
    backgroundColor: "#857437",
  },
};
