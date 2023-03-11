import * as React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LeftNavBar from "../components/LeftNavBar";
import TopNavBar from "../components/TopNavBar";
import { Outlet } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap"

export default function Root() {
  return (
    <>
      <Header />
      <Container style={styles.container}>
        <Row style={{ maxWidth: "100%" }}>
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
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

const styles = {
  container: {
    overflowX: "hidden",
    maxWidth: "100%",
    paddingRight: "15px",
    paddingLeft: "15px",
    marginRight: "auto",
    marginLeft: "auto"
  },
  leftNavBar: {
    padding: "0px"
  }
};