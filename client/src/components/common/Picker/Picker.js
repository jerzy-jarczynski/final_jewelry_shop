import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';

const Picker = ({ title, items = [], onValueChange, defaultValue }) => {
  const [selectedItem, setSelectedItem] = useState(defaultValue || (items.length > 0 ? items[0] : ''));

  useEffect(() => {
    if (items.length > 0) {
      onValueChange(selectedItem);
    }
  }, [items, onValueChange, selectedItem]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setSelectedItem(newValue);
    onValueChange(newValue);
  };

  return (
    <Container className="mt-3">
      {title && <h4>{title}</h4>}
      <Form>
        <Row>
          {items.map((item, index) => (
            <Col key={index} className="text-center">
              <Form.Label>{item}</Form.Label>
              <Form.Check 
                inline
                type="radio"
                name={`${title}-group`}
                value={item}
                checked={item === selectedItem}
                onChange={handleChange}
              />
            </Col>
          ))}
        </Row>
      </Form>
    </Container>
  );
};

export default Picker;
