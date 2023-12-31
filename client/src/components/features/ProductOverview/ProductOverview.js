import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductById, loadProductsRequest } from "../../../redux/productsRedux";
import { useEffect, useState } from "react";
import { Row, Col, Button, Card, Spinner, Alert, Form, Modal } from "react-bootstrap";
import styles from "./ProductOverview.module.scss";
import { API_URL } from "../../../config";
import Amount from "../../common/Amount/Amount";
import Picker from "../../common/Picker/Picker";
import { getUser } from "../../../redux/usersRedux";
import { useNavigate } from "react-router-dom";
import { returnImgSrc } from "../../../utils/renderImgSrc";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

const ProductOverview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const data = useSelector((state) => getProductById(state, id));
  const user = useSelector(getUser);

  const [productAmount, setProductAmount] = useState(1);
  const [color, setColor] = useState("gold");
  const [size, setSize] = useState("S");
  const [comment, setComment] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [validationError, setValidationError] = useState(null); 

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    dispatch(loadProductsRequest());
  }, [dispatch, id]);
  
  const openLightbox = (index) => {
    setPhotoIndex(index);
    setLightboxOpen(true);
  };

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
        credentials: "include",
      });
  
      if (!response.ok) {
        throw new Error("Failed to add item to cart.");
      }
  
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

  const images = [
    returnImgSrc(data.photo),
    returnImgSrc("add-photo-1"),
    returnImgSrc("add-photo-2"),
    returnImgSrc("add-photo-3")
  ];  

  return (
    <div className={styles.productOverview}>
      <Row>
        <Col xs={12} md={8} lg={6}>
          <h2 className="pb-3">
            { data.title }
          </h2>
          <Card>
            <Row>
              <Col onClick={() => openLightbox(0)}>
                <div className={ styles.imageContainer }>
                  <Card.Img src={images[0]} />
                </div>
              </Col>
            </Row>
            <Row className="py-3">
              <Col onClick={() => openLightbox(1)}>
                <div className={ styles.imageContainer }>
                  <Card.Img src={images[1]} />
                </div>
              </Col>
              <Col onClick={() => openLightbox(1)}>
                <div className={ styles.imageContainer }>
                  <Card.Img src={images[2]} />
                </div>
              </Col>
              <Col onClick={() => openLightbox(1)}>
                <div className={ styles.imageContainer }>
                  <Card.Img src={images[3]} />
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col xs={12} md={4} lg={6} className={styles.descriptionCol}>
          <Row>
            <h2 className="py-3 pt-md-0">
              $ { data.price }
            </h2>
          </Row>        
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <Card.Text>Description:<br/>{data.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="justify-content-center py-3">
        <Col xs={12} md={6}>
          <Amount title="Product amount" onAmountChange={setProductAmount} defaultValue={1} />
        </Col>
        <Col xs={12} md={6} className="mt-3 mt-md-0">
          {user && (
            <Form.Group className="mb-3" controlId="productComment">
              <Form.Label className="w-100 d-block">
                <h4>Comment</h4>
              </Form.Label>
              <Form.Control as="textarea" rows={3} onChange={(e) => setComment(e.target.value)} />
            </Form.Group>
          )}
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={6}>
          <Picker title="Color picker" items={["gold", "silver", "bronze"]} onValueChange={setColor} defaultValue="gold" />
        </Col>
        <Col xs={12} md={6}>
          <Picker title="Size picker" items={["S", "M", "L"]} onValueChange={setSize} defaultValue="S" />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col>
          {validationError && <Alert variant="danger">{validationError}</Alert>}
          <Button onClick={handleAddToCart} variant="warning" className="text-white mx-auto d-block my-3 p-3">Add to cart</Button>
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

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          mainSrc={images[photoIndex]}
          nextSrc={images[(photoIndex + 1) % images.length]}
          prevSrc={images[(photoIndex + images.length - 1) % images.length]}
          onCloseRequest={() => setLightboxOpen(false)}
          onMovePrevRequest={() => setPhotoIndex((photoIndex + images.length - 1) % images.length)}
          onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % images.length)}
        />
      )}      
    </div>
  );


}

export default ProductOverview;