import * as React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Image from "react-bootstrap/Image";
import { FiSettings } from "react-icons/fi";
import "./NavBar.css";

function NavBar() {
  const GTLogo = require("../assets/images/gt-logo-full-text.svg").default;

  return (
    <Navbar expand="lg" style={styles.navbar}>
      <Container style={styles.row}>
        <Navbar.Brand href="#home">
          <img src={GTLogo} alt="hehe" style={styles.logo} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" style={styles.nav}>
          <Nav className="" style={{ height: "100%" }}>
            <Nav.Link className="navLink" style={styles.link}>
              Home
            </Nav.Link>
            <Nav.Link className="navLink" style={styles.link}>
              Apply
            </Nav.Link>
          </Nav>
          <Nav className="" style={{ height: "100%" }}>
            <NavDropdown
              title={<FiSettings size={24} />}
              id="basic-nav-dropdown"
              style={styles.settings}
              className="navLink"
            >
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;

const styles = {
  row: {
    display: "flex",
    flexDirection: "row",
    height: "100%",
  },
  navbar: {
    backgroundColor: "#B3A369",
    height: "10vh",
    color: "#003057",
    padding: "0px",
  },
  nav: {
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logo: {
    height: "5vh",
    marginLeft: "30px",
    marginRight: "75px",
  },
  link: {
    fontWeight: "150",
    fontSize: "1.4rem",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "0 20px",
  },
  settings: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    color: "#003057",
    marginRight: "50px",
  },
};
