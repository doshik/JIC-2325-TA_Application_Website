import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row, Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import GTVertical_RGB from "../../assets/images/gt_vertical/GTVertical_RGB.svg";
import { loginUser } from "../../redux/actions/authActions";
import { useSelector, useDispatch } from "react-redux";

const LoginPage = (props) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const role = useSelector((state) => state.auth.user.accountType);

  const login = (role) => {
    // props.loginUser(accountType);
    if (role === "student") {
      console.log("student");
      dispatch(loginUser("student"));
    } else if (role === "professor") {
      dispatch(loginUser("professor"));
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      if (role === "student") {
        navigate("/studentdashboard");
      } else if (role === "professor") {
        navigate("/professordashboard");
      }
      // navigate("/home");
    }
  }, [isAuthenticated, role, navigate]);

  return (
    <Container
      fluid
      className="h-100 w-100"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Row>
        <h1>TA Application Hub</h1>
      </Row>

      <Row className="w-75">
        <Col lg={6} md={8} sm={12} xs={12}>
          <img src={GTVertical_RGB} alt={"GT Logo"} />
        </Col>

        <Col
          lg={6}
          md={4}
          sm={12}
          xs={12}
          className="d-flex align-items-center justify-content-center"
        >
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>
            <Col>
              <Row>
                <Button
                  variant="primary"
                  type="button"
                  onClick={() => login("student")}
                >
                  Login Student
                </Button>
              </Row>
              <Row className="mt-3">
                <Button
                  variant="primary"
                  type="button"
                  onClick={() => login("professor")}
                >
                  Login Professor
                </Button>
              </Row>
            </Col>
            <br />
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

// subscribe to the redux store
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loginUser })(LoginPage);
