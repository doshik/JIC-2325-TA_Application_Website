import * as React from "react";
import { Row, Col, Card, Form, Button, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/actions/authActions";
import { useSelector, useDispatch, connect } from "react-redux";
import "../../assets/css/main.css";

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
            <Card.Text style={styles.rightCardHeader}>Announcements</Card.Text>
            <ul>
              <li>
                The application period for Fall 2023 TAs opens on April 15th,
                2023 and closes on May 15th, 2023.
              </li>
              <li>
                Applicants will receive notification of their application status
                by June 1st, 2023.
              </li>
            </ul>
          </Card.Body>
        </Card>
        <Card className="mb-3 rounded-0">
          <Card.Body>
            <Card.Text style={styles.rightCardHeader}>
              Message from the College of Computing
            </Card.Text>
            <Card.Text style={styles.rightCardContent}>
              The College of Computing relies heavily on TAs to assist with
              teaching, grading, and providing individualized support to
              students. As a TA, you will have the opportunity to gain valuable
              teaching experience, work closely with faculty members, and help
              students succeed academically. You will help to bridge the gap
              between students and faculty, offering a more personalized and
              approachable experience for students. At the College of Computing,
              we recognize the critical role that TAs play in our community, and
              we are grateful for their hard work and dedication to our
              students.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card className="mb-3 rounded-0">
          <Card.Body>
            <Card.Text style={styles.rightCardHeader}>
              Get to know our TAs
            </Card.Text>
            <Card.Text style={styles.rightCardContent}>
              Here is some feedback from past TAs:
              <ul>
                <li>
                  "Being a TA at the Georgia Tech College of Computing has been
                  an incredibly rewarding experience. Not only do I get to help
                  students succeed in their coursework, but I also have the
                  opportunity to work closely with faculty members and learn
                  from their expertise. It's been a great way to develop my
                  teaching skills and gain valuable experience in the field."
                </li>
                <li>
                  "As a TA, I've had the chance to work with students from
                  diverse backgrounds and skill levels. It's been a challenging
                  but rewarding experience to help students navigate difficult
                  concepts and develop their problem-solving skills. I also
                  appreciate the support and mentorship I've received from
                  faculty members and other TAs in the department."
                </li>
                <li>
                  "I've really enjoyed the collaborative and supportive
                  environment at the Georgia Tech College of Computing. The
                  faculty and staff are committed to providing the best possible
                  education for students, and TAs play an important role in that
                  effort. It's been a great way to contribute to the community
                  and make a positive impact on students' lives."
                </li>
                <li>
                  "One of the things I appreciate most about being a TA at the
                  College of Computing is the flexibility and autonomy I have in
                  my work. I'm able to develop my own teaching style and
                  approach, and I feel empowered to make a real difference in
                  students' lives. It's a challenging but fulfilling job, and
                  I'm grateful for the opportunity."
                </li>
              </ul>
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
    marginBottom: "1.25rem",
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
  },
};
