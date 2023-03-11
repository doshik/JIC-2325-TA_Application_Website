import * as React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import LeftNavBar from "../components/LeftNavBar";
import TopNavBar from "../components/TopNavBar";
import { Outlet } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap"

export default function Root() {
  return (
    <>
      <NavBar />
      <Container fluid style={styles.container}>
        <Row>
          <Col md={3} lg={2} style={styles.leftNavBar}>
            <LeftNavBar />
          </Col>
          <Col md={9} lg={10}>
            <Row>
              <TopNavBar />
            </Row>
            <Row>
              <Outlet />
            </Row>
            <Row>
              <Footer />
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

const styles = {
  primaryArea: {
    marginBottom: "2rem"
  },
  container: {
    overflowX: "hidden",
    maxWidth: "100%",
  },
  leftNavBar: {
    padding: "0px"
  },
  content: {

  }
};