import * as React from "react";
import { Navbar, Nav, NavItem, Row, Col } from 'react-bootstrap';

function Header() {
    const GTLogo = require("../assets/images/GeorgiaTech_White.svg").default;
    return (
        <Navbar bg="light" variant="light" style={styles.mainHeader}>
            <Navbar.Brand href="https://www.gatech.edu" className="col-sm-3 col-md-3 col-lg-2" style={styles.headerBrand}>
                <img src={GTLogo} alt="Georgia Tech" />
            </Navbar.Brand>
            <Nav className="col-sm-9 col-md-9 col-lg-10">
                <Navbar.Text style={styles.headerBar}>
                    TA Application Hub
                </Navbar.Text>
            </Nav>
        </Navbar>
    );
}

export default Header;

const styles = {
    mainHeader: {
        overflow: "hidden",
        background: "linear-gradient(to right,#b3a369 0%,#a4925a 100%)",
        padding: "0px",
        flexDirection: "row"
    },
    headerBrand: {
        backgroundColor: "#A4925A",
    },
    headerBar: {
        
    }
};