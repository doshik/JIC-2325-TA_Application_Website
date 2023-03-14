import * as React from "react";
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  Stack,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/actions/authActions";
import { useSelector, useDispatch, connect } from "react-redux";
import '../../assets/css/main.css'

function Login() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const role = useSelector((state) => state.auth.user.accountType);

  const login = (role) => {
    if (role === "student") {
      dispatch(loginUser("student"));
    } else if (role === "professor") {
      dispatch(loginUser("professor"));
    }
  };

  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(`/dashboard`);
    }
  }, [isAuthenticated, role, navigate]);

  return (
    <Row>
      <Col xs={12} md={6}>
        <Card className="mb-3 rounded-0">
          <Card.Header as="h5" style={styles.leftCardHeader}>
            Login
          </Card.Header>
          <Card.Body>
            <Form>
              <Stack
                direction="horizontal"
                gap={5}
                className="d-flex align-items-center justify-content-center"
              >
                <Button
                  type="button"
                  onClick={() => login("student")}
                  className="btn btn-rectangular-transparent-blue"
                >
                  Login Student
                </Button>
                <Button 
                  className="btn btn-rectangular-transparent-blue"
                  onClick={() => login("professor")}
                >
                  Login Professor
                </Button>
              </Stack>
            </Form>
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

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loginUser })(Login);

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
