import * as React from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/actions/authActions";
import { useSelector, useDispatch } from "react-redux";
import { connect } from "react-redux";


function NewLogin() {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const role = useSelector((state) => state.auth.user.accountType);

    const login = (role) => {
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
        navigate("/user/studentdashboard");
        } else if (role === "professor") {
        navigate("/user/professordashboard");
        }
    }
    }, [isAuthenticated, role, navigate]);

    return (
        <Container fluid>
            <Row>
                <Col sm={12} md={6}>
                    <Card className="mb-3">
                        <Card.Header>Login</Card.Header>
                        <Card.Body>
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
                                <Col className="justify-content-center w-50 mx-auto">
                                    <Row>
                                        <Button variant="primary" type="button" onClick={() => login("student")}>Login Student</Button>
                                    </Row>
                                    <Row className="mt-3">
                                        <Button variant="primary" type="button" onClick={() => login("professor")}>Login Professor</Button>
                                    </Row>
                                </Col>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={12} md={6}>
                    
                </Col>
            </Row>
        </Container>
    );
}

const mapStateToProps = (state) => ({
    auth: state.auth,
  });
  
  export default connect(mapStateToProps, { loginUser })(NewLogin);

const styles = {

};