import { useDispatch, useSelector } from "react-redux";
import { loadCartProductsRequest, getCartProducts, getCartError } from "../../../redux/cartRedux";
import { getProducts } from '../../../redux/productsRedux';
import { useEffect, useState } from "react";
import { Table, Spinner, Form, Button } from "react-bootstrap";
import { returnImgSrc } from "../../../utils/renderImgSrc";
import { loadFullUser, getFullUser } from "../../../redux/usersRedux";

const CartSummary = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(getCartProducts);
  const allProducts = useSelector(getProducts);
  const error = useSelector(getCartError);
  const userData = useSelector(getFullUser);

  const defaultClientName = userData ? userData.payload.user.data.name : '';
  const defaultEmail = userData ? userData.payload.user.data.email : '';
  const defaultAddress = userData ? userData.payload.user.data.address : '';
  
  const [formData, setFormData] = useState({
    clientName: '',
    email: '',
    address: '',
    comment: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    dispatch(loadCartProductsRequest());
    dispatch(loadFullUser());
  }, [dispatch]);

  useEffect(() => {
    if (userData && userData.payload && userData.payload.user && userData.payload.user.data) {
        setFormData({
            clientName: userData.payload.user.data.name || '',
            email: userData.payload.user.data.email || '',
            address: userData.payload.user.data.address || ''
        });
    }
  }, [userData]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!cartItems) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  const totalAmount = cartItems.cartItems.reduce((acc, item) => acc + item.amount, 0);

  const totalSum = cartItems.cartItems.reduce((acc, item) => {
    const productDetails = allProducts.find(product => product.id === item.productId);
    return acc + (productDetails.price * item.amount);
  }, 0);

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Product Photo</th>
            <th>Product Title</th>
            <th>Amount</th>
            <th>Size</th>
            <th>Color</th>
            <th>Price</th>
            <th>Total Price</th>            
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.cartItems.map((item, index) => {
            const productDetails = allProducts.find(product => product.id === item.productId);
            const totalPrice = productDetails.price * item.amount;

            return (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>
                  <img 
                    src={returnImgSrc(productDetails.photo)} 
                    alt="Product" 
                    style={{ width: '100%', height: '100%', display: 'block', maxWidth: '150px' }} 
                  />
                </td>
                <td>{productDetails.title}</td>
                <td>{item.amount}</td>
                <td>{item.size}</td>
                <td>{item.color}</td>
                <td>{productDetails.price}</td>
                <td>{totalPrice}</td>
                <td>{item.comment}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Table bordered>
        <thead>
          <tr>
            <th>Total Amount</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{totalAmount}</td>
            <td>{totalSum}</td>
          </tr>
        </tbody>
      </Table>
      <Form>
        <Form.Group className="mb-3">
            <Form.Label>Client Name</Form.Label>
            <Form.Control type="text" name="clientName" value={formData.clientName} onChange={handleInputChange} placeholder="Enter client name" />
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Enter address" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Comment to Order</Form.Label>
          <Form.Control as="textarea" rows={3} name="comment" value={formData.comment} onChange={handleInputChange} placeholder="Add a comment to your order..." />
        </Form.Group>
      </Form>
      <Button variant="primary">Send Order</Button>
    </>
  );
};

export default CartSummary;