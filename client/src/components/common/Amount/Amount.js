import React, { useState } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';

const Amount = ({ title }) => {
  // State to manage the amount
  const [amount, setAmount] = useState(1);

  // Function to increase the amount by 1
  const handleIncrease = () => {
    setAmount(prevAmount => prevAmount + 1);
  };

  // Function to decrease the amount by 1 but not below 0
  const handleDecrease = () => {
    setAmount(prevAmount => (prevAmount > 0 ? prevAmount - 1 : 0));
  };

  // Function to handle manual input change
  const handleInputChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setAmount(value);
    }
  };

  return (
    <div>
      <h4>{title}</h4>
      <Row>
        <Col>
          <Button onClick={handleDecrease}>Less</Button>
        </Col>
        <Col>
          <Form.Control
            type="number"
            value={amount}
            onChange={handleInputChange}
          />
        </Col>
        <Col>
          <Button onClick={handleIncrease}>More</Button>
        </Col>
      </Row>
    </div>
  );
};

export default Amount;