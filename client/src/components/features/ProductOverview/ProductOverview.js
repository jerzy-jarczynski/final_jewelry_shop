import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductById, loadProductsRequest } from "../../../redux/productsRedux";
import { useEffect } from "react";
import { Row, Col, Button, Card, Spinner } from "react-bootstrap";
import styles from "./ProductOverview.module.scss";
import { IMGS_URL } from "../../../config";
import Amount from "../../common/Amount/Amount";
import Picker from "../../common/Picker/Picker";

const ProductOverview = () => {

  const dispatch = useDispatch();
  const { id } = useParams();
  const data = useSelector((state) => getProductById(state, id));

  useEffect(() => {
    dispatch(loadProductsRequest());
  }, [dispatch, id]);

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
          <Amount title="Product amount" />
        </Col>
        <Col>
          <Picker title="Color picker" items={['gold', 'silver', 'bronze']} />
          <br />
          <Picker title="Size picker" items={['S', 'M', 'L']} />
        </Col>
      </Row>
      <Row>
        <Col>
        </Col>
        <Col>
          <Button>Add to cart</Button>
        </Col>
      </Row>
    </>
  );


}

export default ProductOverview;