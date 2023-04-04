import * as React from "react";
import { Container } from "react-bootstrap";

const Error = () => {
    return (
        <Container className="text-center mt-5">
        <h3 className="font-weight-bold my-4">This page does not exist.</h3>
        <h3 className="text-muted my-4">Please go back.</h3>
        </Container>
    );
};

export default Error;