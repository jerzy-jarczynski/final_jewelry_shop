import LoginForm from "../../features/LoginForm/LoginForm";
import { Row, Col } from "react-bootstrap";

const Login = () => {
  
  return (
    <>
      <Row>
        <Col xs={12} md={6} lg={4} className="mx-auto">
          <h2 className="text-center mb-3">
            Sign in
          </h2>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={8} lg={6} className="mx-auto">
          <LoginForm />
        </Col>
      </Row>
    </>
  );

};

export default Login;