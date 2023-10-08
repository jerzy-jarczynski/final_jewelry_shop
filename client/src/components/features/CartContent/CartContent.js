import { useDispatch, useSelector } from "react-redux";
import { getCartProducts, loadCartProductsRequest } from "../../../redux/cartRedux";
import { useEffect, useState } from "react";
import { Spinner, Button, Modal } from "react-bootstrap";
import CartTable from "../CartTable/CartTable";
import { useNavigate } from "react-router-dom";

const CartContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cartProducts, setCartProducts] = useState(null);
  const reduxCartProducts = useSelector(getCartProducts);

  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

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
          <Button variant="primary" className="mt-2" onClick={handleShow}>Proceed Order</Button>
        </>
      )}

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to proceed with your order and leave the cart?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            handleClose();
            navigate('/');
          }}>
            Go Back to Shop
          </Button>
          <Button variant="primary" onClick={() => {
            handleClose();
            navigate('/proceed-order');
            window.location.reload();
          }}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>      
    </>
  );
};

export default CartContent;
