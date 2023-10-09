import React, { useState, useEffect } from "react";
import { Button, FormControl, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import styles from "./Amount.module.scss";

const Amount = ({ title, onAmountChange }) => {
  const [amount, setAmount] = useState(1);

  useEffect(() => {
    onAmountChange(amount);
  }, [amount, onAmountChange]);

  const handleIncrease = () => {
    if (amount < 10) {
      const newAmount = amount + 1;
      setAmount(newAmount);
    }
  };

  const handleDecrease = () => {
    if (amount > 1) {
      const newAmount = amount - 1;
      setAmount(newAmount);
    }
  };

  return (
    <div className={styles.Amount}>
      <Row>
        <Col xs={12} className="pb-3">
          <h4>{title}</h4>
        </Col>
        <Col xs={12} className={styles.amountContainer}>
          <Button variant="secondary" onClick={handleDecrease} disabled={amount <= 1}>-</Button>
          <FormControl 
            type="number" 
            value={amount} 
            readOnly
          />
          <Button variant="secondary" onClick={handleIncrease} disabled={amount >= 10}>+</Button>
        </Col>
      </Row>
    </div>
  );
};

Amount.propTypes = {
  title: PropTypes.string.isRequired,
  onAmountChange: PropTypes.func.isRequired
};

export default Amount;
