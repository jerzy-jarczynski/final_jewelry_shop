import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Card } from "react-bootstrap";
import PropTypes from "prop-types";
import styles from "./Picker.module.scss";

const Picker = ({ title, items = [], onValueChange, defaultValue }) => {
  const [selectedItem, setSelectedItem] = useState(defaultValue || (items.length > 0 ? items[0] : ""));

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
    <Card className="p-3 my-3">
      {title && <h4 className="pb-3">{title}</h4>}
      <Form>
        <Row>
          {items.map((item, index) => (
            <Col key={index} className={styles.pickContainer}>
              <Form.Label>{item}</Form.Label>
              <Form.Check 
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
    </Card>
  );
};

Picker.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.string),
  onValueChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.string
};

export default Picker;
