import { useDispatch, useSelector } from "react-redux";
import { getCartProducts, loadCartProductsRequest } from "../../../redux/cartRedux";
import { useEffect, useState } from "react";
import { Spinner, Button } from "react-bootstrap";
import CartTable from "../CartTable/CartTable";
import { Link } from "react-router-dom";

const CartContent = () => {
  const dispatch = useDispatch();

  const [cartProducts, setCartProducts] = useState(null);
  
  const reduxCartProducts = useSelector(getCartProducts);

  useEffect(() => {
    if (reduxCartProducts) {
      setCartProducts(reduxCartProducts);
    }
  }, [reduxCartProducts]);

  useEffect(() => {
    dispatch(loadCartProductsRequest());
  }, [dispatch]);

  if (!cartProducts) {
    return (
      <Spinner animation="border" role="status" className="d-block mx-auto">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }  
  
  return (
    <>
      {cartProducts.cartItems.length === 0 ? (
        <p>You have no items in the cart</p>
      ) : (
        <>
          <CartTable items={cartProducts.cartItems} />
          <Link to="/proceed-order">
            <Button variant="primary" className="mt-2">Proceed Order</Button>
          </Link>
        </>
      )}
    </>
  );
};

export default CartContent;
