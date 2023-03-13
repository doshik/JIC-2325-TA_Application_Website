import * as React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Stack,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/actions/authActions";
import { useSelector, useDispatch, connect } from "react-redux";

function Home() {
  const account = {username: "rchandra38", displayname: "Ritvik Chandrashekhar", email: "rchandra38@gatech.edu"}
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const logoutAction = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <Row>
      <Col xs={12} md={6}>
      <Card className="mb-3 rounded-0">
        <Card.Header as="h5" style={styles.leftCardHeader}>
          Account
        </Card.Header>
        <Card.Body>
          <Card.Text>
            You are logged in.
          </Card.Text>
          <Card.Text>
            <strong>Username:</strong> {account.username}
          </Card.Text>
          <Card.Text>
            <strong>Display Name:</strong> {account.displayname}
          </Card.Text>
          <Card.Text>
            <strong>Email Address:</strong> {account.email}
          </Card.Text>
          <div className="text-center">
            <Button className="btn-rectangular-transparent-grey" onClick={logoutAction}>Go to Georgia Tech log out page <i className="fa fa-sign-out"></i> </Button>
          </div>
        </Card.Body>
      </Card>


        <Card className="mb-3 rounded-0">
          <Card.Header as="h5" style={styles.leftCardHeader}>
            About the TA Application Hub
          </Card.Header>
          <Card.Body>
            <Card.Text style={styles.leftCardContent}>
              The TA Application Hub is a website that provides students and
              professors access to everything they need for the TA application
              and hiring process at Georgia Tech.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card className="mb-3 rounded-0">
          <Card.Header as="h5" style={styles.leftCardHeader}>
            Acceptable Use Policy
          </Card.Header>
          <Card.Body style={styles.leftCardContent}>
            <Card.Text>
              Students are required to abide by the Institute's Acceptable Use
              Policy when using Georgia Tech's computer resources.
            </Card.Text>
            <Card.Text style={styles.link}>
              <a
                href="https://policylibrary.gatech.edu/information-technology/acceptable-use-policy"
                target="_blank"
              >
                Policy Library: Acceptable Use Policy
              </a>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} md={6}>
      <Card className="mb-3 rounded-0">
          <Card.Body>
            <Card.Text style={styles.rightCardHeader}>
              Announcements
            </Card.Text>
            <ul>
              <li>Announcement #1</li>
              <li>Announcement #2</li>
              <li>Announcement #3</li>
            </ul>
          </Card.Body>
        </Card>
        <Card className="mb-3 rounded-0">
          <Card.Body>
            <Card.Text style={styles.rightCardHeader}>
              College of Computing
            </Card.Text>
            <Card.Text style={styles.rightCardContent}>
              The college of computing thinks the TAs are an incredible part
              of our mission. We hire this many TAs etc. We hold them up to
              the highest standards etc.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card className="mb-3 rounded-0">
          <Card.Body>
            <Card.Text style={styles.rightCardHeader}>
              Get to know our TAs
            </Card.Text>
            <Card.Text style={styles.rightCardContent}>
              TA feedback
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default Home;

const styles = {
  leftCardHeader: {
    backgroundColor: "#efefef",
  },
  leftCardContent: {
    fontFamily: "'Roboto', Arial, Helvetica, sans-serif",
    fontSize: "1rem",
    fontWeight: "400",
    lineHeight: "1.6",
    color: "#262626",
    marginBottom: "1.25rem"
  },
  link: {
    color: "#004f9f",
  },
  rightCardHeader: {
    color: "#262626",
    fontSize: "1.25rem",
    fontFamily: "Roboto Condensed, Arial, Helvetica, sans-serif",
    fontWeight: "400",
    borderBottom: "1px solid #c8c8c8",
    paddingBottom: "12px",
    marginBottom: "24px",
  },
  rightCardContent: {
    fontFamily: "'Roboto', Arial, Helvetica, sans-serif",
    fontSize: "1rem",
    fontWeight: "400",
    lineHeight: "1.6",
    color: "#262626",
    marginBottom: "1.25rem"
  }
};
