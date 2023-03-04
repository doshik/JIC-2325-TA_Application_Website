import * as React from "react";
import { Container, Nav, Navbar, NavDropdown, Image } from "react-bootstrap";
import { FiSettings } from "react-icons/fi";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { logoutUser } from "../redux/actions/authActions";

function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const role = useSelector((state) => state.auth.user.accountType);
  const GTLogo = require("../assets/images/gt-logo-oneline-white.svg").default;
  const dashboard =
    role === "student" ? "/user/studentdashboard" : "/user/professordashboard";
  const secondAction = role === "student" ? "Apply" : "Create Applications";

  return (
    <Navbar expand="lg" style={styles.navbar}>
      <Container style={styles.row}>
        <Navbar.Brand href="https://www.gatech.edu/">
          <img src={GTLogo} alt="Georgia Tech" style={styles.logo} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" style={styles.nav}>
          <Nav className="" style={{ height: "100%" }}>
            <Nav.Link
              className="navLink"
              style={styles.link}
              onClick={navigate(dashboard)}
            >
              Dashboard
            </Nav.Link>
            <Nav.Link
              className="navLink"
              style={styles.link}
              onClick={() => navigate("/user/professordashboard")}
            >
              {secondAction}
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
              <NavDropdown.Item
                href="#action/3.4"
                onClick={() => {
                  dispatch(logoutUser());
                  navigate("login");
                }}
              >
                Logout
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
  },
  navbar: {
    backgroundColor: "#B3A369",
    height: "8vh",
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
    height: "8vh",
    marginLeft: "75px",
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
