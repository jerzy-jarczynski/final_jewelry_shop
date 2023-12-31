import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser, isUserLoading } from "../../../redux/usersRedux";
import { useEffect } from "react";
import OrderOverview from "../../features/OrderOverview/OrderOverview";
import { Spinner } from "react-bootstrap";

const OrderDetails = () => {
  const navigate = useNavigate();

  const user = useSelector(getUser);
  const loading = useSelector(isUserLoading);

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
    <div>
      <h2 className="mb-3 text-center">Order OrderOverview</h2>
      <OrderOverview />
    </div>
  );
};

export default OrderDetails;