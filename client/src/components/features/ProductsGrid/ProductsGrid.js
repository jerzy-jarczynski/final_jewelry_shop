import PropTypes from 'prop-types';
import { Spinner, Row, Col } from "react-bootstrap";

const ProductsGrid = ({ products }) => {
  
  const BASE_IMAGE_URL = 'http://localhost:8000/uploads/';

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
            { product.title }
            <br />
            <img 
              src={`${BASE_IMAGE_URL}${product.photo}.png`} 
              alt={product.title}
              className="img-fluid"
            />
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