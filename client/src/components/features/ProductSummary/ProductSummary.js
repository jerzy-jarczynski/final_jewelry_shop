import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { IMGS_URL } from "../../../config";
import { Link } from "react-router-dom";
import styles from "./ProductSummary.module.scss";

const ProductSummary = ({ id, title, photo, price }) => {

  const imageSrc = `${IMGS_URL}${photo}`;
  const targetUrl = `/products/${id}`;

  return (
    <Card className="mb-4">
      <div className={styles.squareImgContainer}>
        <Card.Img src={`${imageSrc}.png`} alt={title} />
      </div>
      <Card.Body>
        <Card.Title>{ title }</Card.Title>
        <Card.Text>
          Price: ${price}
        </Card.Text>
        <Link to={targetUrl}>
          <Button variant="primary">Show more</Button>
        </Link>
      </Card.Body>
    </Card>
  );

};

ProductSummary.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};

export default ProductSummary;
