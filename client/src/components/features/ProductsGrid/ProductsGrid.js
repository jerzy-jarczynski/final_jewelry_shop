import PropTypes from 'prop-types';
import { Spinner, Row, Col } from "react-bootstrap";
import ProductSummary from '../ProductSummary/ProductSummary';

const ProductsGrid = ({ products }) => {

  if (!products) {
    return (
      <Spinner animation="border" role="status" className="d-block mx-auto">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  
  return (
    <Row>
      {
        products.map((product, index) => (
          <Col key={index} xs={12} md={6} lg={4}>
            <ProductSummary id={product.id} title={product.title} photo={product.photo} price={product.price} />
          </Col>
        ))
      }
    </Row>
  );

};

ProductsGrid.propTypes = {
  products: PropTypes.array
};

export default ProductsGrid;
