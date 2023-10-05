import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { getProducts } from '../../../redux/productsRedux';
import { returnImgSrc } from '../../../utils/renderImgSrc';
import { deleteCartItemRequest, loadCartProductsRequest } from '../../../redux/cartRedux';

const CartTable = ({ items }) => {
    const dispatch = useDispatch();
    const allProducts = useSelector(state => getProducts(state));
    const [showModal, setShowModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [editedItems, setEditedItems] = useState({});

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
        setEditedItems(prevState => ({
            ...prevState,
            [itemId]: {
                ...prevState[itemId],
                [field]: value
            }
        }));
    };

    const saveChanges = (itemId) => {
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
                        <th>Comment</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => {
                        const productDetails = allProducts.find(product => product.id === item.productId);
                        const currentEditableItem = editedItems[item.id] || {};
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
                                <td>
                                    <Form.Control
                                        type="number"
                                        value={currentEditableItem.amount}
                                        onChange={(e) => handleEditChange(item.id, 'amount', e.target.value)}
                                    />
                                </td>
                                <td>
                                    <Form.Select
                                        value={currentEditableItem.size}
                                        onChange={(e) => handleEditChange(item.id, 'size', e.target.value)}
                                    >
                                        <option value="S">S</option>
                                        <option value="M">M</option>
                                        <option value="L">L</option>
                                    </Form.Select>
                                </td>
                                <td>
                                    <Form.Select
                                        value={currentEditableItem.color}
                                        onChange={(e) => handleEditChange(item.id, 'color', e.target.value)}
                                    >
                                        <option value="gold">Gold</option>
                                        <option value="silver">Silver</option>
                                        <option value="bronze">Bronze</option>
                                    </Form.Select>
                                </td>
                                <td>{productDetails.price}</td>
                                <td>
                                    <Form.Control
                                        as="textarea"
                                        value={currentEditableItem.comment}
                                        onChange={(e) => handleEditChange(item.id, 'comment', e.target.value)}
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

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete {itemToDelete && itemToDelete.productDetails ? itemToDelete.productDetails.title : ''}?
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
        </>
    );
};

export default CartTable;
