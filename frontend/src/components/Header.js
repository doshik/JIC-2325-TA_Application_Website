import * as React from "react";
import { Navbar, Nav, NavItem, Row, Col } from "react-bootstrap";
import GTLogo from "../assets/images/GeorgiaTech_White.svg";

function Header() {
  return (
    <Navbar className="sticky-top" style={styles.header}>
      <Navbar.Brand
        href="https://www.gatech.edu"
        className="col-sm-3 col-md-3 col-lg-2"
        style={styles.brand}
      >
        <div style={styles.logo} />
        {/* <img src={GTLogo} alt="Georgia Tech" style={styles.logo} /> */}
      </Navbar.Brand>
      <Nav className="col-sm-9 col-md-9 col-lg-10">
        <Navbar.Text style={styles.bar}>TA Application Hub</Navbar.Text>
      </Nav>
    </Navbar>
  );
}

export default Header;

const styles = {
  header: {
    overflow: "hidden",
    background: "linear-gradient(to right,#b3a369 0%,#a4925a 100%)",
    padding: "0px",
    flexDirection: "row",
    zIndex: "100",
    height: "90px",
  },
  brand: {
    backgroundColor: "#A4925A",
    boxShadow: "inset -1px 0 0 rgb(0 0 0 / 25%)",
  },
  logo: {
    backgroundImage: `url(${GTLogo})`,
    height: "65px",
    width: "183px",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    margin: "12.5px auto",
  },
  bar: {
    color: "#333333",
    fontFamily: "Abel, sans-serif",
    fontSize: "30px",
    fontWeight: 400,
    lineHeight: 1,
    padding: "30px 25px",
  },
};
