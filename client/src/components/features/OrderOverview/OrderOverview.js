import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrderById, loadOrderByIdRequest } from "../../../redux/ordersRedux";
import { getProducts, loadProductsRequest } from "../../../redux/productsRedux";
import { useEffect } from "react";
import { Table, Spinner } from 'react-bootstrap';

const OrderOverview = () => {

  const dispatch = useDispatch();
  const { id } = useParams();
  const data = useSelector((state) => getOrderById(state, id));
  const allProducts = useSelector((state) => getProducts(state));
  const isLoading = useSelector((state) => state.orders.loading);

  useEffect(() => {
    dispatch(loadOrderByIdRequest(id));
    dispatch(loadProductsRequest());
  }, [dispatch, id]);

  if (isLoading) {
    return (
      <Spinner animation="border" role="status" className="d-block mx-auto">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <>
        <h3>Order Overview</h3>
        {data && (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Date</th>
                        <th>Total Price</th>
                        <th>Comment</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{data.id}</td>
                        <td>{data.date}</td>
                        <td>{data.priceSum}</td>
                        <td>{data.comment}</td>
                    </tr>
                    <tr>
                        <td colSpan="4">
                            <h5>Order Items</h5>
                            <Table striped bordered size="sm">
                                <thead>
                                    <tr>
                                        <th>Product Name</th>
                                        <th>Amount</th>
                                        <th>Color</th>
                                        <th>Size</th>
                                        <th>Product Price</th>
                                        <th>Comment</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {data.orderItems.map(item => {
                                    const product = allProducts.find(p => p.id === item.productId);

                                    return (
                                      <tr key={item.id}>
                                        <td>{product ? product.title : "Product not found"}</td>
                                        <td>{item.amount}</td>
                                        <td>{item.color}</td>
                                        <td>{item.size}</td>
                                        <td>{product ? product.price : "Product not found"}</td>
                                        <td>{item.comment}</td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                            </Table>
                        </td>
                    </tr>
                </tbody>
            </Table>
        )}
    </>
  );

};

export default OrderOverview;