import React, { useState, useEffect } from "react";
import { Button, FormControl } from "react-bootstrap";
import PropTypes from "prop-types";

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
    <div>
      <h4>{title}</h4>
      <Button variant="secondary" onClick={handleDecrease} disabled={amount <= 1}>-</Button>
      <FormControl 
        type="number" 
        value={amount} 
        readOnly 
        className="mx-2 d-inline-block" 
        style={{ width: "60px", textAlign: "center" }}
      />
      <Button variant="secondary" onClick={handleIncrease} disabled={amount >= 10}>+</Button>
    </div>
  );
};

Amount.propTypes = {
  title: PropTypes.string.isRequired,
  onAmountChange: PropTypes.func.isRequired
};

export default Amount;
