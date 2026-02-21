import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Container } from "react-bootstrap";
import { useAuthContext } from "../contexts/AuthContext";

const Login = () => {
  const [validated, setValidated] = useState(false);
  const { login } = useAuthContext();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    const formData = new FormData(event.target);
    const { username, password } = Object.fromEntries(formData.entries());
    login(username, password);
    setValidated(true);
  };

  return (
    <Container className="mt-4">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3 justify-content-md-center">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Username</Form.Label>
            <Form.Control
              required
              type="text"
              name="username"
              placeholder="Username"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3 justify-content-md-center">
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Password</Form.Label>
            <Form.Control required name="password" type="password" />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3 justify-content-md-center">
          <Col md="auto">
            <Button type="submit">Login</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default Login;
