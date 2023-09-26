import React, { useState, useEffect } from 'react';

const Amount = ({ title, onAmountChange }) => {
  const [amount, setAmount] = useState(1);

  useEffect(() => {
    onAmountChange(amount); // Ensuring that the parent has the initial default amount
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
      <button onClick={handleDecrease} disabled={amount <= 1}>-</button>
      <input type="number" value={amount} readOnly />
      <button onClick={handleIncrease} disabled={amount >= 10}>+</button>
    </div>
  );
};

export default Amount;
