import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";

const AddUsers = () => {
  const { handleError } = useAuthContext();
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState({
    username: "",
    displayName: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    const formData = new FormData(event.target);
    const { username, displayName, password } = Object.fromEntries(
      formData.entries()
    );

    if (username.length > 0 && password.length > 0 && displayName.length > 0) {
      try {
        setLoading(true);
        const response = await axiosInstance.post("/users", {
          username,
          displayName,
          password,
        });
        const { data } = response;
        toast.success(data.message);
      } catch (err) {
        handleError(err);
      } finally {
        setLoading(false);
      }
    }
    setValidated(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3 justify-content-md-center">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Username</Form.Label>
          <Form.Control
            required
            type="text"
            name="username"
            value={fields.username}
            placeholder="Username"
            onChange={(e) => setFields({ ...fields, username: e.target.value })}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3 justify-content-md-center">
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Display Name</Form.Label>
          <Form.Control
            required
            name="displayName"
            value={fields.displayName}
            type="text"
            onChange={(e) =>
              setFields({ ...fields, displayName: e.target.value })
            }
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3 justify-content-md-center">
        <Form.Group as={Col} md="4" controlId="validationCustom03">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            name="password"
            value={fields.password}
            type="password"
            onChange={(e) => setFields({ ...fields, password: e.target.value })}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mb-3 justify-content-md-center">
        <Col md="auto">
          <Button type="submit" disabled={loading}>
            {loading ? "Adding.." : "Add"}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AddUsers;
