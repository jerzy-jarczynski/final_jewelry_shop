import { useDispatch, useSelector } from "react-redux";
import { getCartProducts, loadCartProductsRequest } from "../../../redux/cartRedux";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

const CartContent = () => {
  const dispatch = useDispatch();

  const [cartProducts, setCartProducts] = useState(null);
  
  const reduxCartProducts = useSelector(getCartProducts);

  useEffect(() => {
    if (reduxCartProducts && Array.isArray(reduxCartProducts)) {
      setCartProducts(reduxCartProducts);
    }
  }, [reduxCartProducts]);

  useEffect(() => {
    dispatch(loadCartProductsRequest());
  }, [dispatch]);

  console.log("data", cartProducts);

  if (!cartProducts) {
    return (
      <Spinner animation="border" role="status" className="d-block mx-auto">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }  
  
  return (
    <>
      Cart Content
    </>
  );
};

export default CartContent;
