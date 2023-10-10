import { Row, Col } from "react-bootstrap";

const NotFound = () => {
  return (
    <>
      <Row>
        <Col xs={12} md={8} lg={6} className="mx-auto">
          <h2 className="text-center mb-3">
            Page not found
          </h2>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={8} lg={6} className="mx-auto text-center">
          We're sorry, but the page you're trying to access doesn't exist.
        </Col>
      </Row>
    </>
  );
};

export default NotFound;