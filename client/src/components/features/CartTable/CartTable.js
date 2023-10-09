import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button, Modal, Form, Row, Col } from "react-bootstrap";
import { getProducts } from "../../../redux/productsRedux";
import { returnImgSrc } from "../../../utils/renderImgSrc";
import { deleteCartItemRequest, loadCartProductsRequest, updateCartItemRequest } from "../../../redux/cartRedux";
import PropTypes from "prop-types";
import styles from "./CartTable.module.scss";

const CartTable = ({ items }) => {
  const dispatch = useDispatch();

  const allProducts = useSelector(state => getProducts(state));
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [editedItems, setEditedItems] = useState({});
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleDelete = (item) => {
    const productDetails = allProducts.find(product => product.id === item.productId);
    setItemToDelete({ item, productDetails });
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (itemToDelete && itemToDelete.item) {
      dispatch(deleteCartItemRequest(itemToDelete.item.id))
        .then(() => {
          dispatch(loadCartProductsRequest());
        })
        .catch(error => {
          console.error("Error deleting item:", error);
        });
    }
    setShowModal(false);
    setItemToDelete(null);
  };

  const handleEditChange = (itemId, field, value) => {
    let processedValue = field === "amount" ? parseInt(value, 10) : value;
    
    setEditedItems(prevState => ({
      ...prevState,
      [itemId]: {
        ...prevState[itemId],
        [field]: processedValue
      }
    }));
  };

  const saveChanges = (itemId) => {
    const itemData = editedItems[itemId];
    if (itemData) {
      dispatch(updateCartItemRequest(itemId, itemData))
        .then(() => {
          setShowConfirmationModal(true);
        })
        .catch(error => {
          console.error("Error updating item:", error);
        });
    }
  };

  useEffect(() => {
    const initialEditedItems = items.reduce((acc, item) => {
      acc[item.id] = {
        amount: item.amount,
        size: item.size,
        color: item.color,
        comment: item.comment,
      };
      return acc;
    }, {});
    setEditedItems(initialEditedItems);
  }, [items]);

  const totalAmount = items.reduce((acc, item) => {
    const currentEditableItem = editedItems[item.id] || {};
    return acc + currentEditableItem.amount;
  }, 0);

  const totalSum = items.reduce((acc, item) => {
    const productDetails = allProducts.find(product => product.id === item.productId);
    const currentEditableItem = editedItems[item.id] || {};
    return acc + (productDetails.price * currentEditableItem.amount);
  }, 0);    

  return (
    <div className={styles.CartTable}>
      <div className={styles.tableContainer}>
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => {
              const productDetails = allProducts.find(product => product.id === item.productId);
              const currentEditableItem = editedItems[item.id] || {};
              const totalPrice = productDetails.price * currentEditableItem.amount;

              return (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td className={styles.squareImageContainer}>
                    <img 
                      src={returnImgSrc(productDetails.photo)} 
                      alt="Product" 
                      style={{ width: "100%", height: "100%", display: "block", maxWidth: "150px" }} 
                    />
                  </td>
                  <td>{productDetails.title}</td>
                  <td>
                    <Form.Control
                      type="number"
                      value={currentEditableItem.amount}
                      onChange={(e) => handleEditChange(item.id, "amount", e.target.value)}
                    />
                  </td>
                  <td>
                    <Form.Select
                      value={currentEditableItem.size}
                      onChange={(e) => handleEditChange(item.id, "size", e.target.value)}
                    >
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                    </Form.Select>
                  </td>
                  <td>
                    <Form.Select
                      value={currentEditableItem.color}
                      onChange={(e) => handleEditChange(item.id, "color", e.target.value)}
                    >
                      <option value="gold">Gold</option>
                      <option value="silver">Silver</option>
                      <option value="bronze">Bronze</option>
                    </Form.Select>
                  </td>
                  <td>{productDetails.price}</td>
                  <td>{totalPrice}</td>
                  <td>
                    <Form.Control
                      as="textarea"
                      value={currentEditableItem.comment}
                      onChange={(e) => handleEditChange(item.id, "comment", e.target.value)}
                    />
                  </td>
                  <td>
                    <Button variant="danger" onClick={() => handleDelete(item)}>Delete</Button>
                    <Button variant="success" onClick={() => saveChanges(item.id)}>Save</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>

      <Row>
        <Col xs={12} md={10} lg={8} xl={6} className="mx-auto">      
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
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete {itemToDelete && itemToDelete.productDetails ? itemToDelete.productDetails.title : ""}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showConfirmationModal} onHide={() => setShowConfirmationModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Data has been successfully saved!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => {
            setShowConfirmationModal(false);
            dispatch(loadCartProductsRequest());
            window.location.reload();
          }}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

CartTable.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    productId: PropTypes.number.isRequired,
    amount: PropTypes.number,
    size: PropTypes.string,
    color: PropTypes.string,
    comment: PropTypes.string
  })).isRequired
};

export default CartTable;
