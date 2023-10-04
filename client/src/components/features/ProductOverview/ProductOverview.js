import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductById, loadProductsRequest } from "../../../redux/productsRedux";
import { useEffect, useState } from "react";
import { Row, Col, Button, Card, Spinner, Alert } from "react-bootstrap";
import styles from "./ProductOverview.module.scss";
import { IMGS_URL } from "../../../config";
import { API_URL } from "../../../config";
import Amount from "../../common/Amount/Amount";
import Picker from "../../common/Picker/Picker";
import { getUser } from "../../../redux/usersRedux";
import { useNavigate } from 'react-router-dom';

const ProductOverview = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const data = useSelector((state) => getProductById(state, id));
  const user = useSelector(getUser);
  const navigate = useNavigate();

  // State for the Amount and Pickers
  const [productAmount, setProductAmount] = useState(1); // default amount
  const [color, setColor] = useState("gold"); // default color
  const [size, setSize] = useState("S"); // default size
  const [validationError, setValidationError] = useState(null); 

  useEffect(() => {
    dispatch(loadProductsRequest());
  }, [dispatch, id]);

  const handleAddToCart = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
  
    if (!productAmount || productAmount < 1 || !color || !size) {
      setValidationError("Please ensure all fields are filled and amount is at least 1.");
      return;
    }
  
    const cartData = {
      productId: id,
      amount: productAmount,
      color: color,
      size: size,
    };
  
    try {
      const response = await fetch(`${API_URL}/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartData),
        credentials: 'include',  // This ensures cookies are sent with the request
      });
  
      if (!response.ok) {
        throw new Error("Failed to add item to cart.");
      }
  
      const responseData = await response.json();
      console.log(responseData);
  
      // Optionally, show a success message or do any other UI updates
      setValidationError(null);
  
    } catch (error) {
      console.error(error);
      // Handle error (e.g., show an error message to the user)
      setValidationError("Failed to add item to cart. Please try again.");
    }
  };
  

  if (!data) {
    return (
      <Spinner animation="border" role="status" className="d-block mx-auto">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  const productImageSrc = `${IMGS_URL}${data.photo}.png`;

  return (
    <>
      <Row>
        <Col>
          <h2>
            { data.title }
          </h2>
          <Card>
            <Row>
              <Col>
                <div className={ styles.imageContainer }>
                  <Card.Img src={ productImageSrc } />
                </div>
              </Col>
            </Row>
            <Row>
            <Col>
                <div className={ styles.imageContainer }>
                  <Card.Img src={ productImageSrc } />
                </div>
              </Col>
              <Col>
                <div className={ styles.imageContainer }>
                  <Card.Img src={ productImageSrc } />
                </div>
              </Col>
              <Col>
                <div className={ styles.imageContainer }>
                  <Card.Img src={ productImageSrc } />
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col>
          <Row className={ styles.flexRow }>
            <h2>
              $ { data.price }
            </h2>
            <Card>
              <Row>
                <Col>
                  <Card.Body>
                    <Card.Text>Description:<br/>{data.description}</Card.Text>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col>
          <Amount title="Product amount" onAmountChange={setProductAmount} defaultValue={1} />
        </Col>
        <Col>
          <Picker title="Color picker" items={['gold', 'silver', 'bronze']} onValueChange={setColor} defaultValue="gold" />
          <br />
          <Picker title="Size picker" items={['S', 'M', 'L']} onValueChange={setSize} defaultValue="S" />
        </Col>
      </Row>
      <Row>
        <Col></Col>
        <Col>
          {validationError && <Alert variant="danger">{validationError}</Alert>}
          <Button onClick={handleAddToCart} variant="warning" className="text-white">Add to cart</Button>
        </Col>
      </Row>
    </>
  );


}

export default ProductOverview;