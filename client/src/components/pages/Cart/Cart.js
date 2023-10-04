import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../../redux/usersRedux";
import { useEffect } from "react";
import CartContent from "../../features/CartContent/CartContent";

const Cart = () => {
  const user = useSelector(getUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <>
      <h2>Cart</h2>
      <CartContent />
    </>
  );
};

export default Cart;