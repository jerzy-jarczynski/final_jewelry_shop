import React from 'react';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const OrdersTable = ({ items }) => {

  return (
    <Table striped bordered hover>
      <thead>
      <tr>
        <th>#</th>
        <th>Order Date</th>
        <th>Price</th>
        <th>Address</th>
        <th>Email</th>
        <th>Client Name</th>
        <th>Details</th>
      </tr>
      </thead>
      <tbody>
        {items.map((order, index) => (
          <tr key={order.id}>
              <td>{index + 1}</td>
              <td>{new Date(order.date).toLocaleDateString()}</td>
              <td>${order.priceSum}</td>
              <td>{order.address}</td>
              <td>{order.email}</td>
              <td>{order.clientName}</td>
              <td>
                  <Link to={`/orders/${order.id}`}>
                      <Button variant="info">Details</Button>
                  </Link>
              </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default OrdersTable;