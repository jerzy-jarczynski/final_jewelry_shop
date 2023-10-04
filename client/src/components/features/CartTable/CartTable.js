import { useSelector } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import { getProducts } from '../../../redux/productsRedux';
import { returnImgSrc } from '../../../utils/renderImgSrc';

const CartTable = ({ items }) => {
    // Fetch all products from the store
    const allProducts = useSelector(state => getProducts(state));

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Product Photo</th>
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
                    // Find the product details from the array
                    const productDetails = allProducts.find(product => product.id === item.productId);
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
                            <td>{item.amount}</td>
                            <td>{item.size}</td>
                            <td>{item.color}</td>
                            <td>{productDetails.price}</td>
                            <td>{item.comment}</td>
                            <td><Button variant="danger">Delete</Button></td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
};

export default CartTable;
