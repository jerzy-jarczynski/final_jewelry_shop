import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';

const Picker = ({ title, items = [] }) => {
  // State to manage the selected item
  const [selectedItem, setSelectedItem] = useState('');

  // Function to handle radio button change
  const handleChange = (e) => {
    setSelectedItem(e.target.value);
  };

  return (
    <Container className="mt-3">
      {title && <h4>{title}</h4>}
      <Form>
        <Row>
          {items.map((item, index) => (
            <Col key={index} className="mb-2">
              <Form.Label>{item}</Form.Label>
              <Form.Check 
                type="radio"
                name="pickerRadioGroup"
                id={`pickerRadio-${index}`}
                value={item}
                checked={selectedItem === item}
                onChange={handleChange}
                className="d-block"
              />
            </Col>
          ))}
        </Row>
      </Form>
    </Container>
  );
};

export default Picker;
