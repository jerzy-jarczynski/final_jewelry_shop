import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser, isUserLoading } from "../../../redux/usersRedux";
import { useEffect } from "react";
import OrdersContent from "../../features/OrdersContent/OrdersContent";
import { Spinner } from 'react-bootstrap';

const Orders = () => {
  const user = useSelector(getUser);
  const loading = useSelector(isUserLoading);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <h2>Orders</h2>
      <OrdersContent />
    </>
  );
};

export default Orders;