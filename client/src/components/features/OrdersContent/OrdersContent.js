import { useDispatch, useSelector } from "react-redux";
import { getOrders, loadOrdersRequest } from "../../../redux/ordersRedux";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import OrdersTable from "../OrdersTable/OrdersTable";

const OrdersContent = () => {
  const dispatch = useDispatch();

  const [orders, setOrders] = useState(null);
  
  const reduxOrders = useSelector(getOrders);

  useEffect(() => {
    if (reduxOrders) {
      setOrders(reduxOrders);
    }
  }, [reduxOrders]);

  useEffect(() => {
    dispatch(loadOrdersRequest());
  }, [dispatch]);

  if (!orders) {
    return (
      <Spinner animation="border" role="status" className="d-block mx-auto">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }  
  
  return (
    <>
      {orders.length === 0 ? (
        <p className="text-center">You have no orders</p>
      ) : (
        <OrdersTable items={orders} />
      )}
    </>
  );
};

export default OrdersContent;
