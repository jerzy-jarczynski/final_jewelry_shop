import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductById, loadProductsRequest } from "../../../redux/productsRedux";
import { useEffect, useState } from "react";
import { Row, Col, Button, Card, Spinner, Alert, Form, Modal } from "react-bootstrap";
import styles from "./ProductOverview.module.scss";
import { IMGS_URL } from "../../../config";
import { API_URL } from "../../../config";
import Amount from "../../common/Amount/Amount";
import Picker from "../../common/Picker/Picker";
import { getUser } from "../../../redux/usersRedux";
import { useNavigate } from 'react-router-dom';
import { returnImgSrc } from "../../../utils/renderImgSrc";

const ProductOverview = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const data = useSelector((state) => getProductById(state, id));
  const user = useSelector(getUser);
  const navigate = useNavigate();

  const [productAmount, setProductAmount] = useState(1);
  const [color, setColor] = useState("gold");
  const [size, setSize] = useState("S");
  const [comment, setComment] = useState("");
  const [showModal, setShowModal] = useState(false);
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
      comment: comment,
    };
  
    try {
      const response = await fetch(`${API_URL}/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartData),
        credentials: 'include',
      });
  
      if (!response.ok) {
        throw new Error("Failed to add item to cart.");
      }
  
      const responseData = await response.json();
  
      setValidationError(null);
      setShowModal(true);
  
    } catch (error) {
      console.error(error);
      setValidationError("Failed to add item to cart. Please try again.");
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const goToCart = () => {
    navigate("/cart");
  };  
  

  if (!data) {
    return (
      <Spinner animation="border" role="status" className="d-block mx-auto">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

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
                  <Card.Img src={ returnImgSrc(data.photo) } />
                </div>
              </Col>
            </Row>
            <Row>
            <Col>
                <div className={ styles.imageContainer }>
                  <Card.Img src={ returnImgSrc('add-photo-1') } />
                </div>
              </Col>
              <Col>
                <div className={ styles.imageContainer }>
                  <Card.Img src={ returnImgSrc('add-photo-2') } />
                </div>
              </Col>
              <Col>
                <div className={ styles.imageContainer }>
                  <Card.Img src={ returnImgSrc('add-photo-3') } />
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
          {user && (
            <Form.Group className="mb-3" controlId="productComment">
              <Form.Label>Comment</Form.Label>
              <Form.Control as="textarea" rows={3} onChange={(e) => setComment(e.target.value)} />
            </Form.Group>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <Picker title="Color picker" items={['gold', 'silver', 'bronze']} onValueChange={setColor} defaultValue="gold" />
        </Col>
        <Col>
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

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
            <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Product successfully added to cart.
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
                Stay on page
            </Button>
            <Button variant="primary" onClick={goToCart}>
                Go to cart
            </Button>
        </Modal.Footer>
      </Modal>
    </>
  );


}

export default ProductOverview;