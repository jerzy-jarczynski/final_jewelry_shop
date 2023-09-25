import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductById, loadProductsRequest } from "../../../redux/productsRedux";
import { useEffect } from "react";
import { Row, Col, Button, Card, Spinner } from "react-bootstrap";
import styles from "./ProductOverview.module.scss";
import { IMGS_URL } from "../../../config";

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

  console.log(data);

  const productImageSrc = `${IMGS_URL}${data.photo}.png`;

  return (
    // <Row>
    //   <Col xs={12} md={10} lg={8} className="mx-auto">
    //     <Card className="mb-4 p-3">
    //       <Row>
    //         <Col xs={12} md={6} lg={5}>
    //           <div className={styles.imageContainer}>
    //             <Card.Img variant="top" src={productImageSrc} />
    //           </div>
    //         </Col>
    //         <Col xs={12} md={6} lg={7}>
    //           <Card.Body>
    //             <Card.Title>Title: {data.title}</Card.Title>
    //             <Card.Text>Description: {data.description}</Card.Text>
    //           </Card.Body>
    //         </Col>
    //       </Row>
    //     </Card>
    //   </Col>
    // </Row>
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
  );


}

export default ProductOverview;