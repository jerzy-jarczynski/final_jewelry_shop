import { useState } from "react";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { API_AUTH_URL } from "../../../config";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordRepeat: "",
    name: "",
    address: ""
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form data on submit:", formData);

    const newErrors = {};

    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.passwordRepeat) newErrors.passwordRepeat = "Please confirm your password";
    if (formData.password !== formData.passwordRepeat) newErrors.passwordMismatch = "Passwords do not match";
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.address) newErrors.address = "Address is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const data = {
        ...formData
      };

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };

      setStatus('loading');

      fetch(`${API_AUTH_URL}/register`, options)
      .then(res => {
          let status = res.status;
          return res.json().then(data => ({...data, status}));
      })  
      .then(data => {
          if (data.status === 201) {
              setStatus('success');
          } else if (data.status === 400) {
              setStatus('clientError');
          } else if (data.status === 409) {
              setStatus('loginError');
          } else {
              setStatus('serverError');
          }
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <Form onSubmit={handleSubmit}>

      {
        status === "success" && (
          <Alert variant="success">
            <Alert.Heading>Success!</Alert.Heading>
            <p>You have been registered! You can now log in...</p>
          </Alert>
      )}

      {
        status === "serverError" && (
          <Alert variant="danger">
            <Alert.Heading>Something went wrong...</Alert.Heading>
            <p>Unexpected error... Try again!</p>
          </Alert>
      )}

      {
        status === "clientError" && (
          <Alert variant="danger">
            <Alert.Heading>Not enought data</Alert.Heading>
            <p>You have to fill all the fields</p>
          </Alert>
      )}      

      {
        status === "loginError" && (
          <Alert variant="warning">
            <Alert.Heading>Login already in use</Alert.Heading>
            <p>You have to use other login.</p>
          </Alert>
      )}

      {
        status === "loading" && (
          <Spinner animation="border" role="status" className="d-block mx-auto">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
      )}

      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email"
          isInvalid={errors.email}
        />
        <Form.Control.Feedback type="invalid">
          {errors.email}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter password"
          isInvalid={errors.password}
        />
        <Form.Control.Feedback type="invalid">
          {errors.password}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPasswordRepeat">
        <Form.Label>Repeat Password</Form.Label>
        <Form.Control
          type="password"
          name="passwordRepeat"
          value={formData.passwordRepeat}
          onChange={handleChange}
          placeholder="Repeat password"
          isInvalid={errors.passwordRepeat || errors.passwordMismatch}
        />
        <Form.Control.Feedback type="invalid">
          {errors.passwordRepeat || errors.passwordMismatch}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter name"
          isInvalid={errors.name}
        />
        <Form.Control.Feedback type="invalid">
          {errors.name}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formAddress">
        <Form.Label>Address</Form.Label>
        <Form.Control
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter address"
          isInvalid={errors.address}
        />
        <Form.Control.Feedback type="invalid">
          {errors.address}
        </Form.Control.Feedback>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default RegisterForm;